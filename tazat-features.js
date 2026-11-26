document.addEventListener('DOMContentLoaded',()=>{
 const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
 // Equipment gallery search and category filters
 const gs=$('#gallerySearch'), gc=$('#galleryCategory'), cards=$$('.equipment-card');
 function filterGallery(){if(!gs||!gc)return;const q=gs.value.toLowerCase(),c=gc.value;let n=0;cards.forEach(x=>{const ok=(x.dataset.name.includes(q)||x.dataset.category.toLowerCase().includes(q))&&(c==='all'||x.dataset.category===c);x.style.display=ok?'':'none';if(ok)n++});const out=$('#galleryCount');if(out)out.textContent=`Showing ${n} item${n===1?'':'s'}`}
 gs?.addEventListener('input',filterGallery);gc?.addEventListener('change',filterGallery);filterGallery();
 // Comparison list is a frontend-only selection helper
 const output=$('#compareOutput');function updateCompare(){if(!output)return;const chosen=$$('.compare-check:checked').map(x=>x.value);output.textContent=chosen.length?`Selected: ${chosen.join('  |  ')}. Compare manufacturer specifications, model, warranty and accessories before purchase.`:'Select two or more devices to create a side-by-side comparison list.'}
 $$('.compare-check').forEach(x=>x.addEventListener('change',updateCompare));$('#compareClear')?.addEventListener('click',()=>{$$('.compare-check').forEach(x=>x.checked=false);updateCompare()});
 // Website-wide local page search
 const si=$('#siteSearchInput'), sr=$$('#siteSearchResults .search-result');function searchSite(){if(!si)return;const q=si.value.toLowerCase().trim();let n=0;sr.forEach(a=>{const text=(a.innerText+' '+a.dataset.terms).toLowerCase(),ok=!q||text.includes(q);a.style.display=ok?'':'none';if(ok)n++});const st=$('#siteSearchStatus');if(st)st.textContent=q?`${n} matching section${n===1?'':'s'} found.`:'Start typing to explore website sections.'}
 si?.addEventListener('input',searchSite);
 // Knowledge check
 $$('.quiz-options button').forEach(b=>b.addEventListener('click',()=>{const f=$('#quizFeedback');if(f)f.textContent=b.dataset.answer==='correct'?'Correct! Calibration compares an instrument’s measurement performance with a suitable reference.':'Not quite. Think about comparison with a suitable reference standard.'}));
});
