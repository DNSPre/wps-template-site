function proMark25(){return '<svg class="pro-mark25" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3h11L23 10 12 22 1 10Z" fill="currentColor"/><path d="m12 6 2.1 4 4.4 2-4.4 2-2.1 4-2.1-4-4.4-2 4.4-2Z" fill="#fff"/></svg>'}
const cardBefore25=card;card=function(d){let html=cardBefore25(d);if(d.access==='pro')html=html.replace(/<span class="pro-badge17">[\s\S]*?<\/span>/,`<span class="pro-badge17" title="WPS Pro+" aria-label="WPS Pro+">${proMark25()}</span>`);return html};
const detailBefore25=detail;detail=function(){let html=detailBefore25();if(records.find(d=>d.id===selected)?.access==='pro')html=html.replace(/(<span class="pro-detail17">)/,'$1'+proMark25());return html};
const controlsBefore25=accountControls15;accountControls15=function(){return controlsBefore25().replace('<div class="identity-status23 is-pro">','<div class="identity-status23 is-pro">'+proMark25())};
const downloadCopy25={
en:['Free templates for Word, Excel and PowerPoint','Edit documents, spreadsheets and presentations in WPS Office.','No thanks'],
'zh-Hant':['免費 Word、Excel 與 PowerPoint 範本','使用 WPS Office 編輯文件、試算表與簡報。','暫時不用'],
th:['เทมเพลตฟรีสำหรับ Word, Excel และ PowerPoint','แก้ไขเอกสาร สเปรดชีต และงานนำเสนอด้วย WPS Office','ไว้ก่อน'],
id:['Templat gratis untuk Word, Excel dan PowerPoint','Edit dokumen, spreadsheet, dan presentasi di WPS Office.','Tidak, terima kasih'],
ja:['Word・Excel・PowerPoint の無料テンプレート','WPS Office で文書・表計算・プレゼンテーションを編集。','今はしない'],
es:['Plantillas gratuitas para Word, Excel y PowerPoint','Edita documentos, hojas de cálculo y presentaciones con WPS Office.','Ahora no'],
'pt-BR':['Modelos gratuitos para Word, Excel e PowerPoint','Edite documentos, planilhas e apresentações no WPS Office.','Agora não'],
fr:['Modèles gratuits pour Word, Excel et PowerPoint','Modifiez vos documents, feuilles de calcul et présentations avec WPS Office.','Non merci'],
de:['Kostenlose Vorlagen für Word, Excel und PowerPoint','Dokumente, Tabellen und Präsentationen mit WPS Office bearbeiten.','Nein danke'],
it:['Modelli gratuiti per Word, Excel e PowerPoint','Modifica documenti, fogli di calcolo e presentazioni con WPS Office.','Non ora'],
pl:['Bezpłatne szablony Word, Excel i PowerPoint','Edytuj dokumenty, arkusze i prezentacje w WPS Office.','Nie teraz'],
ru:['Бесплатные шаблоны для Word, Excel и PowerPoint','Редактируйте документы, таблицы и презентации в WPS Office.','Не сейчас'],
tr:['Word, Excel ve PowerPoint için ücretsiz şablonlar','WPS Office ile belgeleri, tabloları ve sunuları düzenleyin.','Şimdi değil'],
vi:['Mẫu miễn phí cho Word, Excel và PowerPoint','Chỉnh sửa tài liệu, bảng tính và bản trình bày trong WPS Office.','Để sau'],
hi:['Word, Excel और PowerPoint के लिए निःशुल्क टेम्पलेट','WPS Office में दस्तावेज़, स्प्रेडशीट और प्रस्तुतियाँ संपादित करें।','अभी नहीं'],
fil:['Libreng template para sa Word, Excel at PowerPoint','Mag-edit ng dokumento, spreadsheet at presentasyon sa WPS Office.','Huwag muna'],
ms:['Templat percuma untuk Word, Excel dan PowerPoint','Edit dokumen, hamparan dan pembentangan dengan WPS Office.','Bukan sekarang']};
let downloadDismissed25=false;try{downloadDismissed25=sessionStorage.getItem('wps-download-dismissed-v25')==='true'}catch(e){}
function closeDownloadBanner25(){downloadDismissed25=true;try{sessionStorage.setItem('wps-download-dismissed-v25','true')}catch(e){}syncDownloadBanner25()}
function syncDownloadBanner25(){const box=$('download-banner25'),space=$('download-spacer25');box.hidden=space.hidden=downloadDismissed25;if(downloadDismissed25){box.innerHTML='';return}const text=downloadCopy25[lang]||downloadCopy25.en;box.innerHTML=`<aside class="download-inner25" aria-label="${t(4)}"><div class="download-logo25" aria-label="WPS">${siteLogo().match(/<svg[\s\S]*?<\/svg>/)?.[0]||''}<strong>WPS</strong></div><div class="download-copy25"><strong>${text[0]}</strong><p>${text[1]}</p></div><div class="download-actions25"><a class="primary" href="https://www.wps.com/download/" target="_blank" rel="noopener">${icon('download')} ${t(4)}</a><button onclick="closeDownloadBanner25()">${text[2]}</button></div></aside>`}
const renderBefore25=render;render=function(){renderBefore25();syncDownloadBanner25()};
render();
