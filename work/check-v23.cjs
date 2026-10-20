const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');function run(search='',hash='',saved=null){let nodes={},data={'wps-template-locale-v1':saved},lastUrl='';function node(){return{innerHTML:'',textContent:'',hidden:true,open:false,setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},focus(){},insertAdjacentHTML(pos,s){this.innerHTML+=s}}}let ctx={URL,URLSearchParams,console,location:{search,href:'file:///prototype.html'+search+hash,hash},history:{replaceState(a,b,u){lastUrl=String(u)}},document:{documentElement:{lang:''},activeElement:{focus(){}},getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]}},window:{scrollTo(){}},localStorage:{getItem(k){return data[k]||null},setItem(k,v){data[k]=v}},setTimeout(){return 1},clearTimeout(){}};vm.createContext(ctx);for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(script[1],ctx);return{ctx,eval:s=>vm.runInContext(s,ctx),url:()=>lastUrl,nodes}}


(async()=>{const app=run('?locale=en-US');await app.eval(`(async()=>{
await enterDemoAccount15();head();var h23=document.getElementById('header').innerHTML;
if(h23.includes('header-pro17')||!h23.includes('identity-panel23')||!h23.includes('startUpgrade21()')||h23.includes('renewMembership23()'))throw Error('free identity');
var destinations23=[];window.location={assign:url=>destinations23.push(url)};
await startUpgrade21();if(destinations23[0]!==WPS_BUY22)throw Error('upgrade destination');
demoPro17=true;head();h23=document.getElementById('header').innerHTML;if(h23.includes('header-pro17')||h23.includes('onclick="startUpgrade21()"')||!h23.includes('renewMembership23()'))throw Error('renewal identity');
await renewMembership23();if(destinations23.length!==2||destinations23[1]!==WPS_BUY22)throw Error('renew destination');
for(const locale of ['zh-Hant-HK','th-TH','id-ID','ja-JP']){selectLocale(locale);if(accountControls15().includes('undefined'))throw Error('identity localization');}
clearSession21();head();if(document.getElementById('header').innerHTML.includes('identity-panel23'))throw Error('guest identity');
})()`);console.log('PASS: no standalone header upsell; free identity upgrade, member renewal, correct official destinations, localization and sign-out.');})().catch(e=>{console.error(e);process.exitCode=1});
