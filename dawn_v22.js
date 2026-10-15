/* Load last: dawn pacing and score recovery. */
(function(){
'use strict';
let active=null,light=null,stage=0;
function finish(reason){const s=active;if(!s)return;active=null;cancelAnimationFrame(s.raf);s.animations.forEach(a=>a.cancel());if(s.photo)s.photo.remove();if(typeof bgmGain!=='undefined'&&bgmGain)bgmGain.gain.value=1;s.resolve({reason});}
function reset(){finish('cancel');stage=0;document.body.classList.remove('dawn22-stage1','dawn22-stage2','dawn22-stage3');if(light){light.remove();light=null;}}
function transition(e){finish('replace');if(document.hidden)return Promise.resolve();if(!light){light=document.createElement('div');light.className='dawn22-light';document.body.appendChild(light);}stage=Math.max(stage,Math.min(3,Number(e.stage)||1));document.body.classList.remove('dawn22-stage1','dawn22-stage2','dawn22-stage3');document.body.classList.add('dawn22-stage'+stage);
const node=STATE.nodeId,duration=Math.max(1800,Number(e.duration)||3600);
return new Promise(resolve=>{const s={resolve,raf:0,animations:[],node,start:null};active=s;
function frame(t){if(active!==s)return;if(document.hidden||STATE.nodeId!==node)return finish('cancel');if(s.start===null)s.start=t;const p=Math.min(1,(t-s.start)/duration);if(stage===3&&bgmGain){bgmGain.gain.value=1-.82*Math.sin(Math.PI*p);if(p>=.5&&!s.warmed){s.warmed=true;startBGM('warm');}}if(p===1)return finish('complete');s.raf=requestAnimationFrame(frame);}s.raf=requestAnimationFrame(frame);});}
function photo(){finish('replace');if(document.hidden)return Promise.resolve();STATE.cgs.cg_dawn_heal=true;try{const c=JSON.parse(localStorage.getItem('youremai_cgs')||'{}');c.cg_dawn_heal=true;localStorage.setItem('youremai_cgs',JSON.stringify(c));}catch(_){}
return new Promise(resolve=>{const root=document.createElement('div');root.className='dawn22-photo';const img=document.createElement('img');img.src='assets/dawn_heal.webp';img.alt='雨霁初晴';root.appendChild(img);document.body.appendChild(root);const s={resolve,photo:root,raf:0,animations:[],start:null,node:STATE.nodeId};active=s;const anim=root.animate([{opacity:0},{offset:.32,opacity:1},{offset:.72,opacity:1},{opacity:0}],{duration:5200,fill:'both'});anim.pause();s.animations.push(anim);
function frame(t){if(active!==s)return;if(document.hidden||STATE.nodeId!==s.node)return finish('cancel');if(s.start===null)s.start=t;const elapsed=t-s.start;anim.currentTime=elapsed;if(elapsed>=5200)return finish('complete');s.raf=requestAnimationFrame(frame);}s.raf=requestAnimationFrame(frame);});}
const effect=window.runEffect;window.runEffect=function(e){e=typeof e==='string'?{type:e}:e;if(e&&e.type==='dawnTransition')return transition(e);if(e&&e.type==='dawnImage')return photo();return effect.apply(this,arguments);};
['returnTitle','startGame','loadData'].forEach(name=>{const fn=window[name];if(typeof fn==='function')window[name]=function(){reset();return fn.apply(this,arguments);};});document.addEventListener('visibilitychange',()=>{if(document.hidden)finish('hidden');});window.DawnV22={reset,status:()=>({stage,active:!!active})};
})();
