const fs=require('fs'),path=require('path'),crypto=require('crypto'),vm=require('vm');
const html=fs.readFileSync('outputs/WPS-Template交互原型.html','utf8');
const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n;\n');
const css=[...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
new vm.Script(js);
const digest=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,12);
const jsName='app.'+digest(js)+'.js',cssName='style.'+digest(css)+'.css';
fs.mkdirSync('site-runtime',{recursive:true});
for(const name of fs.readdirSync('site-runtime'))if(/^(app|style)\.[a-f0-9]{12}\.(js|css)$/.test(name))fs.unlinkSync(path.join('site-runtime',name));
fs.writeFileSync('site-runtime/'+jsName,js);fs.writeFileSync('site-runtime/'+cssName,css);
const ctx={window:{},URL,location:{href:'file:///prototype.html'},history:{}};vm.runInNewContext(fs.readFileSync('work/locale-bootstrap-v20.js','utf8'),ctx);
const {slugs,aliases,paths}=ctx.window.WPS_ROUTE20;
function shell(depth,id){const prefix='../'.repeat(depth)+'site-runtime/';return html.replace(/<script>[\s\S]*?<\/script>/g,'').replace(/<style>[\s\S]*?<\/style>/g,'').replace('</head>',`<link rel="stylesheet" href="${prefix+cssName}"></head>`).replace('</body>',`<script src="${prefix+jsName}"></script></body>`).replace(/<html[^>]*>/,`<html lang="${id||'en-US'}">`)}
fs.writeFileSync('index.html',shell(0));fs.writeFileSync('.nojekyll','');
const generated=[];
for(const [id,slug] of Object.entries(slugs))for(const suffix of new Set(Object.values(paths))){const dir=path.join(slug,suffix);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),shell(suffix?2:1,id));generated.push('/'+dir.replace(/\\/g,'/')+'/')}
for(const [alias,id] of Object.entries(aliases))if(alias!==slugs[id]){const dir=alias;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),shell(1,id))}
fs.writeFileSync('404.html',shell(0).replaceAll('href="site-runtime/','href="/site-runtime/').replaceAll('src="site-runtime/','src="/site-runtime/')); 
fs.writeFileSync('work/routes-v20.json',JSON.stringify({slugs,paths,generated,runtime:{js:jsName,css:cssName}},null,2)+'\n');
console.log(`Built ${generated.length} static locale routes with shared runtime and offline HTML preserved.`);
