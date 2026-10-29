const fs=require('fs'),path=require('path');
// Reuse the deployment's browser-free render harness against the actual bundled app.
const harness=fs.readFileSync('work/check-v28.cjs','utf8').split('\n\n')[0];
const run=new Function('require',harness+';return run;')(require);
const {slugs}=JSON.parse(fs.readFileSync('work/routes-v20.json','utf8'));
const ids=['office','career','education','reporting','project','travel','planning','print'];
const urls=[];
const encode=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const [locale,slug] of Object.entries(slugs)){
 const app=run('','',locale,'/'+slug+'/collections/');
 for(const id of ids){
  app.eval('openTopic29('+JSON.stringify(id)+')');
  const title=app.eval('taxLabel(templateTaxonomy.find(c=>c.id==='+JSON.stringify(id)+'))+" · "+tl29(0)+" | WPS Template"');
  const description=app.eval('taxLabel(templateTaxonomy.find(c=>c.id==='+JSON.stringify(id)+'))+" — "+tl29(1)');
  const canonical='https://wps.design.cab/'+slug+'/collections/'+id+'/';
  let html=fs.readFileSync(slug+'/collections/index.html','utf8').replaceAll('../../site-runtime/','../../../site-runtime/');
  html=html.replace(/<title>[\s\S]*?<\/title>/,'<title>'+encode(title)+'</title>')
   .replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+app.nodes.main.innerHTML+'</main>')
   .replace('</head>',`<meta name="description" content="${encode(description)}"><link rel="canonical" href="${canonical}">${Object.values(slugs).map(other=>`<link rel="alternate" hreflang="${Object.keys(slugs).find(k=>slugs[k]===other).replace('zh-Hant-','zh-Hant-')}" href="https://wps.design.cab/${other}/collections/${id}/">`).join('')}</head>`);
  const dir=path.join(slug,'collections',id);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);urls.push(canonical);
 }
}
fs.writeFileSync('sitemap-topics.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(url=>'<url><loc>'+url+'</loc></url>').join('')+'</urlset>\n');
console.log('Prerendered '+urls.length+' localized topic landing pages and topic sitemap.');
fs.writeFileSync('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://wps.design.cab/sitemap-topics.xml</loc></sitemap></sitemapindex>\n');
fs.writeFileSync('robots.txt','User-agent: *\nAllow: /\nSitemap: https://wps.design.cab/sitemap.xml\n');
