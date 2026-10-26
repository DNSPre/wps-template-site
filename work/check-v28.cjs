const fs=require('fs'),vm=require('vm'),assert=require('assert');const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');function run(search='',hash='',saved=null,path='/'){let nodes={},data={'wps-template-locale-v1':saved},lastUrl='';function node(){return{innerHTML:'',textContent:'',hidden:true,open:false,setAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false},focus(){},insertAdjacentHTML(pos,s){this.innerHTML+=s}}}let ctx={URL,URLSearchParams,console,location:{search,href:'https://wps.design.cab'+path+search+hash,hash,pathname:path},history:{replaceState(a,b,u){lastUrl=String(u)}},document:{documentElement:{lang:''},activeElement:{focus(){}},getElementById(id){return nodes[id]??=node()},querySelectorAll(){return[]}},window:{scrollTo(){}},localStorage:{getItem(k){return data[k]||null},setItem(k,v){data[k]=v}},setTimeout(){return 1},clearTimeout(){}};ctx.history.replaceState=(a,b,u)=>{const parsed=new URL(u,ctx.location.href);lastUrl=parsed.href;ctx.location.href=parsed.href;ctx.location.pathname=parsed.pathname;ctx.location.search=parsed.search;ctx.location.hash=parsed.hash};ctx.document.currentScript={src:'https://wps.design.cab/site-runtime/app.000000000000.js'};vm.createContext(ctx);vm.runInContext(fs.readFileSync('site-runtime/'+JSON.parse(fs.readFileSync('work/routes-v20.json')).runtime.js,'utf8'),ctx);return{ctx,eval:s=>vm.runInContext(s,ctx),url:()=>lastUrl,nodes}}


const app=run('?type=templates&category=career&task=resume','','en-US','/en-us/resources/');
if(app.eval('taxonomyLeaf')!=='resume')throw Error('topic link did not restore leaf');
let h=app.nodes.main.innerHTML;if(!h.includes('About Resumes')||!h.includes('A professional resume brings'))throw Error('missing topic-specific editorial content');
if(!h.includes('href="/en-us/resources/?type=templates&amp;category=career&amp;task=coverletter"'))throw Error('missing crawlable related topic link');
app.eval('selected=2;view="detail";render()');h=app.nodes.main.innerHTML;
if(h.indexOf('data-seo-context="resource"')<0||h.indexOf('data-seo-context="resource"')>h.indexOf('dense-section'))throw Error('resource copy is not before related resources');
if(!h.includes('This template is a concept preview')||!h.includes('Frequently asked questions'))throw Error('missing honest file/FAQ copy');
for(const id of ['zh-Hant-HK','th-TH','id-ID','ja-JP','de-DE','es-MX','fr-FR','pt-BR','it-IT','pl-PL','ru-RU','tr-TR','vi-VN','hi-IN','fil-PH','ms-MY']){
 app.eval('selectLocale('+JSON.stringify(id)+');selected=2;view="detail";render()');h=app.nodes.main.innerHTML;
 if(!h.includes('data-seo-context="resource"')||h.includes('Frequently asked questions'))throw Error('editorial UI missing or English fallback: '+id);
}
for(const id of [1,2,5000,6001,6101,6201,6301]){
 if(!app.eval('records.some(d=>d.id==='+id+')'))continue;
 app.eval('selected='+id+';view="detail";render()');if(!app.nodes.main.innerHTML.includes('seo-about28'))throw Error('missing type editorial '+id);
}
console.log('PASS: SEO detail/category modules, specific topic content, localized FAQs, direct query restore and crawlable topic anchors.');
