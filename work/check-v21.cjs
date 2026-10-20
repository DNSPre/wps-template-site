const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');function run(search='',hash='',saved=null){let nodes={},data={'wps-template-locale-v1':saved},lastUrl='';function node(){return{innerHTML:'',textContent:'',hidden:true,open:false,setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},focus(){},insertAdjacentHTML(pos,s){this.innerHTML+=s}}}let ctx={URL,URLSearchParams,console,location:{search,href:'file:///prototype.html'+search+hash,hash},history:{replaceState(a,b,u){lastUrl=String(u)}},document:{documentElement:{lang:''},activeElement:{focus(){}},getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]}},window:{scrollTo(){}},localStorage:{getItem(k){return data[k]||null},setItem(k,v){data[k]=v}},setTimeout(){return 1},clearTimeout(){}};vm.createContext(ctx);for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(script[1],ctx);return{ctx,eval:s=>vm.runInContext(s,ctx),url:()=>lastUrl,nodes}}

(async()=>{
 const app=run('?locale=en-US');
 await app.eval(`(async()=>{
 head();let h=document.getElementById('header').innerHTML;
 if(h.includes('header-pro17')||h.includes('class="account-menu"')||h.includes("go('saved')"))throw Error('guest header leak');
 if(!h.includes('>'+ac15(0)+'</button>')||h.includes(ac15(0)+' / '+ac15(1)))throw Error('guest login label');
 if((h.match(/class="account-signin"/g)||[]).length!==1)throw Error('duplicate login');
 if(card(records[0]).includes('toggleSave('))throw Error('guest favorite');
 selected=5102;if(detail().includes('toggleSave('))throw Error('guest detail favorite');
 var transfers21=[];performDownload17=async(d,format)=>transfers21.push({id:d.id,format});
 accountDialog15();await Promise.resolve();await Promise.resolve();if(!signedIn21()||!document.getElementById('header').innerHTML.includes('account-menu'))throw Error('one click mock login');
 clearSession21();
 await requestResource17(5102);if(transfers21.length||!authDialogOpen21)throw Error('guest payment bypass');
 await enterDemoAccount15();if(!signedIn21()||!document.getElementById('modalbody').innerHTML.includes(ax17(8)))throw Error('login resume paywall');
 head();if(document.getElementById('header').innerHTML.includes('header-pro17')||!document.getElementById('header').innerHTML.includes('identity-offer23')||!card(records[0]).includes('toggleSave('))throw Error('free account header');
 if(!document.getElementById('header').innerHTML.includes('account-trigger-label21')||!document.getElementById('header').innerHTML.includes('signOutWps15()'))throw Error('account center/logout missing');
 toggleSave(5101);if(!saveSet.has(5101))throw Error('signed in save');addHistory15(records.find(d=>d.id===5101),'asset-download','initiated');if(history15.length!==1||!accountControls15().includes("libraryTab15='downloads'"))throw Error('download history missing');
 previewUpgrade17();await requestResource17(5102,'download','PNG');if(transfers21.length!==1||transfers21[0].format!=='PNG')throw Error('pro download');
 head();if(document.getElementById('header').innerHTML.includes('header-pro17')||planPage17().includes('startCheckout17()'))throw Error('member upsell');
 clearSession21();if(signedIn21()||saveSet.size||proAccess17())throw Error('logout state leak');
 var checkoutCount21=0,memberCalls21=0;
 window.WPS_TEMPLATE_ADAPTER={getSession:async()=>({signedIn:true,accountId:'A',displayName:'Alice'}),getEntitlements:async()=>{memberCalls21++;return {verified:true,pro:true}},createCheckout:async()=>{checkoutCount21++},signOut:async()=>{}};
 await refreshSession15();accountDialog15();if(!authDialogOpen21||document.getElementById('modalbody').innerHTML.includes('enterDemoAccount15()'))throw Error('real auth replaced by demo');closeModal();if(membership21()!=='pro'||!memberCalls21)throw Error('session membership check');
 await startCheckout17();if(checkoutCount21)throw Error('duplicate charge');
 toggleSave(5102);window.WPS_TEMPLATE_ADAPTER.getSession=async()=>({signedIn:true,accountId:'B',displayName:'Bob'});window.WPS_TEMPLATE_ADAPTER.getEntitlements=async()=>({verified:true,pro:false});await refreshSession15();if(saveSet.size||membership21()!=='free')throw Error('account isolation');
 window.WPS_TEMPLATE_ADAPTER.getEntitlements=async()=>{throw Error('offline')};await checkMembership21();head();if(membership21()!=='error'||document.getElementById('header').innerHTML.includes('header-pro17'))throw Error('unknown upsell');
 await requestResource17(5102);if(transfers21.length!==1||document.getElementById('modalbody').innerHTML.includes('startCheckout17()'))throw Error('error paywall bypass');
 var resolveMember21;window.WPS_TEMPLATE_ADAPTER.getEntitlements=()=>new Promise(resolve=>{resolveMember21=resolve});var inFlight21=checkMembership21();await Promise.resolve();clearSession21();resolveMember21({verified:true,pro:true});await inFlight21;if(proAccess17()||signedIn21())throw Error('stale entitlement after logout');
 })()`);
 console.log('PASS: guest single login/no favorites, login before paywall, free/Pro/unknown states, member no-charge, account isolation and stale-response logout protection.');
})().catch(e=>{console.error(e);process.exitCode=1});
