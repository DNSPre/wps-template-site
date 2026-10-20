const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');function run(search='',hash='',saved=null){let nodes={},data={'wps-template-locale-v1':saved},lastUrl='';function node(){return{innerHTML:'',textContent:'',hidden:true,open:false,setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},focus(){},insertAdjacentHTML(pos,s){this.innerHTML+=s}}}let ctx={URL,URLSearchParams,console,location:{search,href:'file:///prototype.html'+search+hash,hash},history:{replaceState(a,b,u){lastUrl=String(u)}},document:{documentElement:{lang:''},activeElement:{focus(){}},getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]}},window:{scrollTo(){}},localStorage:{getItem(k){return data[k]||null},setItem(k,v){data[k]=v}},setTimeout(){return 1},clearTimeout(){}};vm.createContext(ctx);for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(script[1],ctx);return{ctx,eval:s=>vm.runInContext(s,ctx),url:()=>lastUrl,nodes}}

let app=run('?locale=zh-Hant-HK');
for(const locale of ['zh-Hant-HK','en-US','th-TH','id-ID','ja-JP']){
 app.eval('selectLocale('+JSON.stringify(locale)+')');
 for(const type of ['all','templates','icon','font','chart','wordart','image']){
  app.eval('selectResourceType18('+JSON.stringify(type)+')');
  const h=app.eval('listing()');
  assert.equal((h.match(/class="resource-types18"/g)||[]).length,1);
  assert.equal((h.match(/onclick="selectResourceType18/g)||[]).length,7);
  assert(!h.includes('class="material-filters17"'));
  assert(!h.includes('class="tabs"'));
  assert(!h.includes('class="taxonomy-pills"'));
  assert(!h.includes('undefined'));
  assert.equal((h.match(/aria-pressed="true"/g)||[]).length,2);
  const types=app.eval('filtered().map(d=>d.type)');
  if(type==='templates')assert(types.every(t=>t==='templates'));
  if(!['templates','all'].includes(type))assert(app.eval('filtered().every(d=>d.assetKind==='+JSON.stringify(type)+')'));
  app.eval("accessFilter17='pro';render()");assert(app.eval("filtered().every(d=>d.access==='pro')"));
  app.eval("accessFilter17='all'");
 }
}
app.eval("chooseAssetKind17('font')");assert.equal(app.eval('filtered().length'),4);
app.eval("chooseCatalog('assets','SVG','all','office');listing()");assert(app.eval("filtered().every(d=>d.assetKind==='icon'&&d.assetGroup==='office')"));
console.log('PASS: single type navigation, seven types, independent access filter, header entry and topic compatibility across five locales.');
