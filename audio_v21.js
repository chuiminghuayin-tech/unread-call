/* Classic script: load AFTER music_score.js. No sound is started on install. */
(function () {
  'use strict';
  if (window.ScareAudioV21) return;
  const baseStart = startBGM, baseStop = stopBGM, baseSettings = applySettings;
  const priorCancel = audioBurst.cancel;
  const groups = new Set(), timers = new Set();
  let phase = null, ambientTimer = null, context = null, lastKind = null;
  let bursts = 0, textures = 0;
  const rand = (a,b) => a + Math.random() * (b-a);
  const enabled = () => !!SETTINGS.sound && Number(SETTINGS.volume) > 0;
  const ready = () => enabled() && !document.hidden && audioCtx && audioCtx.state === 'running';
  const profiles = {
    lunge:   [1.15, .23, 160, 1300, 210, 'metal'],
    slit:    [ .86, .15, 1300, 5600, 730, 'glass'],
    camera:  [ .72, .19, 650, 3100, 430, 'metal'],
    invert:  [1.45, .20, 180, 2200, 315, 'metal'],
    strobe:  [1.02, .16, 900, 4900, 880, 'glass'],
    crawl:   [1.65, .14, 260, 1900, 185, 'metal'],
    shatter: [1.30, .20, 1700, 6700, 1280, 'glass'],
    silent:  [1.80, .065, 120, 950, 145, 'metal'],
    joker:   [1.35, .22, 210, 3200, 280, 'metal']
  };
  function later(fn, ms) {
    const id = setTimeout(function () { timers.delete(id); fn(); }, ms);
    timers.add(id); return id;
  }
  function release(g) {
    if (g.dead) return;
    g.dead = true;
    g.sources.forEach(s => {
      s.onended = null;
      try { s.stop(); } catch (_) {}
      try { s.disconnect(); } catch (_) {}
    });
    g.nodes.forEach(n => { try { n.disconnect(); } catch (_) {} });
    groups.delete(g);
  }
  function cancelBursts() {
    Array.from(groups).forEach(g => { if (!g.ambient) release(g); });
    // Includes delayed legacy heartbeat calls, but leaves the ambient scheduler intact.
    Array.from(timers).forEach(id => {
      if (id !== ambientTimer) { clearTimeout(id); timers.delete(id); }
    });
  }
  function clearAll() {
    timers.forEach(id => clearTimeout(id)); timers.clear(); ambientTimer = null;
    Array.from(groups).forEach(release);
  }
  function stop() {
    phase = null; clearAll(); baseStop.apply(this, arguments);
  }
  function watch() {
    if (context === audioCtx) return;
    if (context) context.removeEventListener('statechange', stateChanged);
    context = audioCtx;
    if (context) context.addEventListener('statechange', stateChanged);
  }
  function stateChanged() {
    if (!context || context.state !== 'running') clearAll();
    else scheduleAmbient();
  }
  function group(ambient) {
    const g = {ambient:ambient, sources:[], nodes:[], remaining:0, dead:false};
    groups.add(g);
    const bus = audioCtx.createGain(), compressor = audioCtx.createDynamicsCompressor();
    bus.gain.value = ambient ? .10 : .72;
    compressor.threshold.value = -20;
    compressor.knee.value = 10;
    compressor.ratio.value = 9;
    compressor.attack.value = .003;
    compressor.release.value = .15;
    // Bounded input mix, then compression, then the existing user-controlled master.
    bus.connect(compressor); compressor.connect(ambient ? bgmGain : sfxGain);
    g.nodes.push(bus, compressor); g.bus = bus;
    return g;
  }
  function source(g, s, at, duration) {
    g.sources.push(s); g.remaining++;
    s.onended = function () {
      try { s.disconnect(); } catch (_) {}
      if (--g.remaining === 0) release(g);
    };
    s.start(at); s.stop(at + duration + .015);
  }
  function envelope(g, at, duration, peak, reverse) {
    const gain = audioCtx.createGain(); g.nodes.push(gain);
    gain.gain.setValueAtTime(0, at);
    const attack = reverse ? duration * .82 : Math.min(.009, duration * .1);
    gain.gain.linearRampToValueAtTime(peak, at + attack);
    gain.gain.exponentialRampToValueAtTime(.00001, at + duration - .003);
    gain.gain.linearRampToValueAtTime(0, at + duration);
    gain.connect(g.bus); return gain;
  }
  function noise(g, at, duration, peak, low, high, reverse) {
    duration = Math.max(.035, duration);
    const size = Math.ceil(audioCtx.sampleRate * duration);
    const buffer = audioCtx.createBuffer(1, size, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    // Irregular, grainy air: no periodic oscillator or steady noise bed.
    let previous = 0;
    for (let i=0; i<size; i++) {
      previous = previous * .38 + (Math.random()*2-1) * .62;
      data[i] = previous;
    }
    const s = audioCtx.createBufferSource(), hp = audioCtx.createBiquadFilter();
    const lp = audioCtx.createBiquadFilter(); s.buffer = buffer;
    hp.type = 'highpass'; hp.frequency.value = low; hp.Q.value = .5;
    lp.type = 'lowpass'; lp.frequency.setValueAtTime(high, at); lp.Q.value = .65;
    lp.frequency.exponentialRampToValueAtTime(Math.max(low*1.2, high*.43), at+duration);
    const env = envelope(g, at, duration, peak, reverse);
    s.connect(hp); hp.connect(lp); lp.connect(env);
    g.nodes.push(hp,lp); source(g,s,at,duration);
  }
  function material(g, at, root, duration, level, glass) {
    // Decaying inharmonic modes imitate a struck plate or cracked pane.
    // Each mode is brief; no diatonic melody, square wave or repeating beep.
    const ratios = glass ? [1,1.483,2.137,3.619,4.943] : [1,1.731,2.809,4.127,5.393];
    ratios.forEach((ratio,i) => {
      const s = audioCtx.createOscillator(); s.type = 'sine';
      const f = Math.min(9500,root*ratio*rand(.976,1.024));
      const d = duration*rand(.60,1)/(1+i*.15);
      s.frequency.setValueAtTime(f,at);
      s.frequency.exponentialRampToValueAtTime(f*rand(.93,.985),at+d);
      s.connect(envelope(g,at,d,level/(i+2),false)); source(g,s,at,d);
    });
  }
  function burst(kind) {
    kind = ({legacy:'lunge',fracture:'shatter',pulse:'silent',test:'lunge',bubbleHand:'crawl',bubbleEyes:'invert',bubbleTear:'shatter'})[kind] || kind;
    if (!Object.prototype.hasOwnProperty.call(profiles,kind) || !enabled() || document.hidden) return;
    ensureAudio(); watch();
    if (!ready() || !sfxGain) return;
    cancelBursts();
    const p = profiles[kind], g = group(false), at = audioCtx.currentTime+.006;
    const d = p[0]*rand(.94,1.06), level = p[1]*rand(.92,1.04);
    const low = p[2]*rand(.9,1.1), high = p[3]*rand(.92,1.05);
    const root = p[4]*rand(.93,1.07), glass = p[5] === 'glass';
    lastKind = kind; bursts++;
    try {
      // A breath pulled inward precedes a close broadband tear and material tail.
      const pull = kind === 'invert' ? .48 : kind === 'silent' ? .76 : .065;
      noise(g,at,pull,level*.46,low,high,true);
      const hit = at + pull*.88;
      noise(g,hit,Math.min(.36,d*.32),level,low,high,false);
      material(g,hit+.008,root,Math.min(.80,d*.62),level*.45,glass);
      noise(g,hit+.04,Math.min(.65,d*.46),level*.28,low*.7,high*.65,false);
      if (kind === 'camera' || kind === 'joker') {
        [ .075,.19,.32 ].forEach((t,i) => {
          noise(g,hit+t,.028,level*.45/(i+1),420,3900,false);
          material(g,hit+t,root*rand(.8,1.3),.13,level*.12,false);
        });
      }
      if (kind === 'strobe' || kind === 'crawl' || kind === 'shatter') {
        const count = kind === 'shatter' ? 7 : 5;
        for (let i=0;i<count;i++) {
          const t = hit+.075+i*(d-.23)/count+rand(0,.025);
          noise(g,t,rand(.035,.095),level*.40/(1+i*.22),low,high,false);
          if (glass) material(g,t,root*rand(.9,2.0),.16,level*.10,true);
        }
      }
    } catch (_) { release(g); }
  }
  function scheduleAmbient() {
    if (ambientTimer !== null || (phase !== 'dark' && phase !== 'horror') || !ready() || !bgmGain) return;
    ambientTimer = later(function () {
      ambientTimer = null;
      if (!ready() || (phase !== 'dark' && phase !== 'horror')) return;
      // Leave several seconds of clean score between finite uneasy room events.
      const g = group(true), at = audioCtx.currentTime+.015;
      const horror = phase === 'horror', root = rand(170,700);
      textures++;
      try {
        noise(g,at,rand(.38,.78),horror?.12:.075,rand(180,650),rand(1600,3400),true);
        material(g,at+.30,root,rand(.22,.55),horror?.035:.022,Math.random()<.5);
        noise(g,at+.36,.17,.035,500,2700,false);
      } catch (_) { release(g); }
      scheduleAmbient();
    }, (phase === 'horror' ? rand(3300,5800) : rand(5200,8500)));
  }
  if (typeof priorCancel === 'function') priorCancel();
  audioBurst = burst;
  audioBurst.cancel = cancelBursts;
  startBGM = function (p) {
    const target = p === 'dark' || p === 'horror' ? p : 'warm';
    if (phase !== target) { clearAll(); phase = target; }
    const result = baseStart.apply(this,arguments);
    watch(); scheduleAmbient(); return result;
  };
  stopBGM = stop;
  applySettings = function () {
    const result = baseSettings.apply(this,arguments);
    if (!enabled()) clearAll(); else { watch(); scheduleAmbient(); }
    return result;
  };
  // Route legacy effects through the same cancellation, settings and peak control.
  playScreech = function () { burst('lunge'); };
  playNoise = function () { burst('shatter'); };
  playHeartbeat = function (count) {
    cancelBursts();
    let left = Math.max(1,Math.min(4,Math.floor(Number(count)||1)));
    function pulse() {
      if (!ready()) return;
      burst('silent');
      if (--left > 0) later(pulse,2100);
    }
    pulse();
  };
  document.addEventListener('visibilitychange',function () {
    if (document.hidden) clearAll();
    else scheduleAmbient();
  });
  window.addEventListener('pagehide',clearAll);
  // Score's gesture handler runs first and handles iOS unlocking. Never force resume.
  function gesture() { watch(); scheduleAmbient(); }
  document.addEventListener('pointerdown',gesture,true);
  document.addEventListener('keydown',gesture,true);
  window.ScareAudioV21 = Object.freeze({
    stop:stop,
    status:function () {
      let sources=0, ambientVoices=0, scareVoices=0;
      groups.forEach(g => {
        sources += g.remaining;
        if (g.ambient) ambientVoices++; else scareVoices++;
      });
      return {version:21,phase:phase,enabled:enabled(),hidden:!!document.hidden,
        context:audioCtx?audioCtx.state:'absent',sources:sources,
        ambientVoices:ambientVoices,scareVoices:scareVoices,timers:timers.size,
        scheduling:ambientTimer!==null,bursts:bursts,textures:textures,lastKind:lastKind};
    }
  });
})();
