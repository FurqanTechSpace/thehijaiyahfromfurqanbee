(function(root){'use strict';
const KEY='furqanbee-honey-v1';
function createLedger(storage){let count=0;try{const saved=JSON.parse(storage?.getItem(KEY)||'null');if(saved&&Number.isSafeInteger(saved.honey)&&saved.honey>=0)count=saved.honey;}catch{}const awarded=new Set();return{get count(){return count},award(id){if(typeof id!=='string'||!id||awarded.has(id))return false;awarded.add(id);count++;try{storage?.setItem(KEY,JSON.stringify({honey:count}));}catch{}return true;}};}
const api={createLedger};if(typeof module!=='undefined')module.exports=api;else root.FurqanRewards=api;
})(typeof window==='undefined'?globalThis:window);
