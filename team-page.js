(function(){
  var els=[].slice.call(document.querySelectorAll('.tp-r,.tp-steps'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('tp-in')});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('tp-in');io.unobserve(x.target);}});},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e){io.observe(e)});
  // gentle 3D tilt on leadership cards (mouse only)
  if(window.matchMedia&&matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){
    document.querySelectorAll('.tp-lead').forEach(function(c){
      c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='translateY(-8px) perspective(900px) rotateY('+(x*6)+'deg) rotateX('+(-y*5)+'deg)';});
      c.addEventListener('mouseleave',function(){c.style.transform='';});
    });
  }
})();
