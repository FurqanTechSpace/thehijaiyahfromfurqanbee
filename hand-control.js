(function(root){'use strict';
// Pure gesture state: camera losses must never submit or score an answer.
function createDwell(pickMs=800,dropMs=700){let key=null,since=0,fired=false,pausedAt=null;return{reset(){key=null;since=0;fired=false;pausedAt=null},pause(time){if(pausedAt===null)pausedAt=time;},update(target,time,isDrop){if(target===null){this.reset();return{progress:0,fire:false};}if(pausedAt!==null){since+=time-pausedAt;pausedAt=null;}if(key!==target){key=target;since=time;fired=false;}const progress=Math.min(1,(time-since)/(isDrop?dropMs:pickMs));const fire=progress>=1&&!fired;if(fire)fired=true;return{progress,fire};}};}
function smooth(previous,point,alpha=.32){if(!previous)return point;return{x:previous.x+(point.x-previous.x)*alpha,y:previous.y+(point.y-previous.y)*alpha};}
const api={createDwell,smooth};if(typeof module!=='undefined')module.exports=api;else root.FurqanHands=api;
})(typeof window==='undefined'?globalThis:window);
