(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var coins=0,bonus=0,$=function(i){return document.getElementById(i)};
var pad=function(n,l){return String(n).padStart(l,'0')};
var anims=[];
document.querySelectorAll('.lt[data-a]').forEach(function(el){
  var a=lottie.loadAnimation({container:el,renderer:'svg',loop:true,autoplay:false,animationData:ANIMS[el.dataset.a],rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});
  var off=+el.dataset.off||0;
  a.setSpeed(+el.dataset.speed||1);
  a.started=false;a.off=off;
  anims.push({el:el,a:a});
  if(el.classList.contains('q'))el.addEventListener('click',function(e){
    coins=(coins+1)%100;bonus+=200;$('coins').textContent=pad(coins,2);upd();
    a.goToAndPlay(0,true);
    var p=document.createElement('div');p.className='pop';p.textContent='+200';
    p.style.left=e.clientX+'px';p.style.top=e.clientY+'px';document.body.appendChild(p);
    setTimeout(function(){p.remove()},800);
  });
});
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){
    var o=anims.find(function(x){return x.el===e.target});if(!o)return;
    if(e.isIntersecting){
      if(reduce){o.a.goToAndStop(o.a.off+10,true);return}
      if(!o.a.started){o.a.started=true;o.a.goToAndPlay(o.a.off,true)}else o.a.play();
    }else o.a.pause();
  });
},{rootMargin:'100px'});
anims.forEach(function(x){io.observe(x.el)});
function upd(){$('score').textContent=pad(Math.floor(scrollY)*10+bonus,6)}
addEventListener('scroll',upd,{passive:true});upd();
var wio=new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting)$('world').textContent=e.target.dataset.world});
},{threshold:.5});
document.querySelectorAll('[data-world]').forEach(function(s){wio.observe(s)});
var t=400;setInterval(function(){t=t<=0?400:t-1;$('time').textContent=pad(t,3)},1000);
})();
