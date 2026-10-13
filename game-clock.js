(function(root){'use strict';
function create({seconds,onTick,onExpire}){let left=seconds,started=false,paused=false,hidden=document.hidden,finished=false,last=performance.now();
function emit(){onTick(Math.max(0,Math.ceil(left)));}
function update(){const now=performance.now();if(started&&!paused&&!hidden&&!finished){left=Math.max(0,left-(now-last)/1000);if(left<.001)left=0;emit();if(left===0){finished=true;clearInterval(interval);document.removeEventListener('visibilitychange',visibility);onExpire();}}last=now;}
function visibility(){update();hidden=document.hidden;last=performance.now();}
const interval=setInterval(update,100);document.addEventListener('visibilitychange',visibility);emit();
return{get running(){return started&&!paused&&!hidden&&!finished},get started(){return started},get paused(){return paused},get remaining(){return left},start(){if(finished||started)return;started=true;last=performance.now();emit();},pause(){if(!started||finished)return;update();paused=true;},resume(){if(finished)return;paused=false;last=performance.now();},dispose(){finished=true;clearInterval(interval);document.removeEventListener('visibilitychange',visibility);}};
}
root.FurqanClock={create};
})(typeof window==='undefined'?globalThis:window);

