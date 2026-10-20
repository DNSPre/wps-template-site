const routes20=window.WPS_ROUTE20;
function localeHref20(id=currentLocale.id,target=view,resource=selected){
 if(!routes20?.online)return `?locale=${id}#${target==='detail'?'resource-'+resource:target}`;
 const slug=routes20.slugs[id]||'en-us';
 return routes20.base+slug+'/'+(routes20.paths[target]||'')+(target==='detail'?'#resource-'+resource:'');
}
function rewriteLocaleLinks20(html){return html.replace(/href="\?locale=([^"#]+)#([^"]*)"/g,(_,id,target)=>{const detail=/^resource-(\d+)$/.exec(target);return `href="${localeHref20(decodeURIComponent(id),detail?'detail':target,detail?Number(detail[1]):selected)}"`})}
const localeResultsBefore20=localeResults;localeResults=function(){return rewriteLocaleLinks20(localeResultsBefore20())};
const quickLinkBefore20=quickLocaleLink14;quickLocaleLink14=function(id){return rewriteLocaleLinks20(quickLinkBefore20(id))};
const quickPanelBefore20=quickLocalePanel14;quickLocalePanel14=function(){return rewriteLocaleLinks20(quickPanelBefore20())};
const footerBefore20=footer;footer=function(){footerBefore20();$('footer').innerHTML=rewriteLocaleLinks20($('footer').innerHTML)};
function syncLocalePath20(){
 if(!routes20?.online)return;
 const url=new URL(localeHref20(),location.href),old=new URL(location.href);
 for(const [key,value] of old.searchParams)if(!['locale','lang','market'].includes(key))url.searchParams.append(key,value);
 history.replaceState(null,'',url);
 if(document.querySelector&&document.createElement){
  let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=url.href;
 }
}
const renderBefore20=render;render=function(){renderBefore20();syncLocalePath20()};
if(routes20?.online){
 const entry=siteLocales.find(l=>l.id===routes20.initialLocale);if(entry){currentLocale=entry;lang=entry.language;market=entry.profile;explicitMarket=true}
 const target=routes20.initialTarget;
 if(/^resource-\d+$/.test(target)){selected=Number(target.slice(9));view='detail'}
 else if(Object.hasOwn(routes20.paths,target))view=target;
 render();
}
