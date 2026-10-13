(function(){'use strict';
const toggle=document.getElementById('musicToggle'),status=document.getElementById('musicStatus'),volume=document.getElementById('musicVolume');
const songs={cheerful:{beat:.34,notes:[72,76,79,76,74,77,81,77,76,79,84,79,77,74,71,74]},calm:{beat:.6,notes:[60,67,72,67,64,67,71,67,62,69,74,69,65,69,72,69]},magic:{beat:.43,notes:[72,75,79,82,79,75,74,77,81,84,81,77,72,79,75,67]}};
let context,master,enabled=false,track='cheerful',timer=null,next=0,step=0,generation=0;const voices=new Set();

function save(){}
function display(){toggle.setAttribute('aria-pressed',String(enabled));toggle.setAttribute('aria-label',enabled?'Matikan semua bunyi':'Hidupkan muzik dan bunyi');toggle.querySelector('span').textContent=enabled?'Bunyi on':'Bunyi off';document.querySelectorAll('[data-track]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track===track)));}
function tone(note,time,length,level=.14,wave='sine'){const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type=wave;oscillator.frequency.value=440*Math.pow(2,(note-69)/12);gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(level,time+.02);gain.gain.exponentialRampToValueAtTime(.0001,time+length);oscillator.connect(gain);gain.connect(master);voices.add(oscillator);oscillator.onended=()=>{voices.delete(oscillator);oscillator.disconnect();gain.disconnect();};oscillator.start(time);oscillator.stop(time+length+.03);}
function silence(){clearInterval(timer);timer=null;for(const voice of voices){try{voice.stop();}catch{}}voices.clear();}
function schedule(){if(!enabled||document.hidden||context.state!=='running')return;const song=songs[track];if(next<context.currentTime-.2)next=context.currentTime+.03;while(next<context.currentTime+.2){tone(song.notes[step%song.notes.length],next,song.beat*1.9);if(step%4===0)tone(song.notes[step%song.notes.length]-24,next,song.beat*3,.09);if(step%2===1)tone(91,next,.07,.025,'triangle');if(step%8===0)tone(song.notes[step%song.notes.length]+12,next+song.beat*.5,.22,.045);step++;next+=song.beat;}}
function loop(){silence();next=context.currentTime+.04;step=0;schedule();timer=setInterval(schedule,90);}
toggle.onclick=async()=>{const token=++generation;if(enabled){enabled=false;silence();context?.suspend();display();status.textContent='Muzik dimatikan.';return;}try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error();if(!context){context=new Audio();master=context.createGain();master.connect(context.destination);}master.gain.value=Number(volume.value)/100*.45;await context.resume();if(token!==generation)return;enabled=true;loop();display();status.textContent='Muzik sedia menemani kamu.';}catch{enabled=false;display();status.textContent='Muzik belum dapat dimainkan. Cuba tekan sekali lagi.';}};
document.querySelectorAll('[data-track]').forEach(b=>b.onclick=()=>{track=b.dataset.track;save();display();if(enabled&&!document.hidden)loop();});
volume.oninput=()=>{if(master)master.gain.setTargetAtTime(Number(volume.value)/100*.45,context.currentTime,.06);save();};
document.addEventListener('visibilitychange',async()=>{if(!context||!enabled)return;if(document.hidden){silence();await context.suspend();}else{try{await context.resume();if(enabled&&!document.hidden)loop();}catch{enabled=false;display();}}});
window.addEventListener('pagehide',()=>{enabled=false;generation++;silence();context?.suspend();display();});
window.FurqanMusic={effect(kind){if(!enabled||document.hidden||context?.state!=='running')return;const patterns={right:[76,79,84,88],collect:[79,86],flip:[83],paint:[88,91],miss:[72,74],wrong:[72,74],ending:[79,76,72],tap:[91]};const notes=patterns[kind]||patterns.tap;notes.forEach((note,i)=>tone(note,context.currentTime+i*.09,kind==='tap'?.09:.25,kind==='tap'?.04:.13,'triangle'));}};
display();
})();

