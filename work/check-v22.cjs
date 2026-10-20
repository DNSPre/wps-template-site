const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');function run(search='',hash='',saved=null){let nodes={},data={'wps-template-locale-v1':saved},lastUrl='';function node(){return{innerHTML:'',textContent:'',hidden:true,open:false,setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},focus(){},insertAdjacentHTML(pos,s){this.innerHTML+=s}}}let ctx={URL,URLSearchParams,console,location:{search,href:'file:///prototype.html'+search+hash,hash},history:{replaceState(a,b,u){lastUrl=String(u)}},document:{documentElement:{lang:''},activeElement:{focus(){}},getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]}},window:{scrollTo(){}},localStorage:{getItem(k){return data[k]||null},setItem(k,v){data[k]=v}},setTimeout(){return 1},clearTimeout(){}};vm.createContext(ctx);for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(script[1],ctx);return{ctx,eval:s=>vm.runInContext(s,ctx),url:()=>lastUrl,nodes}}


(async()=>{
const app=run('?locale=en-US');await app.eval(`(async()=>{
if(records.filter(d=>d.mockPaid22).length!==66||records.filter(d=>d.access==='pro').length!==90)throw Error('mock batch');
if(records.filter(d=>d.code||d.fontKey).some(d=>d.access!=='free'))throw Error('open source reclassified');
selectResourceType18('templates');selectAccess22('pro');if(filtered().length!==records.filter(d=>d.type==='templates'&&d.access==='pro'&&eligible(d)).length||filtered().some(d=>d.access!=='pro'))throw Error('paid templates');
selectResourceType18('chart');if(accessFilter17!=='pro'||filtered().length!==18)throw Error('combined type filter');
selectAccess22('free');if(filtered().length!==6)throw Error('free chart');
if((listing().match(/class="access-filter22"/g)||[]).length!==1)throw Error('duplicated price filter');
if(!card(records.find(d=>d.id===200)).includes('Pro+'))throw Error('card badge');
for(const id of [200,210,220,6101,6201,6301]){selected=id;const h=detail();if(h.includes('undefined')||!h.includes('Pro+'))throw Error('mock detail');}
 var redirects22=[];window.location={assign:url=>redirects22.push(url)};
await startUpgrade21();if(redirects22.length||!authDialogOpen21)throw Error('upgrade before login');
await enterDemoAccount15();if(redirects22[0]!=='https://www.wps.com/buy/?source=tempmall_web')throw Error('official buy URL');
redirects22=[];demoPro17=true;await startCheckout17();if(redirects22.length)throw Error('member upsell');
clearSession21();await requestResource17(200);if(!authDialogOpen21)throw Error('mock paid login gate');
})()`);console.log('PASS: 66 mock paid entries, 90 Pro+ total, Free/Pro+ filtering, official upgrade URL, login/member gating and open-source licenses preserved.');
})().catch(e=>{console.error(e);process.exitCode=1});
