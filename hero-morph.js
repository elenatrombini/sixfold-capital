(() => {
 const hero=document.querySelector('.hero'), about=document.querySelector('.split'), slot=about.querySelector('.img');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const scene=document.createElement('div'), stage=document.createElement('div'), layer=document.createElement('div'), photo=new Image();
 scene.className='hero-scene';stage.className='scene-stage';layer.className='scene-photo';layer.setAttribute('aria-hidden','true');
 photo.src='photo.jpg';photo.alt='';layer.append(photo);
 let ready=false, frame=0, travel=0;
 const clamp=x=>Math.max(0,Math.min(1,x));
 const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
 const mix=(a,b,t)=>a+(b-a)*t;
 function render(){
  frame=0;if(!ready||preference.matches)return;
  const sr=scene.getBoundingClientRect(), st=stage.getBoundingClientRect(), target=slot.getBoundingClientRect();
  const p=clamp(-sr.top/travel), t=smooth((p-.14)/.58);
  const w=mix(st.width,target.width,t),h=mix(st.height,target.height,t);
  layer.style.width=w+'px';layer.style.height=h+'px';
  layer.style.transform=`translate3d(${mix(0,target.left-st.left,t)}px,${mix(0,target.top-st.top,t)}px,0)`;
  const scale=mix(Math.max(st.width/photo.naturalWidth,st.height/photo.naturalHeight),Math.max(target.width/photo.naturalWidth,target.height/photo.naturalHeight),t);
  const iw=photo.naturalWidth*scale,ih=photo.naturalHeight*scale;
  Object.assign(photo.style,{width:iw+'px',height:ih+'px',left:(w-iw)/2+'px',top:(h-ih)*mix(.6,.5,t)+'px'});
  layer.style.setProperty('--veil-top',mix(.55,.25,t));layer.style.setProperty('--veil-bottom',mix(.70,.45,t));
  hero.style.setProperty('--hero-visibility',1-smooth(p/.24));hero.inert=p>.3;
  about.querySelector('.img h2').style.setProperty('--reveal',smooth((p-.62)/.14));
  [...about.querySelector('.txt').children].forEach((e,i)=>e.style.setProperty('--reveal',smooth((p-(.72+i*.055))/.14)));
  scene.dataset.progress=p;
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(render)}
 function size(){
  const height=Math.max(innerHeight,matchMedia('(max-width:900px)').matches?740:760);
  travel=Math.round(height*1.15);
  scene.style.setProperty('--stage-height',height+'px');scene.style.setProperty('--scene-travel',travel+'px');render();
 }
 function configure(){
  document.body.classList.toggle('scene-enabled',ready&&!preference.matches);
  layer.hidden=preference.matches;
  if(preference.matches){hero.inert=false;return}size();
 }
 photo.decode().then(()=>{
  hero.before(scene);scene.append(stage);stage.append(layer,hero,about);ready=true;configure();
  new ResizeObserver(schedule).observe(slot);
 }).catch(()=>{});
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',size);addEventListener('pageshow',schedule);
 preference.addEventListener('change',configure);
})();
