const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');function run(search='',hash='',saved=null){let nodes={},data={'wps-template-locale-v1':saved},lastUrl='';function node(){return{innerHTML:'',textContent:'',hidden:true,open:false,setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},focus(){},insertAdjacentHTML(pos,s){this.innerHTML+=s}}}let ctx={URL,URLSearchParams,console,location:{search,href:'file:///prototype.html'+search+hash,hash},history:{replaceState(a,b,u){lastUrl=String(u)}},document:{documentElement:{lang:''},activeElement:{focus(){}},getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]}},window:{scrollTo(){}},localStorage:{getItem(k){return data[k]||null},setItem(k,v){data[k]=v}},setTimeout(){return 1},clearTimeout(){}};vm.createContext(ctx);for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(script[1],ctx);return{ctx,eval:s=>vm.runInContext(s,ctx),url:()=>lastUrl,nodes}}


const app=run('?locale=zh-Hant-HK');
for(const id of ['zh-Hant-HK','en-US','th-TH','id-ID','ja-JP','de-DE']){
 app.eval('selectLocale('+JSON.stringify(id)+');selectResourceType18("templates");view="browse";render()');const h=app.nodes.main.innerHTML;
 if(h.includes('topic-nav')||h.includes('module-title')||h.includes('taxonomy-pills'))throw Error('legacy empty category block');
 const selects=[...h.matchAll(/<select[^>]*>[\s\S]*?<\/select>/g)].map(m=>m[0]);if(selects.filter(s=>s.includes('aria-label="'+app.eval('t(2)')+'"')).length!==1)throw Error('duplicate scenario');
 const pricing=selects.find(s=>s.includes('access-filter22'));if(!pricing||!app.eval('accessText24()').every(label=>pricing.includes('>'+label+'</option>'))||/>\s*<\/option>/.test(pricing))throw Error('empty translated option');
}
app.eval('selectAccess22("pro");catalogCategory24("office")');if(app.eval('accessFilter17')!=='pro'||!app.eval('filtered().every(d=>d.access==="pro"&&d.taxCategory==="office")'))throw Error('combined category filter');
app.eval('q="budget";resetCatalog24()');if(app.eval('q')!=='budget'||app.eval('kind')!=='templates')throw Error('reset discarded search/type');
app.eval('q="";filelang="English";selectResourceType18("font")');if(app.eval('filelang')!=='all'||app.eval('filtered().length')!==4)throw Error('hidden file language filter');
app.eval('chooseCatalog("templates","all","14")');if(!app.nodes.main.innerHTML.includes('value="scene:14" selected'))throw Error('hidden scene filter');
console.log('PASS: compact single filter toolbar, one scenario selector, intact Free/Pro+ options after localization, combination/reset behavior and no hidden language/scene filters.');
