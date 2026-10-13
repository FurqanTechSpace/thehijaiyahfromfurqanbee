(function(){'use strict';
const dialog=document.getElementById('celebration'),video=document.getElementById('celebrationVideo');
function close(){video.pause();if(dialog.open)dialog.close();}
document.getElementById('celebrationClose').onclick=close;
dialog.addEventListener('close',()=>video.pause());
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
window.FurqanCelebrate={close,show(name){const buddy=name==='Yuyu'?'yuyu':'kiko';video.pause();video.src='media/'+buddy+'-right.webm';video.poster='media/'+buddy+'-right.png';video.setAttribute('aria-label',name+' meraikan kemenangan');if(!dialog.open)dialog.showModal();if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)video.play().catch(()=>{});}};
})();
