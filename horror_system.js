// Distinct horror event choreography and procedural audio.
const HORROR_MODES=['lunge','slit','camera','invert','strobe','crawl','shatter','silent'];
let horrorCursor=0;
function audioBurst(kind){
  if(!SETTINGS.sound || SETTINGS.volume<=0)return;
  ensureAudio();
  if(!audioCtx || !sfxGain || audioCtx.state==='closed')return;
  // Never queue a scare in a suspended context: unlock for the next event only.
  if(audioCtx.state!=='running'){
    if(audioBurst.cancel)audioBurst.cancel();
    audioCtx.resume().catch(()=>{});
    return;
  }
  const lengths={lunge:1.08,slit:1.02,camera:.92,invert:1.14,strobe:1.08,crawl:1.48,shatter:1.12,silent:1.7,joker:1.14};
  if(!Object.prototype.hasOwnProperty.call(lengths,kind))return;
  if(audioBurst.cancel)audioBurst.cancel();
  const ctx=audioCtx,now=ctx.currentTime,end=now+lengths[kind];
  const nodes=[],sources=[],rand=(a,b)=>a+Math.random()*(b-a);
  const keep=n=>(nodes.push(n),n);
  const mix=keep(ctx.createGain()),limit=keep(ctx.createWaveShaper());
  const out=keep(ctx.createGain()),delay=keep(ctx.createDelay(.1)),wet=keep(ctx.createGain());
  // Bounded output, including the short reflections, before the user's master gain.
  const curve=new Float32Array(1025);
  for(let i=0;i<curve.length;i++)curve[i]=.62*Math.tanh(1.4*(i*2/(curve.length-1)-1));
  limit.curve=curve;limit.oversample='2x';
  mix.connect(limit);mix.connect(delay);delay.delayTime.value=rand(.033,.062);
  wet.gain.value=.14;delay.connect(wet).connect(limit);
  limit.connect(out).connect(sfxGain);
  out.gain.setValueAtTime(.68,now);
  out.gain.setValueAtTime(.68,end-.08);
  out.gain.linearRampToValueAtTime(0,end);
  let cleaned=false,cancelled=false;
  const clean=()=>{
    if(cleaned)return;cleaned=true;
    nodes.forEach(n=>{try{n.disconnect()}catch(e){}});
    ctx.removeEventListener('statechange',stateChanged);
    document.removeEventListener('visibilitychange',visibilityChanged);
    if(audioBurst.cancel===cancel)audioBurst.cancel=null;
  };
  const cancel=()=>{
    if(cleaned||cancelled)return;cancelled=true;
    const t=ctx.currentTime;
    out.gain.cancelScheduledValues(t);
    out.gain.setValueAtTime(.68,t);out.gain.linearRampToValueAtTime(0,t+.012);
    sources.forEach(s=>{try{s.stop(t+.013)}catch(e){}});
    if(ctx.state!=='running')clean();
  };
  const stateChanged=()=>{if(ctx.state!=='running')cancel()};
  const visibilityChanged=()=>{if(document.hidden)cancel()};
  audioBurst.cancel=cancel;
  ctx.addEventListener('statechange',stateChanged);
  document.addEventListener('visibilitychange',visibilityChanged);
  // Sampled friction, air and inharmonic struck metal; no pitch sweeps or loops.
  const voice=(at,d,level,type,freq,pan=0,material='air',attack=.003,q=.7)=>{
    d=Math.min(d,lengths[kind]-at-.085);if(d<=.006)return;
    const count=Math.max(2,Math.ceil(ctx.sampleRate*d));
    const buffer=ctx.createBuffer(1,count,ctx.sampleRate),data=buffer.getChannelData(0);
    const modes=[1,1.437,2.083,2.917,4.331].map(r=>({f:freq*r*rand(.975,1.025),p:rand(0,6.283),decay:rand(4,10)}));
    let brown=0,slow=0;
    for(let i=0;i<count;i++){
      const t=i/ctx.sampleRate,u=t/d,n=Math.random()*2-1;
      brown=(brown+.035*n)/1.035;slow=.985*slow+.015*n;
      let sample;
      if(material==='metal'){
        sample=0;
        for(const m of modes)sample+=Math.sin(2*Math.PI*m.f*t+m.p)*Math.exp(-m.decay*u)/modes.length;
        sample=sample*.85+n*.15*Math.exp(-35*u);
      }else if(material==='earth')sample=brown*5+n*.08;
      else if(material==='cloth')sample=(n*.65+brown*2)*(.5+Math.min(.5,Math.abs(slow)*9));
      else sample=n;
      const env=Math.min(1,t/attack)*Math.exp(-u*(material==='cloth'?1.4:3.6))*Math.min(1,(d-t)/.025);
      data[i]=sample*env;
    }
    const src=keep(ctx.createBufferSource()),filter=keep(ctx.createBiquadFilter()),gain=keep(ctx.createGain());
    src.buffer=buffer;filter.type=type;filter.frequency.value=freq;filter.Q.value=q;
    gain.gain.value=level;src.connect(filter).connect(gain);
    if(ctx.createStereoPanner){
      const p=keep(ctx.createStereoPanner());p.pan.value=Math.max(-1,Math.min(1,pan));
      gain.connect(p).connect(mix);
    }else gain.connect(mix);
    sources.push(src);src.start(now+at);src.stop(now+at+d);
  };
  const air=(at,d,g,f,pan=0,attack=.003)=>voice(at,d,g,'bandpass',f,pan,'air',attack,rand(.65,1.25));
  const earth=(at,d,g,f=90,pan=0,attack=.006)=>voice(at,d,g,'lowpass',f,pan,'earth',attack);
  const metal=(at,d,g,f,pan=0)=>voice(at,d,g,'highpass',f*.65,pan,'metal',.001,.5);
  const side=Math.random()<.5?-1:1,tone=rand(.94,1.06),strength=rand(.92,1.04);
  switch(kind){
    case 'lunge': // Close, heavy body impact with a ragged exhalation.
      earth(0,.8,1.75*strength,115*tone);
      air(.006,.37,.9,740*tone,-.12*side);
      voice(.035,.74,.7,'bandpass',1250*tone,.22*side,'cloth',.018);
      earth(.074,.43,.65,66);
      break;
    case 'slit': // Thin lateral tearing, then a dry wire scrape.
      voice(0,.31,.95,'highpass',2700*tone,-.8*side,'cloth',.002);
      air(rand(.042,.065),.39,.65,3800*tone,.8*side);
      metal(.115,.65,.58,1130*tone,.45*side);
      earth(.024,.22,.4,165);
      break;
    case 'camera': // Mechanical shutter clacks and a sealed resonant cavity.
      metal(0,.12,.9,680*tone,-.3*side);
      air(.012,.037,.75,2800,.15*side);
      metal(rand(.055,.082),.16,.65,390*tone,.3*side);
      earth(.025,.72,1.05,125*tone,.05,.008);
      air(.12,.38,.16,640,-.25);
      break;
    case 'invert': // Suction-like muffled pressure, swelling into a warped plate.
      earth(0,.95,1.2,72*tone,0,.11);
      voice(.035,.91,.8,'bandpass',430*tone,-.5*side,'cloth',.29,2.8);
      metal(.27,.68,.55,237*tone,.5*side);
      air(.31,.53,.32,1600,-.35*side,.14);
      break;
    case 'strobe': { // Irregular electrical arc breaks; deliberately no steady beat.
      let at=0;
      for(let i=0;i<6;i++){
        air(at,rand(.045,.095),rand(.48,.72),rand(1800,3800),side*(i%2?.65:-.65));
        if(i===0||i===3)earth(at,.19,.75,rand(100,155));
        at+=rand(.09,.165);
      }
      metal(.09,.69,.25,1520*tone);
      break;
    }
    case 'crawl': { // Uneven dragging, grit and dull knuckle contacts at the edges.
      voice(0,1.25,.65,'bandpass',560*tone,-.65*side,'cloth',.055);
      let at=.025;
      for(let i=0;i<5;i++){
        const pan=(i%2?.75:-.75)*side;
        earth(at,.23,rand(.6,.85),rand(140,210),pan);
        voice(at+.026,.24,.35,'highpass',1450,pan,'cloth',.017);
        at+=rand(.19,.25);
      }
      break;
    }
    case 'shatter': // Initial pane rupture, then scattered inharmonic fragments.
      air(0,.18,1.1,3100*tone);earth(0,.46,.9,170);
      for(let i=0;i<11;i++)metal(rand(.018,.52),rand(.16,.43),rand(.16,.28),rand(1700,4800)*tone,rand(-.95,.95));
      voice(.08,.68,.25,'highpass',3400,0,'cloth',.01);
      break;
    case 'silent': // Immediate near-threshold room pressure; one distant wall knock.
      earth(0,1.5,.43,63*tone,0,.19);
      voice(.012,1.42,.16,'bandpass',820,-.7*side,'cloth',.21);
      earth(rand(.48,.57),.38,.52,150*tone,.65*side,.003);
      metal(.54,.44,.14,310*tone,.65*side);
      break;
    case 'joker': // Heavy door/wood crack with a short chain rattle, no comic tones.
      earth(0,.9,1.4,84*tone);
      voice(.004,.17,.85,'bandpass',620*tone,-.2,'cloth',.001);
      metal(.035,.75,.53,173*tone,.25*side);
      [0,.067,.178,.323].forEach((t,i)=>{
        metal(t+rand(.09,.115),.26,.25-i*.035,rand(730,1450)*tone,side*(i%2?.55:-.55));
      });
      break;
  }
  // Silent clock source releases the whole graph after all bounded delay tails.
  const clock=keep(ctx.createBufferSource());clock.buffer=ctx.createBuffer(1,1,ctx.sampleRate);clock.loop=true;
  const zero=keep(ctx.createGain());zero.gain.value=0;clock.connect(zero).connect(out);
  clock.onended=clean;sources.push(clock);clock.start(now);clock.stop(end+.015);
}
function redWall(opts={}){return new Promise(async resolve=>{const x=document.createElement('div');x.className='red-wall '+(opts.mode||'');const words=opts.words||['回我','别关掉','我看见你了','你答应过','不要丢下我'];for(let i=0;i<(opts.count||45);i++){const s=document.createElement('i');s.textContent=words[i%words.length];s.style.cssText=`--x:${Math.random()*92}%;--y:${Math.random()*92}%;--r:${-10+Math.random()*20}deg;--d:${Math.random()*.7}s;--z:${12+Math.random()*26}px`;x.appendChild(s)}document.body.appendChild(x);audioBurst('crawl');vibrate([80,40,130,30,220]);await sleep(opts.ms||2300);x.classList.add('collapse');await sleep(350);x.remove();resolve()})}
function blackRitual(opts={}){return new Promise(async resolve=>{const x=document.createElement('div');x.className='black-ritual';const lines=opts.lines||[opts.text||'你为什么不回我'];x.innerHTML='<div class="blood-ceiling"></div><div class="ritual-copy">'+lines.map((t,i)=>`<b style="--i:${i}">${t}</b>`).join('')+'</div>';document.body.appendChild(x);audioBurst(opts.sound||'silent');vibrate([50,150,50,300]);await sleep(opts.ms||2600);x.remove();resolve()})}
function meltText(text,ms=1700){return new Promise(async resolve=>{const x=document.createElement('div');x.className='melt-text';x.setAttribute('data-copy',text);x.textContent=text;document.body.appendChild(x);audioBurst('invert');await sleep(ms);x.remove();resolve()})}
function interfaceTear(ms=1300){return new Promise(async resolve=>{document.body.classList.add('interface-tear');audioBurst('slit');vibrate([60,20,60,20,180]);await sleep(ms);document.body.classList.remove('interface-tear');resolve()})}
async function variedFlood(e){const words=e.texts||[e.text||'回我'];const count=e.count||24;document.body.classList.add('flooding');for(let i=0;i<count;i++){appendMessage('him',words[i%words.length],i%4===0?'fractured':'horror',true);if(i===4||i===11)await sleep(280);else await sleep(Math.max(22,(e.speed||72)-i*2));if(i%7===0)audioBurst(i%14?'camera':'strobe')}document.body.classList.remove('flooding');vibrate([120,35,260])}
function jumpScare(text,scare,mode){return new Promise(async resolve=>{mode=mode||HORROR_MODES[horrorCursor++%HORROR_MODES.length];const x=document.createElement('div');x.className='jump-scare scare-'+mode;x.dataset.mode=mode;const img=document.createElement('img');img.src=SCARE[scare||nextScare(text)];const strong=document.createElement('strong');strong.textContent=text||'';x.append(img,strong);document.body.appendChild(x);audioBurst(mode);const patterns={lunge:[80,20,180,20,400],slit:[35,25,35,25,200],camera:[20,90,20],invert:[250,50,250],strobe:[30,30,30,30,30,30,260],crawl:[80,120,80,120],shatter:[40,20,40,20,300],silent:[500]};vibrate(patterns[mode]);await sleep(mode==='silent'?1900:mode==='crawl'?1650:1200);x.classList.add('leave');await sleep(180);x.remove();resolve()})}
const baseRunEffect=runEffect;
runEffect=async function(e){
  if(typeof e==='string')e={type:e};
  if(e.type==='jumpscare')return jumpScare(e.text,e.scare,e.mode);
  if(e.type==='flood')return variedFlood(e);
  if(e.type==='redwall')return redWall(e);
  if(e.type==='ritual')return blackRitual(e);
  if(e.type==='melt')return meltText(e.text||'别离开我',e.ms);
  if(e.type==='tear')return interfaceTear(e.ms);
  if(e.type==='blackout'&&e.lines)return blackRitual(e);
  return baseRunEffect(e)
};
