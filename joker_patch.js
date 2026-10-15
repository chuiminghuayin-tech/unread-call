function openJoker(){
  const root=$('jokerGame');if(!root)return;
  root.classList.remove('hidden','joker-hit');$('jokerContinue').classList.add('hidden');
  $('jokerNotice').textContent='沈屿把五张牌推入烛光。红线在牌面之间打了一个结。';
  $('jokerLine').textContent='“只准抽一次。抽到谁，谁就要回答真话。”';
  const box=$('jokerCards');box.innerHTML='';
  let vals=['safe','safe','safe','safe','joker'];vals=vals.sort(()=>Math.random()-.5);
  vals.forEach((v,i)=>{const b=document.createElement('button');b.className='joker-card';b.style.setProperty('--r',((i-2)*4)+'deg');b.innerHTML='<span class="card-inner"><span class="card-back"></span><span class="card-face '+v+'"></span></span>';b.onclick=async()=>{
    if(box.dataset.locked)return;box.dataset.locked='1';b.classList.add('selected');audioBurst('camera');vibrate([35,80,35]);await sleep(380);b.classList.add('revealed');await sleep(720);
    if(v==='joker'){
      root.classList.add('joker-hit');$('jokerNotice').textContent='牌上的面具慢慢弯起嘴角。沈屿没有笑，屏幕里的影子却笑了。';$('jokerLine').textContent='“抽中了。现在告诉我——你会不会把我留下？”';audioBurst('joker');vibrate([80,40,120,40,360]);await sleep(850);await jokerReveal();
    }else{
      $('jokerNotice').textContent='不是鬼牌。沈屿看着它，像是在惋惜什么。';$('jokerLine').textContent='“安全牌……可惜。那我换一个问题：你今天有没有想我？”';playMessageSfx('normal');
    }
    $('jokerContinue').classList.remove('hidden')
  };box.appendChild(b)})
}
function jokerReveal(){return new Promise(async resolve=>{const x=document.createElement('div');x.className='joker-reveal';x.innerHTML='<img src="assets/joker_reveal.webp"><div><b>YOU DREW ME</b><strong>别想反悔</strong><span>“牌是你自己选的。你也是。”</span></div>';document.body.appendChild(x);await sleep(1850);x.classList.add('leave');await sleep(280);x.remove();resolve()})}
function closeJoker(){$('jokerGame').classList.add('hidden');$('jokerGame').classList.remove('joker-hit');$('jokerCards').removeAttribute('data-locked');$('jokerContinue').classList.add('hidden');if(STATE.nodeId==='d6_4'){isBusy=false;renderChoices(STORY.d6_4)}}
