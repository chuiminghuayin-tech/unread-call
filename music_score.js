/* Lost Phone score. Load as a CLASSIC script after horror_system.js and replay_patch.js.
 * No playback on installation. Shared engine bindings are lexical, not window.audioCtx.
 * Meter 4/4; each motif row is exactly eight eighth-notes. C major -> C minor ->
 * warped C harmonic minor. Every oscillator is a finite, enveloped musical note.
 */
(function () {
  'use strict';
  if (window.MusicScore) return;

  // [scale degree (0=C), length in eighth-notes]; null is a written rest.
  const MOTIF = [
    [[2,1],[4,1],[5,2],[4,1],[2,1],[1,1],[0,1]],
    [[1,1],[2,1],[3,2],[2,2],[1,1],[null,1]],
    [[0,1],[2,1],[4,2],[5,1],[4,1],[2,2]],
    [[1,2],[4,2],[3,1],[2,1],[1,1],[null,1]],
    [[2,1],[4,1],[7,2],[6,1],[5,1],[4,2]],
    [[5,1],[4,1],[3,2],[2,2],[0,1],[null,1]],
    [[1,1],[3,1],[5,2],[4,1],[3,1],[1,2]],
    [[4,2],[1,1],[2,1],[0,3],[null,1]]
  ];
  const CHORDS = [0,5,3,4,0,5,1,4];
  const MODES = {
    warm: {bpm:112, scale:[0,2,4,5,7,9,11], level:.80, cutoff:5900},
    dark: {bpm:80, scale:[0,2,3,5,7,8,11], level:.69, cutoff:3600},
    horror: {bpm:62, scale:[0,1,3,5,7,8,11], level:.61, cutoff:2650}
  };
  const LOOKAHEAD = .14, INTERVAL = 35, LEAD = .045;
  const voices = new Set(), log = [];
  let desired = null, playing = null, timer = null, nextTime = 0, step = 0;
  let bus = null, filter = null, watched = null, unlocked = false;
  let starts = 0, generations = 0, lateSkips = 0, accents = 0, lastAccent = -Infinity;
  const originalEnsure = ensureAudio;
  const originalStop = stopBGM;
  const originalSettings = applySettings;
  const oldBurstCancel = typeof audioBurst === 'function' && audioBurst.cancel;
  const phaseOf = p => Object.prototype.hasOwnProperty.call(MODES,p) ? p : 'warm';
  const enabled = () => !!SETTINGS.sound && Number(SETTINGS.volume) > 0;
  const gestureActive = () => !!(navigator.userActivation && navigator.userActivation.isActive);
  const hz = midi => 440 * Math.pow(2,(midi-69)/12);
  function pitch(degree, mode, base) {
    const octave = Math.floor(degree/7), d = ((degree%7)+7)%7;
    return base + mode.scale[d] + octave*12;
  }
  function remember(event) {
    log.push(event);
    if (log.length > 256) log.shift();
  }
  function removeSource(source) {
    const i = bgmNodes.indexOf(source);
    if (i !== -1) bgmNodes.splice(i,1);
  }
  function release(v) {
    if (v.dead) return;
    v.dead = true;
    v.sources.forEach(source => {
      source.onended = null;
      try { source.stop(); } catch (_) {}
      try { source.disconnect(); } catch (_) {}
      removeSource(source);
    });
    v.nodes.forEach(node => { try { node.disconnect(); } catch (_) {} });
    voices.delete(v);
  }
  function clearVoices(onlyAccents) {
    Array.from(voices).forEach(v => { if (!onlyAccents || v.accent) release(v); });
  }
  function halt() {
    generations++;
    if (timer !== null) clearTimeout(timer);
    timer = null;
    clearVoices(false);
    // Also clear the engine's legacy interval and any legacy drone sources.
    if (bgmTimer !== null) { clearInterval(bgmTimer); bgmTimer = null; }
    bgmNodes.forEach(n => { try { n.stop(); n.disconnect(); } catch (_) {} });
    bgmNodes = [];
    if (bus) { try { bus.disconnect(); } catch (_) {} }
    if (filter) { try { filter.disconnect(); } catch (_) {} }
    bus = filter = null;
    playing = null;
  }
  function watchContext() {
    if (watched === audioCtx) return;
    if (watched) watched.removeEventListener('statechange', contextChanged);
    watched = audioCtx;
    if (watched) watched.addEventListener('statechange', contextChanged);
  }
  function contextChanged() {
    if (!audioCtx || audioCtx.state !== 'running') halt();
    else maybeStart();
  }
  // Do not resume from a scheduler tick or a visual scare. Resume only in a gesture.
  ensureAudio = function () {
    originalEnsure();
    watchContext();
    if (gestureActive()) {
      unlocked = true;
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().then(maybeStart).catch(function () {});
      }
    }
  };
  function makeBus() {
    bus = audioCtx.createGain();
    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(MODES[playing].cutoff,audioCtx.currentTime);
    filter.Q.value = .35;
    // Fade in the new arrangement; per-note releases handle the end of each note.
    bus.gain.setValueAtTime(0,audioCtx.currentTime);
    bus.gain.linearRampToValueAtTime(MODES[playing].level,audioCtx.currentTime+.09);
    bus.connect(filter); filter.connect(bgmGain);
  }
  function note(at, midi, length, level, role, detune, accent) {
    if (!bus || !enabled() || document.hidden || audioCtx.state !== 'running') return;
    const v = {sources:[], nodes:[], dead:false, accent:!!accent};
    voices.add(v);
    const gain = audioCtx.createGain(); v.nodes.push(gain);
    const attack = role === 'melody' ? .018 : .024;
    length = Math.max(.09,Math.min(2.8,length));
    gain.gain.setValueAtTime(0,at);
    gain.gain.linearRampToValueAtTime(level,at+attack);
    gain.gain.exponentialRampToValueAtTime(Math.max(.00012,level*.32),at+length*.38);
    gain.gain.exponentialRampToValueAtTime(.00008,at+length-.018);
    gain.gain.linearRampToValueAtTime(0,at+length);
    gain.connect(bus);
    const isWarm = playing === 'warm';
    // Fundamental is always dominant; small harmonic gives a soft struck-key color.
    const partials = role === 'melody' ? [[1,1,'sine'],[2,isWarm?.16:.09,'sine'],[3,.035,'sine']] : [[1,1,'sine'],[2,.06,'sine']];
    partials.forEach(([ratio,weight,type]) => {
      const osc = audioCtx.createOscillator(), part = audioCtx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(hz(midi)*ratio,at);
      osc.detune.setValueAtTime(detune || 0,at);
      if (playing === 'horror' && role === 'melody') {
        // Written tape sag, not an indefinitely running LFO or a comic pitch dive.
        osc.detune.linearRampToValueAtTime((detune||0)-13,at+length*.48);
        osc.detune.linearRampToValueAtTime((detune||0)+4,at+length);
      }
      part.gain.value = weight; osc.connect(part); part.connect(gain);
      v.nodes.push(part); v.sources.push(osc); bgmNodes.push(osc);
      osc.onended = function () {
        removeSource(osc);
        v.ended = (v.ended||0)+1;
        if (v.ended === v.sources.length) release(v);
      };
      osc.start(at); osc.stop(at+length+.012);
    });
    remember({phase:playing, role:role, at:at, midi:midi, length:length, level:level, accent:!!accent});
  }
  function texture(at, bar, mode) {
    // One tiny, finite struck material every four bars in dark, two in horror.
    const material = bar%3, root = material===0 ? 330 : material===1 ? 1175 : 740;
    const ratios = material===0 ? [1,2.71,4.09] : material===1 ? [1,1.51,2.32] : [1,2];
    const duration = material===2 ? .20 : .52;
    const v = {sources:[],nodes:[],dead:false,accent:false}; voices.add(v);
    ratios.forEach((ratio,i) => {
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(root*ratio,at);
      if (material===2) osc.frequency.exponentialRampToValueAtTime(root*ratio*.94,at+duration);
      const peak = (mode==='horror'?.003:.002)/(i+1);
      gain.gain.setValueAtTime(0,at); gain.gain.linearRampToValueAtTime(peak,at+.012);
      gain.gain.exponentialRampToValueAtTime(.00001,at+duration-.01);
      gain.gain.linearRampToValueAtTime(0,at+duration);
      osc.connect(gain); gain.connect(bus); v.nodes.push(gain); v.sources.push(osc); bgmNodes.push(osc);
      osc.onended = function () { removeSource(osc); v.ended=(v.ended||0)+1; if(v.ended===v.sources.length)release(v); };
      osc.start(at); osc.stop(at+duration+.012);
    });
    remember({phase:mode,role:['steel','glass','drop'][material],at:at,level:.003});
  }
  function scheduleStep(index, at) {
    const mode = MODES[playing], eighth = 30/mode.bpm;
    const bar = Math.floor(index/8)%8, slot = index%8, cycle = Math.floor(index/64);
    let offset = 0;
    MOTIF[bar].forEach(([degree,units],j) => {
      if (offset === slot && degree !== null) {
        const fractured = playing === 'horror';
        // Keep phrase openings and cadences. Only some internal notes disappear.
        const missing = fractured && slot!==0 && bar!==7 && (bar*7+j+cycle)%9===5;
        if (!missing) {
          const jitter = fractured ? [0,.016,-.009,.023][(bar+j)%4] : 0;
          const drift = fractured ? [-16,9,-7,21,-12,5,0,-19][(bar+j)%8] : 0;
          const base = playing==='warm' ? 72 : 60;
          const midi = pitch(degree,mode,base);
          const sustain = fractured ? (j%3===1?.42:1.18) : playing==='dark'?1.48:1.38;
          note(Math.max(at+jitter,audioCtx.currentTime+.006),midi,eighth*units*sustain,.047,'melody',drift);
          // A quiet broken tape repeat, bounded inside this slot.
          if (fractured && j===2 && bar%3===1) note(at+.12,midi,.14,.009,'melody',drift-11);
        }
      }
      offset += units;
    });
    // Pitched, separated bass and broken chords: no held drone or noise bed.
    if (slot===0 || slot===4) {
      const degree = CHORDS[bar] + (slot===4?4:0);
      note(at,pitch(degree,mode,48),eighth*(playing==='warm'?2.1:2.7),.018,'bass',0);
    }
    if (slot===2 || slot===6) {
      note(at,pitch(CHORDS[bar]+(slot===2?2:4),mode,60),eighth*1.45,.012,'harmony',playing==='horror'?-8:0);
    }
    if (playing!=='warm' && slot===5 && (playing==='horror'?bar%2===1:bar%4===3)) texture(at,bar,playing);
  }
  function pump(token) {
    timer = null;
    if (token!==generations || !desired) return;
    if (document.hidden || !enabled() || !audioCtx || audioCtx.state!=='running') { halt(); return; }
    const now = audioCtx.currentTime, eighth = 30/MODES[playing].bpm;
    // A stalled tab must never replay accumulated notes. Skip to a future slot.
    if (nextTime < now+.006) {
      const skipped = Math.ceil((now+LEAD-nextTime)/eighth);
      step += skipped; nextTime += skipped*eighth; lateSkips += skipped;
    }
    while (nextTime < now+LOOKAHEAD) {
      scheduleStep(step,nextTime); step++; nextTime+=eighth;
    }
    timer = setTimeout(function () { pump(token); },INTERVAL);
  }
  function maybeStart() {
    if (!desired || document.hidden || !enabled() || !unlocked || !audioCtx || !bgmGain || audioCtx.state!=='running') return;
    if (playing===desired && timer!==null) return;
    halt(); playing=desired; step=0; nextTime=audioCtx.currentTime+LEAD;
    starts++; makeBus(); pump(generations);
  }
  startBGM = function (p) {
    const target=phaseOf(p);
    if (desired!==target) { halt(); desired=target; }
    // Same phase calls (including successive story nodes) preserve phrase position.
    ensureAudio(); maybeStart();
  };
  stopBGM = function () { desired=null; halt(); };
  applySettings = function () {
    originalSettings.apply(this,arguments);
    if (!enabled()) halt(); else maybeStart();
  };
  function gesture(event) {
    if (!event.isTrusted || (event.type==='keydown' && event.repeat)) return;
    unlocked=true;
    // No requested score means title-screen gestures do not create audio.
    if (desired) {
      ensureAudio();
      if (audioCtx && audioCtx.state==='suspended') audioCtx.resume().then(maybeStart).catch(function(){});
      else maybeStart();
    }
  }
  function visibility() {
    if (document.hidden) halt();
    else {
      if (desired) desired=phaseOf(STATE.phase || desired);
      // Never resume a suspended context here. Wait for a fresh trusted gesture.
      maybeStart();
    }
  }
  document.addEventListener('pointerdown',gesture,true);
  document.addEventListener('keydown',gesture,true);
  document.addEventListener('visibilitychange',visibility);
  window.addEventListener('pagehide',function () { halt(); });
  window.addEventListener('pageshow',visibility);

  if (typeof oldBurstCancel==='function') oldBurstCancel();
  originalStop(); // Installation silences an old drone but never starts the score.
  audioBurst = function (kind) {
    if (!desired || !playing || !unlocked || !enabled() || document.hidden || !audioCtx || audioCtx.state!=='running') return;
    const now=audioCtx.currentTime;
    if (now-lastAccent<.65) return;
    lastAccent=now; accents++;
    clearVoices(true);
    // All scares share a tiny diatonic accent from the current chord, no noise hit.
    const bar=Math.floor(Math.max(0,step-1)/8)%8, mode=MODES[playing];
    note(now+.008,pitch(CHORDS[bar]+2,mode,60),.25,.010,'accent',playing==='horror'?-7:0,true);
    remember({role:'scare',kind:String(kind||''),at:now,level:.010});
  };
  audioBurst.cancel = function () { clearVoices(true); };
  // Fold all legacy scare-noise routes back into the score. Visuals and vibration stay intact.
  playScreech = function () { audioBurst('legacy'); };
  playNoise = function () { audioBurst('fracture'); };
  playHeartbeat = function (count) {
    if (!desired || !playing || !enabled()) return;
    let left = Math.min(Number(count)||1,4);
    const pulse = function () {
      if (!left-- || !desired || document.hidden) return;
      audioBurst('pulse');
      setTimeout(pulse,820);
    };
    pulse();
  };
  window.MusicScore = Object.freeze({
    start:function(p){ startBGM(p || STATE.phase); },
    stop:function(){ stopBGM(); },
    test:function(p){ startBGM(p || 'warm'); return this.status(); },
    accent:function(){ audioBurst('test'); },
    status:function(){ return {desired:desired,phase:playing,unlocked:unlocked,
      scheduling:timer!==null,voices:voices.size,sources:bgmNodes.length,
      starts:starts,step:step,nextTime:nextTime,lateSkips:lateSkips,accents:accents,
      context:audioCtx?audioCtx.state:'absent',hidden:!!document.hidden}; },
    events:function(){ return log.map(e=>Object.assign({},e)); },
    score:function(){ return {meter:'4/4',bars:8,chords:CHORDS.slice(),
      motif:MOTIF.map(bar=>bar.map(pair=>pair.slice())),
      bpm:{warm:112,dark:80,horror:62}}; }
  });
})();
