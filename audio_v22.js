/* Classic script; load LAST, after music_score.js and audio_v21.js.
 * Original procedural synthesis; no downloaded or unlicensed audio.
 * Design references (pages visited, NOT auditioned):
 * https://pixabay.com/sound-effects/search/horror/
 * https://pixabay.com/sound-effects/search/computer%20glitch/
 * https://freesound.org/search/?q=glass+breaking
 */
(function () {
  'use strict';
  if (window.ScareAudioV22) return;
  const baseStop = stopBGM, baseSettings = applySettings;
  const baseCancel = typeof audioBurst.cancel === 'function' ? audioBurst.cancel : null;
  const baseEffect = runEffect, baseMessage = playMessageSfx;
  const groups = new Set(), timers = new Set();
  let watched = null, lastKind = null, bursts = 0, floodDepth = 0, floodEntries = 0;
  let errors = 0, lastError = null, effectHint = null;
  const R = (a,b) => a + Math.random()*(b-a);
  const enabled = () => !!SETTINGS.sound && Number(SETTINGS.volume) > 0;
  const ready = () => enabled() && !document.hidden && audioCtx && audioCtx.state === 'running' && sfxGain;
  const durations = {flood:2.45,shatter:1.65,lunge:1.12,slit:1.05,camera:.82,
    invert:1.30,strobe:1.14,crawl:1.72,silent:1.90,joker:1.52};
  const aliases = {legacy:'lunge',test:'lunge',fracture:'shatter',pulse:'silent',
    blackout:'silent',glitch:'flood',flicker:'strobe',tear:'slit',melt:'invert',
    redwall:'crawl',ritual:'silent',bubbleHand:'crawl',screenHand:'crawl',
    bubbleEyes:'invert',bubbleTear:'slit'};
  function release(g) {
    if (g.dead) return;
    g.dead = true;
    if (g.timer != null) { clearTimeout(g.timer); timers.delete(g.timer); }
    g.sources.forEach(s => {
      s.onended = null;
      try { s.stop(); } catch (_) {}
      try { s.disconnect(); } catch (_) {}
    });
    g.nodes.forEach(n => { try { n.disconnect(); } catch (_) {} });
    groups.delete(g);
  }
  function cancel() {
    timers.forEach(clearTimeout); timers.clear();
    Array.from(groups).forEach(release);
    // Stops V21's legacy heartbeat/scare calls, not its ambient or the warm score.
    if (baseCancel) baseCancel();
  }
  function watch() {
    if (watched === audioCtx) return;
    if (watched) watched.removeEventListener('statechange', stateChanged);
    watched = audioCtx;
    if (watched) watched.addEventListener('statechange', stateChanged);
  }
  function stateChanged() { if (!watched || watched.state !== 'running') cancel(); }
  function keep(g,n) { g.nodes.push(n); return n; }
  function group(kind) {
    const c = audioCtx, g = {sources:[],nodes:[],remaining:0,dead:false,kind,timer:null};
    groups.add(g);
    g.at = c.currentTime + .008;
    const bus = keep(g,c.createGain()), hp = keep(g,c.createBiquadFilter());
    const lp = keep(g,c.createBiquadFilter()), comp = keep(g,c.createDynamicsCompressor());
    const limit = keep(g,c.createWaveShaper()), out = keep(g,c.createGain());
    bus.gain.value = .92;
    hp.type = 'highpass'; hp.frequency.value = 27; hp.Q.value = .5;
    lp.type = 'lowpass'; lp.frequency.value = Math.min(9200,c.sampleRate*.43); lp.Q.value = .5;
    comp.threshold.value = -16; comp.knee.value = 8; comp.ratio.value = 12;
    comp.attack.value = .0015; comp.release.value = .105;
    const curve = new Float32Array(2049);
    for (let i=0;i<curve.length;i++) curve[i] = .52*Math.tanh(2.15*(2*i/(curve.length-1)-1));
    limit.curve = curve; limit.oversample = '2x';
    out.gain.value = .74;
    bus.connect(hp); hp.connect(lp); lp.connect(comp); comp.connect(limit);
    limit.connect(out); out.connect(sfxGain); g.bus = bus;
    // A suspended context cannot drain onended: statechange cancels immediately;
    // bounded wall-clock cleanup additionally handles interrupted mobile output.
    g.timer = setTimeout(() => release(g), (durations[kind]+.45)*1000);
    timers.add(g.timer);
    return g;
  }
  function env(g,t,d,level,attack=.003,reverse=false,pan=0) {
    const c=audioCtx, at=g.at+t, n=keep(g,c.createGain());
    attack=Math.min(Math.max(.001,attack),d*.4);
    n.gain.setValueAtTime(0,at);
    if (reverse) {
      n.gain.linearRampToValueAtTime(level*.07,at+d*.16);
      n.gain.exponentialRampToValueAtTime(Math.max(.00002,level),at+d*.88);
      n.gain.linearRampToValueAtTime(0,at+d);
    } else {
      n.gain.linearRampToValueAtTime(level,at+attack);
      n.gain.exponentialRampToValueAtTime(.00001,at+Math.max(attack+.001,d-.006));
      n.gain.linearRampToValueAtTime(0,at+d);
    }
    if(c.createStereoPanner) {
      const p=keep(g,c.createStereoPanner()); p.pan.value=Math.max(-.9,Math.min(.9,pan));
      n.connect(p); p.connect(g.bus);
    } else n.connect(g.bus);
    return n;
  }
  function source(g,s,t,d) {
    g.sources.push(s); g.remaining++;
    s.onended=()=> {
      if(g.dead) return;
      try{s.disconnect();}catch(_){}
      if(--g.remaining===0) release(g);
    };
    s.start(g.at+t); s.stop(g.at+t+d+.004);
  }
  function sampled(g,t,d,level,fill,low=30,high=8500,pan=0,attack=.003,reverse=false,loop=0) {
    const c=audioCtx, count=Math.max(4,Math.ceil(c.sampleRate*(loop||d)));
    const b=c.createBuffer(1,count,c.sampleRate), a=b.getChannelData(0);
    fill(a,c.sampleRate);
    const s=c.createBufferSource(); s.buffer=b; s.loop=!!loop;
    const hp=keep(g,c.createBiquadFilter()), lp=keep(g,c.createBiquadFilter());
    hp.type='highpass'; hp.frequency.value=low; hp.Q.value=.5;
    lp.type='lowpass'; lp.frequency.value=Math.min(high,c.sampleRate*.43); lp.Q.value=.6;
    s.connect(hp); hp.connect(lp); lp.connect(env(g,t,d,level,attack,reverse,pan));
    source(g,s,t,d);
  }
  function air(g,t,d,level,low=40,high=8500,pan=0,attack=.003,reverse=false,texture=0) {
    sampled(g,t,d,level,a=> {
      let brown=0,slow=0;
      for(let i=0;i<a.length;i++) {
        const n=R(-1,1); brown=.97*brown+.03*n; slow=.995*slow+.005*n;
        const friction=texture===2 ? (.18+Math.min(.82,Math.abs(slow)*14)) : 1;
        a[i]=(texture===1?brown*4.5:texture===2?(n*.48+brown*2.1)*friction:n);
      }
    },low,high,pan,attack,reverse);
  }
  function tone(g,t,d,level,f,to=f,pan=0,attack=.003,reverse=false) {
    const s=audioCtx.createOscillator(); s.type='sine';
    s.frequency.setValueAtTime(f,g.at+t);
    if(to!==f) s.frequency.exponentialRampToValueAtTime(Math.max(28,to),g.at+t+d);
    s.connect(env(g,t,d,level,attack,reverse,pan)); source(g,s,t,d);
  }
  function modes(g,t,d,level,root,pan=0,glass=false) {
    // Impulsive material modes live inside ONE buffer, not a melodic oscillator stack.
    const ratios=glass?[1,1.427,2.381,3.913,5.167]:[1,1.73,2.79,4.11];
    const modes=ratios.map((r,i)=>({f:root*r*R(.985,1.015),p:R(0,6.283),w:1/(i+1.7),dec:R(5,13)}));
    sampled(g,t,d,level,(a,sr)=> {
      for(let i=0;i<a.length;i++) {
        const u=i/sr, x=u/d; let v=0;
        modes.forEach(m=> {v+=Math.sin(2*Math.PI*m.f*u+m.p)*m.w*Math.exp(-m.dec*x);});
        a[i]=v*.45+R(-1,1)*.35*Math.exp(-55*x);
      }
    },glass?700:110,glass?9000:6400,pan,.001);
  }
  const designs = {
    lunge(g) {
      // Heavy chest-height slam, low body resonance, and a torn close exhalation.
      tone(g,0,.72,.62,108,43);
      air(g,0,.22,.46,40,960,0,.001, false,1);
      air(g,.009,.20,.28,650,5600,-.12);
      air(g,.038,.66,.30,170,1750,.20,.011,false,2);
      modes(g,.042,.46,.13,157,-.18);
      tone(g,.11,.42,.16,63,39);
    },
    slit(g) {
      // Two lateral friction tears, wire scream, abruptly stopped, no impact template.
      air(g,0,.43,.40,1300,7800,-.8,.005,false,2);
      air(g,.19,.39,.30,2350,9200,.8,.009,false,2);
      [1843,1937,2879].forEach((f,i)=>tone(g,.035+i*.028,.44,.060,f,f*R(.92,1.05),.55));
      air(g,.64,.095,.24,900,6600,-.35);
      modes(g,.68,.25,.09,782,.4);
    },
    camera(g) {
      // Shutter blade, gear stop, mirror slap, locked hollow enclosure.
      modes(g,0,.075,.35,740,-.22);
      air(g,.005,.023,.32,1700,7900,.18);
      modes(g,.062,.10,.26,406,.24);
      air(g,.105,.041,.23,600,4500,-.2);
      tone(g,.13,.48,.28,132,87);
      air(g,.136,.24,.18,90,700,0,.004,false,1);
      modes(g,.188,.13,.13,980,.1);
    },
    invert(g) {
      // Short reversed prepared-piano cluster: semitone + tritone, then implosion.
      [130.81,138.59,185.00,261.63,369.99].forEach((f,i)=> {
        tone(g,.015+i*.017,.76,.092,f,f*.983,(i-2)*.2,.01,true);
        tone(g,.03+i*.017,.70,.023,f*2.007,f*1.997,(2-i)*.2,.01,true);
      });
      air(g,.13,.64,.19,120,2500,0,.01,true,2);
      tone(g,.79,.35,.24,91,46);
      air(g,.78,.065,.27,160,6800);
      // A real rest follows the reversal instead of a long generic noise tail.
    },
    strobe(g) {
      // Electrical arcs on an uneven 3+2+1 rhythm with genuine gaps.
      [0,.11,.23,.48,.61,.89].forEach((t,i)=> {
        air(g,t,i===5?.12:.046,.30,950,8200,i%2?.6:-.6);
        sampled(g,t,.055,.16,(a,sr)=> {
          let hold=0;
          for(let j=0;j<a.length;j++) {if(j%11===0) hold=R(-1,1); a[j]=hold*.6+Math.sin(2*Math.PI*R(47,53)*j/sr)*.3;}
        },70,4800);
        if(i===0||i===3) tone(g,t,.11,.21,122,73);
      });
    },
    crawl(g) {
      // Low dusty dragging travels under the screen, with unequal knuckle contacts.
      air(g,0,1.45,.35,70,860,-.60,.07,false,2);
      [0,.27,.59,.96,1.25].forEach((t,i)=> {
        const p=i%2?.65:-.65;
        air(g,t+.045,.23,.24,50,660,p,.009,false,1);
        air(g,t+.09,.17,.14,430,2600,p,.016,false,2);
        tone(g,t+.045,.13,.12,144-i*10,99-i*6,p);
      });
    },
    shatter(g) {
      // Broad pane rupture -> crack splits -> independent rebounding shards -> grit.
      air(g,0,.065,.64,240,9200);
      air(g,.012,.21,.38,1500,9200,0,.001);
      tone(g,0,.18,.28,198,97);
      [.017,.034,.071].forEach((t,i)=>air(g,t,.025,.32/(i+1),1900,9200,R(-.6,.6)));
      for(let i=0;i<19;i++) {
        const t=.045+Math.pow(i/19,1.4)*1.05+R(0,.04), p=R(-.88,.88);
        const root=R(1450,3300), level=.15/(1+i*.12);
        modes(g,t,R(.065,.24),level,root,p,true);
        air(g,t,.014,level*.8,2400,9200,p);
        if(i%4===0) modes(g,t+.047,.075,level*.42,root*R(1.08,1.5),-p,true);
      }
      air(g,.38,.96,.105,3500,9200,.3,.014,false,2);
    },
    silent(g) {
      // Near-floor pressure, uneasy beating low modes, one distant dry wall knock.
      tone(g,0,1.65,.095,48,47,0,.22);
      tone(g,.03,1.60,.068,51.5,50.3,0,.20);
      air(g,.12,1.40,.077,60,480,-.45,.23,false,1);
      air(g,.82,.065,.09,90,880,.55,.001,false,1);
      modes(g,.83,.28,.053,146,.55);
    },
    joker(g) {
      // A recognizable telephone bell becomes detuned; no playful comic melody.
      [0,.22,.67,.94].forEach((t,i)=> {
        const p=i%2?.36:-.36;
        modes(g,t,.27,.18,559+(i%2?17:-13),p);
        tone(g,t,.23,.094,879+i*7,864-i*11,p);
        tone(g,t,.24,.068,913-i*8,934+i*4,-p);
        air(g,t,.018,.13,1000,7600,p);
      });
      tone(g,1.04,.39,.29,96,48);
      air(g,1.05,.11,.20,160,1700,0,.002,false,1);
    },
    flood(g) {
      // The SAME 8ms PCM frame repeats (buffer lock), then drops entire chunks.
      // Quantization and sample-hold are data corruption, not notification beeps.
      const frame=new Float32Array(Math.max(32,Math.floor(audioCtx.sampleRate*.008)));
      let hold=0;
      for(let i=0;i<frame.length;i++) {
        if(i%5===0) hold=Math.round(R(-1,1)*5)/5;
        frame[i]=(hold*.65+Math.sin(i*.163)*.23)*Math.pow(Math.sin(Math.PI*i/(frame.length-1)),.45);
      }
      const chunks=[[0,.31,.32],[.35,.20,.35],[.60,.40,.38],[1.08,.16,.33],[1.33,.31,.31],[1.83,.095,.30],[2.02,.065,.28]];
      chunks.forEach(([t,d,l],i)=> {
        sampled(g,t,d,l,a=> {for(let j=0;j<a.length;j++)a[j]=frame[j%frame.length];},100,6700,i%2?.12:-.12,.002,false,.008);
        air(g,t+d-.012,.024,.19,650,8600);
      });
      // Terminal brownout: low power sag, a final hard dropout, then silence.
      tone(g,2.13,.23,.25,94,32);
      air(g,2.13,.18,.13,40,740,0,.002,false,1);
      air(g,2.365,.022,.21,1500,8000);
    }
  };
  function burst(kind) {
    if(floodDepth) return; // Old per-message routes cannot retrigger the flood cue.
    kind=aliases[kind]||kind;
    if(!Object.prototype.hasOwnProperty.call(designs,kind)||!enabled()||document.hidden) return;
    ensureAudio(); watch();
    // No forced resume and no stale scare queued for the next iOS gesture.
    if(!ready()) return;
    cancel();
    let g;
    try { g=group(kind); designs[kind](g); lastKind=kind; bursts++; }
    catch(e) { errors++; lastError=String(e&&e.message||e); if(g)release(g); }
  }
  if(baseCancel) baseCancel();
  audioBurst=burst; audioBurst.cancel=cancel;
  playScreech=function(){burst('lunge');};
  playNoise=function(){burst(effectHint==='glitch'?'flood':'shatter');};
  playHeartbeat=function(count) {
    // One bounded pressure cue; legacy delayed callbacks cannot revive after stop.
    burst('silent');
  };
  playMessageSfx=function() { if(!floodDepth&&!document.hidden&&enabled()) return baseMessage.apply(this,arguments); };
  // Existing horror_system runEffect('flood') directly calls this shared binding.
  // Keep original visual timing, but call audioBurst('flood') exactly ONCE.
  variedFlood=async function(e) {
    const words=e.texts&&e.texts.length?e.texts:[e.text||'回我'];
    const count=e.count||24;
    floodEntries++; audioBurst('flood'); floodDepth++;
    document.body.classList.add('flooding');
    try {
      for(let i=0;i<count;i++) {
        appendMessage('him',words[i%words.length],i%4===0?'fractured':'horror',true);
        if(i===4||i===11) await sleep(280);
        else await sleep(Math.max(22,(e.speed||72)-i*2));
      }
      vibrate([120,35,260]);
    } finally {
      floodDepth=Math.max(0,floodDepth-1);
      if(!floodDepth) document.body.classList.remove('flooding');
    }
  };
  runEffect=async function(effect) {
    const e=typeof effect==='string'?{type:effect}:effect;
    if(!e) return;
    // Rituals with lines already issue their own silent/selected cue.
    if(e.type==='blackout'&&!e.lines) audioBurst(e.sound||'silent');
    if(e.type==='flicker') audioBurst('strobe');
    if(e.type==='shake') audioBurst('lunge');
    const previousHint=effectHint; effectHint=e.type;
    try { return await baseEffect.apply(this,arguments); }
    finally { effectHint=previousHint; }
  };
  stopBGM=function() { cancel(); return baseStop.apply(this,arguments); };
  applySettings=function() {
    const result=baseSettings.apply(this,arguments);
    if(!enabled()) cancel(); else watch();
    return result;
  };
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);
  // V21 ambient scheduler and the score remain untouched, including warm phrases.
  window.ScareAudioV22=Object.freeze({
    cancel:cancel, test:kind=>{burst(kind||'lunge');return window.ScareAudioV22.status();},
    status:()=> {
      let sources=0; groups.forEach(g=>{sources+=g.remaining;});
      return {version:22,enabled:enabled(),hidden:!!document.hidden,
        context:audioCtx?audioCtx.state:'absent',scareVoices:groups.size,sources,
        timers:timers.size,bursts,lastKind,floodDepth,floodEntries,errors,lastError,
        kinds:Object.keys(designs),durations:Object.assign({},durations),
        peakBoundBeforeUserMaster:.52*.74};
    },
    sources:()=>[
      'https://pixabay.com/sound-effects/search/horror/',
      'https://pixabay.com/sound-effects/search/computer%20glitch/',
      'https://freesound.org/search/?q=glass+breaking'
    ]
  });
})();
