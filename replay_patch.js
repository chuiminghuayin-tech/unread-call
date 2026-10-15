/* Persistent endings, true replay, and human message cadence. */
(function(){
  const META_KEY='youremai_meta';
  const normalizeMeta=value=>{const m=isRecord(value)?value:{};const endings={};if(isRecord(m.endings))Object.keys(m.endings).forEach(key=>{if(!['__proto__','prototype','constructor'].includes(key)&&typeof m.endings[key]==='number'&&Number.isFinite(m.endings[key])&&m.endings[key]>=0)endings[key]=m.endings[key]});return {runs:Math.floor(boundedNumber(m.runs,0,0,Number.MAX_SAFE_INTEGER)),endings}};
  const readMeta=()=>normalizeMeta(safeStoredJSON(META_KEY,{}));
  const writeMeta=m=>storageSet(META_KEY,JSON.stringify(normalizeMeta(m)));
  window.naturalDelay=function(m){
    const t=(m.text||'').replace(/<[^>]+>/g,'');
    let base=m.delay||Math.min(2100,620+t.length*38);
    if(t==='……'||/[？?]$/.test(t))base*=1.32;
    if(/[！!]{2,}/.test(t)||m.type==='horror'||m.type==='fractured')base*=.68;
    if(/对不起|我害怕|想告诉你|不敢相信/.test(t))base*=1.28;
    const jitter=.88+Math.random()*.25;
    return Math.max(360,Math.round(base*jitter));
  };
  let playbackEpoch=0;
  const effectSelector='.premium-image,.jump-scare,.red-wall,.black-ritual,.blackout,.glitch-text,.melt-text,.notify,.joker-reveal,.bubble-breach';
  function clearTransient(){if(typeof audioBurst.cancel==='function')audioBurst.cancel();document.querySelectorAll(effectSelector).forEach(x=>x.remove());document.body.classList.remove('bleeding','shake','flicker','interface-tear','flooding');hideTyping();}
  const rawLoad=window.loadData;
  window.loadData=function(key){if(isBusy){toast('请等这段对话结束再读档');return false}clearTransient();const ok=rawLoad(key);if(ok&&STORY[STATE.nodeId].ending)showEnding(STORY[STATE.nodeId].ending,STATE.nodeId);return ok;};
  window.goTo=async function(id,setFlags){
    const n=STORY[id];
    if(!n)return;
    if(setFlags)Object.assign(STATE.flags,setFlags);
    STATE.nodeId=id;isBusy=true;updateHeader(n);if(n.phase)setPhase(n.phase);if(n.avatar)setAvatar(n.avatar);
    const epoch=++playbackEpoch;const active=()=>epoch===playbackEpoch;
    await maybeCG(id);if(!active())return;
    try{for(const e of n.effects||[]){await runEffect(e);if(!active())return;}}finally{document.querySelectorAll(effectSelector).forEach(x=>x.remove());document.body.classList.remove('shake','flicker','interface-tear','flooding');}
    for(const m of n.messages||[]){if(!active())return;if(m.ifReplay&&!STATE.flags.newGamePlus)continue;if(m.from==='him'){showTyping();await sleep(scaled(naturalDelay(m)));hideTyping()}else await sleep(scaled(m.delay||450));if(!active())return;appendMessage(m.from,m.text,m.type);await sleep(scaled(m.pause||Math.min(920,430+(m.text||'').length*9)))}
    if(n.ending){saveAuto();await sleep(scaled(900));if(!active())return;showEnding(n.ending,id);isBusy=false;return}
    if(n.miniGame==='joker'){isBusy=false;openJoker();return}isBusy=false;renderChoices(n);
  };
  const originalStart=window.startGame;
  window.startGame=function(){
    ++playbackEpoch;clearTransient();closeModal();closeCG();
    const meta=readMeta();meta.runs=(meta.runs||0)+1;writeMeta(meta);originalStart();
    if(Object.keys(meta.endings||{}).length){STATE.flags.newGamePlus=true;setTimeout(()=>toast('二周目 · 有些记忆不会随重启消失'),900)}
  };
  window.returnTitle=function(){
    ++playbackEpoch;isBusy=false;clearTransient();closeCG();closeModal();document.body.classList.remove('phase-dark','phase-horror');document.body.classList.add('phase-warm');
    $('game').classList.add('hidden');$('ending').classList.add('hidden');$('intro').classList.remove('hidden');
    stopBGM();init();
  };
  const originalEnding=window.showEnding;
  window.showEnding=function(e,id){
    const meta=readMeta();const key=id||STATE.nodeId||e.title;meta.endings[key]=Date.now();writeMeta(meta);
    originalEnding(e);
    const count=Object.keys(meta.endings).length;
    const kicker=document.querySelector('#ending .ending-kicker');
    if(kicker)kicker.textContent=count>=2?'FINAL RECORD · COMPLETE':'FINAL RECORD · '+count+'/2';
  };
  const originalGallery=window.openGallery;
  window.openGallery=function(){originalGallery();const m=readMeta();const sub=document.querySelector('#modalCard .sub');if(sub&&m.runs>1)sub.innerHTML+=' · 二周目 '+m.runs+' · 结局 '+Object.keys(m.endings||{}).length+'/2';};
  if(STORY.d1_0){const base=STORY.d1_0.messages||[];STORY.d1_0.messages=[{from:'sys',text:'—— 有些故事从第二次开始，才会记得你。——',pause:800,ifReplay:true},...base];}
})();
