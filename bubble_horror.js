/* Canvas geometry is animated from a live bubble, not a fullscreen picture. */
(function(){
const wait=ms=>new Promise(r=>setTimeout(r,ms));
window.bubbleBreach=async function(kind='hand'){
 const epochNode=STATE.nodeId;
 const cue={hand:'别看上面。看这条消息。',eyes:'这一次，是消息在看你。',tear:'这句话的背面，还有一句。'};
 appendMessage('him',cue[kind],'horror',true);
 const msg=$('messages');msg.style.scrollBehavior='auto';msg.scrollTop=msg.scrollHeight;
 await wait(100);const bubble=[...msg.querySelectorAll('.other .message-bubble')].pop();if(!bubble)return;
 const rect=bubble.getBoundingClientRect(),cx=rect.left+rect.width*.55,cy=rect.top+rect.height*.55;
 const canvas=document.createElement('canvas');canvas.className='bubble-breach';canvas.setAttribute('aria-hidden','true');
 const w=innerWidth,h=innerHeight,d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;canvas.style.width=w+'px';canvas.style.height=h+'px';document.body.appendChild(canvas);
 const ctx=canvas.getContext('2d');ctx.scale(d,d);const begun=performance.now(),duration=kind==='hand'?3100:2400;
 bubble.classList.add('breach-origin');msg.classList.add('breach-neighbors');audioBurst(kind==='hand'?'crawl':kind==='eyes'?'invert':'slit');
 const dots=Array.from({length:22},()=>({x:Math.random(),y:Math.random(),s:3+Math.random()*8}));
 const cleanup=()=>{canvas.remove();bubble.classList.remove('breach-origin');msg.classList.remove('breach-neighbors')};
 await new Promise(resolve=>{function frame(now){
  if(!canvas.isConnected||STATE.nodeId!==epochNode){cleanup();resolve();return}
  const t=(now-begun)/duration;if(t>=1){cleanup();resolve();return}
  const reveal=Math.min(1,t/.48),fade=t>.85?(1-t)/.15:1;ctx.clearRect(0,0,w,h);ctx.globalAlpha=fade;
  const rip=ctx.createRadialGradient(cx,cy,2,cx,cy,52*reveal+5);rip.addColorStop(0,'#000');rip.addColorStop(.65,'#040007');rip.addColorStop(.85,'#962b40');rip.addColorStop(1,'#10000800');ctx.fillStyle=rip;ctx.beginPath();ctx.ellipse(cx,cy,62*reveal+3,25*reveal+2,-.14,0,Math.PI*2);ctx.fill();
  ctx.save();ctx.translate(cx,cy);ctx.strokeStyle='#dbb8b3';ctx.lineWidth=.8;for(let j=0;j<9;j++){const a=j*2.39;ctx.beginPath();ctx.moveTo(Math.cos(a)*24,Math.sin(a)*9);ctx.lineTo(Math.cos(a)*(34+reveal*28),Math.sin(a)*(14+reveal*19));ctx.lineTo(Math.cos(a+.12)*(49+reveal*32),Math.sin(a+.12)*(19+reveal*25));ctx.stroke()}ctx.restore();
  if(kind==='hand'){
   const reach=Math.pow(reveal,2.5);ctx.save();ctx.translate(cx,cy);ctx.rotate(-.17+Math.sin(t*7)*.035);ctx.scale(.22+reach*.88,.22+reach*.88);
   const skin=ctx.createLinearGradient(-35,0,50,-180);skin.addColorStop(0,'#17131b');skin.addColorStop(.45,'#79747c');skin.addColorStop(.7,'#d9ced0');skin.addColorStop(1,'#5e5662');ctx.fillStyle=skin;ctx.strokeStyle='#29232f';ctx.lineWidth=2;ctx.shadowColor='#000';ctx.shadowBlur=22;ctx.shadowOffsetX=14;ctx.shadowOffsetY=14;
   ctx.beginPath();ctx.moveTo(-15,9);ctx.bezierCurveTo(-21,-14,-39,-43,-32,-71);ctx.bezierCurveTo(-24,-97,24,-98,34,-67);ctx.bezierCurveTo(41,-43,22,-10,18,9);ctx.closePath();ctx.fill();ctx.stroke();
   // Five independent articulated fingers, curling toward the viewer.
   for(let i=0;i<5;i++){const startX=-26+i*13,startY=i===0?-47:-72;const len=[46,85,96,84,64][i];const curl=Math.max(0,(t-.48)/.38);const tipX=startX+(i-2)*10+Math.sin(t*10+i)*curl*12,tipY=startY-len*reveal+curl*len*.48;ctx.lineCap='round';ctx.lineWidth=i===0?15:12;ctx.strokeStyle=skin;ctx.beginPath();ctx.moveTo(startX,startY);ctx.bezierCurveTo(startX+(i-2)*12,startY-len*.6,tipX+(i-2)*4,tipY-12,tipX,tipY);ctx.stroke();ctx.shadowBlur=0;ctx.lineWidth=1.5;ctx.strokeStyle='#3b303c';ctx.beginPath();ctx.moveTo(tipX-4,tipY+9);ctx.lineTo(tipX+4,tipY+11);ctx.stroke()}
   ctx.restore();
  }else if(kind==='eyes'){
   dots.forEach((p,i)=>{const x=rect.left+p.x*rect.width,y=rect.top+p.y*rect.height;ctx.save();ctx.translate(x,y);ctx.scale(reveal,Math.max(.06,Math.abs(Math.sin(t*8+i)))*reveal);ctx.fillStyle='#d8c9b8';ctx.beginPath();ctx.ellipse(0,0,p.s*1.5,p.s*.62,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#28050e';ctx.beginPath();ctx.arc(Math.sin(t*3+i)*2,0,p.s*.55,0,Math.PI*2);ctx.fill();ctx.fillStyle='#000';ctx.fillRect(-1,-p.s*.4,2,p.s*.8);ctx.restore()});
  }else{ctx.fillStyle='#c4afb9';for(let i=0;i<12;i++){ctx.save();ctx.translate(cx+Math.cos(i*4)*t*120,cy+Math.sin(i*3)*t*160);ctx.rotate(t*5+i);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(12*reveal,3);ctx.lineTo(3,28*reveal);ctx.fill();ctx.restore()}}
  requestAnimationFrame(frame)
 }requestAnimationFrame(frame)});
};
const previous=runEffect;window.runEffect=async function(e){if(typeof e==='string')e={type:e};if(e.type==='screenHand'||e.type==='bubbleHand')return bubbleBreach('hand');if(e.type==='bubbleEyes')return bubbleBreach('eyes');if(e.type==='bubbleTear')return bubbleBreach('tear');return previous(e)};
if(STORY.d11_3b)STORY.d11_3b.effects=[{type:'bubbleTear'}];
if(STORY.d11_4b)STORY.d11_4b.effects=[{type:'bubbleEyes'}];
if(STORY.d12_4b)STORY.d12_4b.effects=[{type:'bubbleHand'}];
})();
