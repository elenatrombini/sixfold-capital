(() => {
 const section=document.querySelector('.pillars'),track=section.querySelector('.grid');
 const stage=document.createElement('div');stage.className='approach-stage';
 const link=section.lastElementChild;link.classList.add('approach-link');
 while(section.firstChild&&section.firstChild!==link)stage.append(section.firstChild);
 section.prepend(stage);section.after(link);
 track.setAttribute('aria-label','Investment disciplines');track.setAttribute('tabindex','0');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 // Smallest visible viewport (iOS Safari with toolbars shown), so the pinned stage always fits.
 const probe=document.createElement('div');probe.style.cssText='position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none';document.body.append(probe);
 let distance=0,enabled=false,frame=0,lastWidth=0;
 function draw(){frame=0;if(!enabled)return;const y=Math.max(0,Math.min(distance,-section.getBoundingClientRect().top));track.style.transform=`translate3d(${-y}px,0,0)`;}
 function schedule(){if(!frame)frame=requestAnimationFrame(draw)}
 function measure(){
  lastWidth=innerWidth;
  section.classList.remove('approach-pinned');track.style.transform='';
  const view=probe.offsetHeight||innerHeight;
  section.classList.add('approach-pinned');
  stage.style.height=stage.style.minHeight='auto';const height=stage.offsetHeight;stage.style.height=stage.style.minHeight='';
  // Very short screens or reduced motion: keep the accessible native horizontal track.
  enabled=!reduced.matches&&height<=view;
  if(enabled){
   const last=track.lastElementChild,pad=parseFloat(getComputedStyle(track).paddingLeft)||0;
   distance=Math.max(0,Math.ceil(last.getBoundingClientRect().right-section.getBoundingClientRect().left+pad-section.clientWidth));
   section.style.setProperty('--approach-height',view+'px');section.style.setProperty('--approach-distance',distance+'px');track.scrollLeft=0;draw();
  }else section.classList.remove('approach-pinned');
 }
 track.addEventListener('keydown',event=>{
  if(!enabled||!['ArrowRight','ArrowLeft'].includes(event.key))return;
  event.preventDefault();scrollBy({top:(event.key==='ArrowRight'?1:-1)*(track.firstElementChild.offsetWidth+28),behavior:'smooth'});
 });
 addEventListener('scroll',schedule,{passive:true});
 // iOS fires resize when the toolbar shows/hides: only re-measure when the width really changes.
 addEventListener('resize',()=>{if(innerWidth!==lastWidth)measure();else schedule()});
 addEventListener('orientationchange',()=>setTimeout(measure,300));
 addEventListener('pageshow',schedule);addEventListener('load',measure);
 reduced.addEventListener('change',measure);
 document.fonts.ready.then(measure);measure();
})();
