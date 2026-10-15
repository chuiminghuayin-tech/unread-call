/* Premium pass: dawn redemption, tactile screen events, and replay records. */
(function(){
  const add=(id,n)=>{STORY[id]=n};
  add('dawn_0',{day:12,time:'05:28',phase:'dark',avatar:'dark',effects:[{type:'unblood'},{type:'dawnImage'}],messages:[
    {from:'sys',text:'天亮得很慢。<br>像一块冻住的玻璃，终于在掌心里有了温度。',pause:1500},
    {from:'him',text:'你说留下。',delay:1700},
    {from:'him',text:'可是我不太敢相信。',delay:1500},
    {from:'him',text:'你们都会在最像承诺的时候离开。',delay:1250},
    {from:'him',text:'所以我想问一次。只问一次。',delay:1450},
    {from:'him',text:'你现在还在吗。',delay:1800}
  ],choices:[{text:'「在。但我需要你也允许我自由。」',next:'dawn_1',setFlags:{dawnBoundary:true}},{text:'「我在这里。你不用马上相信我。」',next:'dawn_1',setFlags:{dawnBoundary:true}}]});
  add('dawn_1',{day:12,time:'05:36',phase:'dark',avatar:'dark',messages:[
    {from:'him',text:'……自由。',delay:1700},
    {from:'him',text:'听起来像门打开以后，里面的人也可以不回来。',delay:1650},
    {from:'him',text:'我害怕。',delay:1900},
    {from:'him',text:'但我不想用害怕来命令你。',delay:1450},
    {from:'him',text:'你能不能明天也这样告诉我一次。',delay:1300},
    {from:'him',text:'不是保证永远。只保证明天。',delay:1600}
  ],choices:[{text:'「明天我会告诉你。现在，先睡一会儿。」',next:'dawn_2'},{text:'「我不许诺永远，但我会诚实。」',next:'dawn_2'}]});
  add('dawn_2',{day:12,time:'06:12',phase:'warm',avatar:'warm',effects:[{type:'dawnImage'}],messages:[
    {from:'sys',text:'雨停了。<br>结在玻璃上的红色像被晨光稀释，慢慢退成一条旧伤。',pause:1600},
    {from:'him',text:'我刚才忍住了。',delay:1150},
    {from:'him',text:'你四分钟没回，我没有发第五条。',delay:1250},
    {from:'him',text:'我去看窗外了。真的。',delay:1400},
    {from:'him',text:'外面有一只鸟，叫得很难听。',delay:1150},
    {from:'him',text:'但它在叫。',delay:1000},
    {from:'him',text:'我也还在。',delay:1450}
  ],choices:[{text:'「那就一起活到天亮。」',next:'dawn_3'},{text:'「做得很好，沈屿。」',next:'dawn_3'}]});
  add('dawn_3',{day:12,time:'07:01',phase:'warm',avatar:'warm',messages:[
    {from:'him',text:'一个月以后，我可能还会犯错。',delay:1450},
    {from:'him',text:'可能还是会想知道你去了哪里。',delay:1200},
    {from:'him',text:'但我会先问：你愿意告诉我吗。',delay:1400},
    {from:'him',text:'如果你不愿意，我会难过。',delay:1100},
    {from:'him',text:'可是难过不是你的锁。',delay:1350},
    {from:'him',text:'……我在学。慢一点也没关系，对不对。',delay:1600}
  ],choices:[{text:'「慢一点，才是真的改变。」',next:'d12_8'}]});
  // Mark the new visual memory without making the gallery fragile on old saves.
  CG_DEFS.push({id:'cg_dawn_heal',title:'雨过天晴',chapter:'救赎',desc:'他第一次没有追上来。晨光替他把门打开。'});CG.cg_dawn_heal='assets/dawn_heal.webp';
  const oldRun=window.runEffect;
  window.runEffect=async function(e){
    if(typeof e==='string')e={type:e};
    if(e.type==='dawnImage'){STATE.cgs.cg_dawn_heal=true;const all=JSON.parse(localStorage.getItem('youremai_cgs')||'{}');all.cg_dawn_heal=true;localStorage.setItem('youremai_cgs',JSON.stringify(all));return imageMoment('assets/dawn_heal.webp','dawn-image',1600);}
    if(e.type==='eyeWall') return imageMoment('assets/eye_wall.webp','eye-wall',1250);
    if(e.type==='screenHand') return imageMoment('assets/screen_hand.webp','screen-hand',1350);
    if(e.type==='bloodCrack') return imageMoment('assets/blood_crack.webp','blood-crack',1450);
    return oldRun(e);
  };
  window.imageMoment=function(src,cls,ms){return new Promise(resolve=>{const x=document.createElement('div');x.className='premium-image '+cls;const im=document.createElement('img');im.src=src;x.appendChild(im);document.body.appendChild(x);if(cls!=='dawn-image'){try{audioBurst(cls==='screen-hand'?'lunge':'shatter')}catch(e){};vibrate([90,35,180,40,260])}setTimeout(()=>{x.classList.add('leave');setTimeout(()=>{x.remove();resolve()},180)},ms)})};
  if(STORY.d12_3)STORY.d12_3.effects=(STORY.d12_3.effects||[]).concat([{type:'bloodCrack'}]);
  if(STORY.d12_4b)STORY.d12_4b.effects=(STORY.d12_4b.effects||[]).concat([{type:'screenHand'}]);
  if(STORY.d11_4b)STORY.d11_4b.effects=(STORY.d11_4b.effects||[]).concat([{type:'eyeWall'}]);
})();
