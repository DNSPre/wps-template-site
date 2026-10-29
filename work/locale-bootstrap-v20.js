(function(){
 const ids=['en-US','en-PH','fil-PH','th-TH','en-MY','ms-MY','id-ID','en-PK','en-IN','hi-IN','en-SG','en-GB','en-AU','de-DE','es-ES','es-MX','fr-FR','pl-PL','pt-BR','ru-RU','it-IT','ja-JP','vi-VN','zh-Hant-TW','zh-Hant-HK','tr-TR','en-001','en-ID'];
 const slugs=Object.fromEntries(ids.map(id=>[id,id==='fil-PH'?'tl-ph':id.toLowerCase().replace('zh-hant-','zh-')]));
 const aliases=Object.fromEntries(ids.flatMap(id=>[[slugs[id],id],[id.toLowerCase(),id]]));
 const paths={home:'',browse:'resources/',locale:'locale/',plans:'pricing/',library:'library/',saved:'favorites/',collections:'collections/',scene:'scenes/',detail:'resources/'};
 const url=new URL(location.href),online=/^https?:$/.test(url.protocol);
 const base=url.pathname.startsWith('/wps-template-site/')?'/wps-template-site/':'/';
 const parts=url.pathname.slice(base.length).split('/').filter(Boolean),id=aliases[(parts[0]||'').toLowerCase()];
 const tail=parts.slice(1).join('/')+'/';
 const topicIds=['office','career','education','reporting','project','travel','planning','print'];
 const initialTopic=parts[1]==='collections'&&topicIds.includes(parts[2])?parts[2]:null;
 const initialTarget=(initialTopic?'collections':null)||url.hash.slice(1)||(id?Object.keys(paths).find(k=>k!=='detail'&&paths[k]===tail):null)||'home';
 window.WPS_ROUTE20={slugs,aliases,paths,base,online,initialTarget,initialTopic,initialLocale:id||aliases[(url.searchParams.get('locale')||'').toLowerCase()]};
 if(online){
  if(id)url.searchParams.set('locale',id);
  if(!url.hash&&id){const tail=parts.slice(1).join('/')+'/';url.hash=initialTopic?'collections':Object.keys(paths).find(k=>k!=='detail'&&paths[k]===tail)||'home';}
  // Bootstrap legacy application state; the final render writes the canonical path.
  history.replaceState(null,'',url);
 }
})();
