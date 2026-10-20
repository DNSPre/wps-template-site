const WPS_BUY22='https://www.wps.com/buy/?source=tempmall_web';
// Original prototype entries only. No third-party open-source files are reclassified.
const paidTemplates22=records.filter(d=>d.type==='templates');
for(const format of ['XLSX','DOCX','PPTX']){const sources=paidTemplates22.filter(d=>d.format===format);for(let i=0;i<10;i++){const source=sources[i%sources.length];records.push({...source,id:200+(['XLSX','DOCX','PPTX'].indexOf(format)*10)+i,access:'pro',mockPaid22:true,previewSource22:source.id,mockIndex22:i+1,original:true})}}
for(const [type,offset] of [['chart',6100],['wordart',6200],['image',6300]])for(let i=1;i<=12;i++){const source=records.find(d=>d.assetKind===type);records.push({...source,id:offset+i,variant:12+i,access:'pro',mockPaid22:true,original:true})}
for(const values of Object.values(assetCopy17))for(let i=0;i<values.length;i++)values[i]=values[i].replace(/\bPro\b(?!\+)/g,'Pro+');
const nameBefore22=name;name=function(d){return d.previewSource22?nameBefore22(records.find(r=>r.id===d.previewSource22))+' · '+String(d.mockIndex22).padStart(2,'0'):nameBefore22(d)};
const artBefore22=art;art=function(d,...args){return artBefore22(d.previewSource22?{...d,id:d.previewSource22}:d,...args)};
function proLabels22(html){return html.replace(/>Pro<\/span>/g,'>Pro+</span>').replace(/>Pro<small>/g,'>Pro+<small>').replace(/Pro ·/g,'Pro+ ·').replace(/Pro ✓/g,'Pro+ ✓').replace(/WPS Pro(?!\+)/g,'WPS Pro+')}
const cardBefore22=card;card=function(d){return proLabels22(cardBefore22(d))};
const detailBefore22=detail;detail=function(){return proLabels22(detailBefore22())};
const accountBefore22=accountControls15;accountControls15=function(){return proLabels22(accountBefore22())};
const headerBefore22=head;head=function(){headerBefore22();$('header').innerHTML=proLabels22($('header').innerHTML)};
const upgradeDialogBefore22=upgradeModal17;upgradeModal17=function(d){upgradeDialogBefore22(d);$('modalbody').innerHTML=proLabels22($('modalbody').innerHTML)};
function selectAccess22(value){accessFilter17=['all','free','pro'].includes(value)?value:'all';browsePage=1;render()}
const listingBefore22=listing;listing=function(saved=false){let html=listingBefore22(saved);if(saved)return html;const select=`<select class="access-filter22" aria-label="Free / Pro+" onchange="selectAccess22(this.value)"><option value="all" ${accessFilter17==='all'?'selected':''}>Free / Pro+</option><option value="free" ${accessFilter17==='free'?'selected':''}>Free</option><option value="pro" ${accessFilter17==='pro'?'selected':''}>Pro+</option></select>`;return html.replace('<div class="filterbar"><div>','<div class="filterbar"><div>'+select)};
async function openWpsBuy22(){if(!signedIn21()){accountLogin21({kind:'upgrade'});return}const state=await checkMembership21();if(state==='free'){window.location.assign(WPS_BUY22);return}if(state!=='guest')membershipMessage21()}
startUpgrade21=openWpsBuy22;
startCheckout17=openWpsBuy22;
const planBefore22=planPage17;planPage17=function(){if(membership21()!=='free')return proLabels22(planBefore22());return `<section class="wrap pagepad empty"><span class="plan-crown17">Pro+</span><h1>${ax17(13)}</h1><p>${ui11(20)}</p><a class="primary" href="${WPS_BUY22}">${ax17(7)} ↗</a></section>`};
render();
const membershipMessageBefore22=membershipMessage21;membershipMessage21=function(){membershipMessageBefore22();$('modalbody').innerHTML=proLabels22($('modalbody').innerHTML)};
const vectorBefore22=vector17;vector17=function(d){let svg=vectorBefore22(d);if(d.mockPaid22&&d.assetKind==='wordart'){const words=['FOCUS','INSPIRE','GROW','HELLO','DREAM','SHINE','BUILD','IDEAS','START','BOLD','MOVE','CREATE'];svg=svg.replace('>CREATE<','>'+words[(d.variant-13)%words.length]+'<')}return svg};
for(const d of records)if(d.mockPaid22&&d.assetKind==='wordart')d.filelang='English';
render();
