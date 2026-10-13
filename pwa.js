(function(){'use strict';const button=document.getElementById('installApp'),status=document.getElementById('offlineStatus'),help=document.getElementById('installHelp');let installPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;button.textContent='Pasang aplikasi';});
button.onclick=async()=>{if(installPrompt){const p=installPrompt;installPrompt=null;await p.prompt();await p.userChoice;}else if(help.showModal)help.showModal();else help.setAttribute('open','');};document.getElementById('closeInstall').onclick=()=>help.close();
window.addEventListener('appinstalled',()=>{button.hidden=true;});if(window.matchMedia?.('(display-mode: standalone)').matches)button.hidden=true;
if(location.protocol==='file:'){status.hidden=true;return;}
if(!('serviceWorker' in navigator)||!window.isSecureContext){status.hidden=true;return;}
navigator.serviceWorker.register('./sw.js').then(async registration=>{status.textContent='';await navigator.serviceWorker.ready;status.textContent='';const showUpdate=()=>{if(registration.waiting){const update=document.createElement('button');update.className='btn install-button';update.textContent='Muat versi baharu';update.onclick=()=>{registration.waiting.postMessage({type:'ACTIVATE'});navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload(),{once:true});};status.append(' ',update);}};showUpdate();registration.addEventListener('updatefound',()=>{registration.installing?.addEventListener('statechange',showUpdate);});}).catch(()=>{status.textContent='';});
})();
