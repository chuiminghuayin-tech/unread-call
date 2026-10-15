/* Each PNG keeps its narrative phase, including after a save is restored. */
(function(){
const art={warm:'assets/bear_warm.webp',dark:'assets/bear_dark.webp',horror:'assets/bear_horror.webp'};
let count=0;
function restore(){document.querySelectorAll('.bear-seal').forEach(x=>{x.src=art[x.dataset.phase]||art.warm})}
const append=appendMessage;
window.appendMessage=function(from,text,type,quiet){append(from,text,type,quiet);if(from!=='him'||quiet)return;count++;if(count%5!==2)return;const row=$('messages').lastElementChild;if(!row||!row.classList.contains('other'))return;const b=row.querySelector('.message-bubble');if(!b)return;row.classList.add('bear-adorned');const x=document.createElement('img');x.className='bear-seal';x.dataset.phase=STATE.phase||'warm';x.src=art[x.dataset.phase];x.alt='';x.setAttribute('aria-hidden','true');b.appendChild(x)};
window.compactMessages=function(){const box=$('messages').cloneNode(true);box.querySelectorAll('.msg-avatar').forEach(x=>{x.removeAttribute('src');x.setAttribute('data-avatar','1')});box.querySelectorAll('.bear-seal').forEach(x=>x.removeAttribute('src'));return box.innerHTML};
const oldRestore=restoreMessageAvatars;window.restoreMessageAvatars=function(){oldRestore();restore()};
})();
