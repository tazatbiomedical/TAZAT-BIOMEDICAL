(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* 1. Page loader */
const loader=$('#pageLoader');
const hideLoader=()=>{if(loader){loader.classList.remove('leaving');loader.classList.add('done')}};
if(loader){
  const t0=performance.now();
  const go=()=>setTimeout(hideLoader,Math.max(0,350-(performance.now()-t0)));
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go();
  addEventListener('pageshow',e=>{if(e.persisted)hideLoader()});
  document.addEventListener('click',e=>{
    if(reduce||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    const a=e.target.closest('a[href]');if(!a||a.target||a.hasAttribute('download'))return;
    const u=new URL(a.href,location.href);
    if(u.origin!==location.origin||!/\.html?$|\/$/.test(u.pathname))return;
    if(u.pathname===location.pathname&&u.search===location.search)return;
    e.preventDefault();loader.classList.remove('done');loader.classList.add('leaving');
    setTimeout(()=>{location.href=a.href},320);
  });
}

/* 5. Header shrink */
const header=$('.header');
if(header){const f=()=>header.classList.toggle('scrolled',scrollY>30);addEventListener('scroll',f,{passive:true});f()}

/* 2. Scroll reveal */
const sel='.card,.feature-card,.team-card,.quote-card,.equipment-card,.rental-card,.expertise-card,.search-result,.why-card,.calibration-copy,.track-card,.section-title-row,.sales-banner,.sleep-panel,.about-inner,.cta-band .container,.stat,.chips,.sales-cta,.faq-item,.blog-card,.post-card,.mv-card,.who-card,.process-step,.contact-strip,.tm-card';
if(!reduce&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$(sel).forEach(el=>{
    if(el.closest('.reveal'))return;
    const sibs=[...el.parentElement.children].filter(c=>c.matches(sel));
    el.style.transitionDelay=Math.min(sibs.indexOf(el),6)*70+'ms';
    el.classList.add('reveal');io.observe(el);
  });
}

/* 3. Counters */
const counters=$$('.stat b,.track-stats b').filter(b=>/^\D*\d/.test(b.textContent.trim()));
if(counters.length&&!reduce&&'IntersectionObserver' in window){
  const co=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;co.unobserve(en.target);
    const el=en.target,m=el.dataset.final.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);if(!m)return;
    const end=parseFloat(m[2].replace(/,/g,'')),dec=(m[2].split('.')[1]||'').length,t0=performance.now(),D=1400;
    const step=t=>{const p=Math.min((t-t0)/D,1),v=end*(1-Math.pow(1-p,3));
      el.textContent=m[1]+v.toLocaleString('en-IN',{minimumFractionDigits:dec,maximumFractionDigits:dec})+m[3];
      if(p<1)requestAnimationFrame(step);else el.textContent=el.dataset.final};
    requestAnimationFrame(step);
  }),{threshold:.6});
  counters.forEach(b=>{b.dataset.final=b.textContent.trim();co.observe(b)});
}

/* 6. ECG line in hero */
const hero=$('.hero');
if(hero&&!reduce){
  const beat='h110 l10 -9 l12 9 h30 l8 7 l10 -52 l12 66 l10 -21 h26 l14 -13 l16 13 h42';
  let d='M0 55';for(let i=0;i<4;i++)d+=' '+beat;
  d+=' H1200';
  const ns='http://www.w3.org/2000/svg',s=document.createElementNS(ns,'svg');
  s.setAttribute('class','ecg-line');s.setAttribute('viewBox','0 0 1200 90');s.setAttribute('preserveAspectRatio','none');s.setAttribute('aria-hidden','true');
  s.innerHTML=`<path class="base" d="${d}"/><path class="sweep" pathLength="1000" d="${d}"/>`;
  const shade=$('.hero-shade',hero);shade?shade.after(s):hero.prepend(s);
}

/* 7. Ripple */
document.addEventListener('pointerdown',e=>{
  const b=e.target.closest('.btn,.nav-cta,.rental-tab,.edu-option');if(!b||reduce)return;
  const r=b.getBoundingClientRect(),size=Math.max(r.width,r.height)*2,sp=document.createElement('span');
  sp.className='ripple';sp.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
  b.appendChild(sp);setTimeout(()=>sp.remove(),650);
});

/* 9-13. Extra polish: title lines, hero decor, typing placeholder, scroll ring */
if(!reduce){
  document.documentElement.classList.add('js-anim');
  /* floating plus icons + ECG sweep in page banners */
  $$('.page-hero').forEach(h=>{
    const w=document.createElement('div');w.className='hero-float';w.setAttribute('aria-hidden','true');
    for(let i=0;i<9;i++){const s=document.createElement('span');s.textContent='+';
      s.style.cssText=`left:${8+i*10.5}%;font-size:${14+(i%4)*9}px;animation-duration:${9+(i%5)*2.2}s;animation-delay:${-i*1.7}s`;w.appendChild(s)}
    h.appendChild(w);
    const ns='http://www.w3.org/2000/svg',s=document.createElementNS(ns,'svg');
    const beat='h110 l10 -9 l12 9 h30 l8 7 l10 -52 l12 66 l10 -21 h26 l14 -13 l16 13 h42';
    let d='M0 55';for(let i=0;i<4;i++)d+=' '+beat;d+=' H1200';
    s.setAttribute('class','ecg-line hero-ecg');s.setAttribute('viewBox','0 0 1200 90');s.setAttribute('preserveAspectRatio','none');s.setAttribute('aria-hidden','true');
    s.innerHTML=`<path class="base" d="${d}"/><path class="sweep" pathLength="1000" d="${d}"/>`;h.appendChild(s);
  });
  /* typing placeholder in shop search */
  const si=$('.sales-search input');
  if(si){
    const words=['Patient monitor','CPAP machine','Oxygen concentrator','Infusion pump','ECG machine','Ventilator'],base=si.placeholder||'Search equipment';
    let w=0,c=0,del=false,t;
    const tick=()=>{
      if(document.activeElement===si||si.value){si.placeholder=base;t=setTimeout(tick,600);return}
      const word=words[w];c+=del?-1:1;si.placeholder=word.slice(0,c)+'|';
      let wait=del?35:75;
      if(!del&&c===word.length){del=true;wait=1300}else if(del&&c===0){del=false;w=(w+1)%words.length;wait=300}
      t=setTimeout(tick,wait);
    };
    si.addEventListener('blur',()=>{if(!si.value)si.placeholder=base});
    tick();
  }
}
/* scroll progress ring on back-to-top */
const tt=$('#toTop');
if(tt){const pr=()=>{const h=document.documentElement.scrollHeight-innerHeight;tt.style.setProperty('--p',h>0?Math.min(100,scrollY/h*100):0)};addEventListener('scroll',pr,{passive:true});pr()}

/* team crew slider */
const trk=$('.tc-track');
if(trk){
  const step=()=>{const c=trk.querySelector('.tc-card');return c?c.getBoundingClientRect().width+20:300};
  const next=()=>{trk.scrollLeft+trk.clientWidth>=trk.scrollWidth-4?trk.scrollTo({left:0}):trk.scrollBy({left:step()})};
  const prev=()=>{trk.scrollLeft<=4?trk.scrollTo({left:trk.scrollWidth}):trk.scrollBy({left:-step()})};
  $('.tc-next')?.addEventListener('click',next);$('.tc-prev')?.addEventListener('click',prev);
  if(!reduce){let t=setInterval(next,3500);const stop=()=>clearInterval(t),go=()=>{stop();t=setInterval(next,3500)};
    trk.addEventListener('mouseenter',stop);trk.addEventListener('mouseleave',go);trk.addEventListener('touchstart',stop,{passive:true});trk.addEventListener('touchend',go,{passive:true})}
}
})();
