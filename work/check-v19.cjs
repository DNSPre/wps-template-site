const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');function run(search='',hash='',saved=null){let nodes={},data={'wps-template-locale-v1':saved},lastUrl='';function node(){return{innerHTML:'',textContent:'',hidden:true,open:false,setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},focus(){},insertAdjacentHTML(pos,s){this.innerHTML+=s}}}let ctx={URL,URLSearchParams,console,location:{search,href:'file:///prototype.html'+search+hash,hash},history:{replaceState(a,b,u){lastUrl=String(u)}},document:{documentElement:{lang:''},activeElement:{focus(){}},getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]}},window:{scrollTo(){}},localStorage:{getItem(k){return data[k]||null},setItem(k,v){data[k]=v}},setTimeout(){return 1},clearTimeout(){}};vm.createContext(ctx);for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(script[1],ctx);return{ctx,eval:s=>vm.runInContext(s,ctx),url:()=>lastUrl,nodes}}

let app=run('?locale=zh-Hant-TW');
for(const locale of ['zh-Hant-TW','zh-Hant-HK','en-US','th-TH','id-ID','ja-JP']){
 app.eval('selectLocale('+JSON.stringify(locale)+')');
 for(const scene of ['all','14','15','16','17']){
  app.eval('homeFormat="PPTX";chooseHomeScene19('+JSON.stringify(scene)+')');
  const h=app.eval('home()');assert(h.includes('class="home-scenes19"'));assert(!h.includes('recommend-controls'));assert(!h.includes('homeFormat='));assert(!h.includes('homeTask=this.value'));
  assert.equal((h.match(/onclick="chooseHomeScene19/g)||[]).length,5);
  assert.equal(app.eval('homeFormat'),'all');
  if(scene!=='all')assert(app.eval('getHomeRecommendations(homeFormat,homeTask).every(d=>d.scenarios.includes('+Number(scene)+'))'));
  app.eval('browseHomeScene19()');assert.equal(app.eval('kind'),'templates');assert.equal(app.eval('fmt'),'all');assert.equal(app.eval('taskFilter'),scene==='all'?null:Number(scene));assert.equal(app.eval('assetKind17'),'all');
 }
}
console.log('PASS: one home scene control, no hidden format restriction, scene results and browse handoff in six locales.');
