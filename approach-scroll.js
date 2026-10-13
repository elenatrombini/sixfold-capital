(() => {
 const section=document.querySelector('.pillars'),track=section.querySelector('.grid');
 const stage=document.createElement('div');stage.className='approach-stage';
 while(section.firstChild)stage.append(section.firstChild);section.append(stage);
 stage.lastElementChild.classList.add('approach-link');
 track.setAttribute('aria-label','Investment disciplines');track.setAttribute('tabindex','0');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'), desktop=matchMedia('(min-width:901px) and (pointer:fine)');
 let distance=0,enabled=false,frame=0;
 function draw(){frame=0;if(!enabled)return;const y=Math.max(0,Math.min(distance,-section.getBoundingClientRect().top));track.style.transform=`translate3d(${-y}px,0,0)`;}
 function schedule(){if(!frame)frame=requestAnimationFrame(draw)}
 function measure(){
  section.classList.remove('approach-pinned');track.style.transform='';
  // On short viewports use the accessible native horizontal track instead of clipping content.
  const height=stage.offsetHeight;
  enabled=desktop.matches&&!reduced.matches&&height<=innerHeight;
  if(enabled){
   const last=track.lastElementChild;distance=Math.max(0,last.offsetLeft+last.offsetWidth+48-section.clientWidth);
   section.style.setProperty('--approach-height',height+'px');section.style.setProperty('--approach-distance',distance+'px');section.classList.add('approach-pinned');track.scrollLeft=0;draw();
  }
 }
 track.addEventListener('keydown',event=>{
  if(!enabled||!['ArrowRight','ArrowLeft'].includes(event.key))return;
  event.preventDefault();scrollBy({top:(event.key==='ArrowRight'?1:-1)*(track.firstElementChild.offsetWidth+28),behavior:'smooth'});
 });
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure);addEventListener('pageshow',schedule);
 reduced.addEventListener('change',measure);desktop.addEventListener('change',measure);
 document.fonts.ready.then(measure);measure();
})();
