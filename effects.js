(() => {
  'use strict';
  const extra = {
    vi: { introEyebrow:'MỘT MÓN QUÀ NHỎ · 15.11.2026',introTitle:'Tợp ơi,<br>có một món quà dành cho chị.',introSubtitle:'Một chút phép màu đang đợi sau phong thư này.',openSilent:'Mở món quà ✧',openMusic:'Mở cùng âm nhạc ♫',skipIntro:'Đi thẳng đến lời chúc',motionFull:'Giảm hiệu ứng',motionLess:'Bật hiệu ứng',cakeHint:'CHẠM NGÔI SAO HOẶC CHIẾC BÁNH ĐỂ THỔI NẾN',wishSubtitle:'Thổi nến, gửi một điều ước — rồi để phép màu bắt đầu.',wishHint:'CHẠM VÀO NGÔI SAO ĐỂ THỔI NẾN VÀ GỬI ĐIỀU ƯỚC',replayFireworks:'Bắn pháo bông lần nữa ↗',relight:'Thắp lại nến',endShow:'Trở về món quà ↓',celebrationLine:'15.11.2026 · THƯƠNG CHỊ TỢP THẬT NHIỀU',galaxyLabel:'Mỗi khoảnh khắc, một vì sao.',secretButton:'Tợp đừng bấm 😏',secretText:'Thêm tuổi rồi mà vẫn là Tợp thôi :))',reopen:'Mở lại phong thư ✧' },
    en: { introEyebrow:'A LITTLE GIFT · 15.11.2026',introTitle:'Hey Tợp,<br>there’s a little gift for you.',introSubtitle:'A little magic is waiting inside this envelope.',openSilent:'Open your gift ✧',openMusic:'Open with music ♫',skipIntro:'Go straight to your birthday wishes',motionFull:'Less motion',motionLess:'More motion',cakeHint:'TOUCH THE BIRTHDAY CAKE TO BLOW OUT THE CANDLES AND SEE THE FIREWORKS',wishSubtitle:'Blow out the candles, make a wish — and let a little magic begin.',wishHint:'TOUCH THE BIRTHDAY CAKE TO BLOW OUT THE CANDLES AND SEE THE FIREWORKS',replayFireworks:'More birthday fireworks ↗',relight:'Relight the candles',endShow:'Back to your gift ↓',celebrationLine:'15.11.2026 · A WHOLE LOT OF LOVE FOR YOU, TỢP',galaxyLabel:'Every moment, a little star.',secretButton:'Don’t press this, Tợp 😏',secretText:'Another year older. Still our Tợp :))',reopen:'Open the envelope again ✧' }
  };
  Object.assign(copy.vi, extra.vi); Object.assign(copy.en, extra.en);
  const text = key => copy[language][key];
  const markup = (tag, className, html, parent=document.body) => {const el=document.createElement(tag);el.className=className;el.innerHTML=html;parent.append(el);return el;};
  function syncMotion(){
    document.body.classList.toggle('motion-reduced',reducedMotion.matches);
    if(reducedMotion.matches){finishShow();layoutStaticGalaxy();}
  }

  const intro=markup('section','gift-intro',`<p class="eyebrow intro-eyebrow" data-i18n="introEyebrow"></p><h2 class="intro-heading" data-i18n="introTitle"></h2><div class="envelope-scene" aria-hidden="true"><div class="envelope-glow"></div><div class="envelope-back"></div><div class="envelope-letter">Lê Như Hoài<span>WITH LOVE · 15.11.2026</span>♡</div><div class="envelope-front"></div><div class="envelope-flap"></div><div class="envelope-seal">✧</div></div><p class="intro-subtitle" data-i18n="introSubtitle"></p><div class="intro-actions"><button class="pill open-gift" data-i18n="openSilent"></button></div><button class="intro-skip" data-i18n="skipIntro"></button>`);
  intro.setAttribute('aria-label', 'A birthday gift for Lê Như Hoài');
  for(let i=0;i<15;i++) { const spark=markup('span','intro-spark','✧',intro);spark.setAttribute('aria-hidden','true');spark.style.cssText=`left:${6+Math.random()*88}%;top:${12+Math.random()*72}%;font-size:${10+Math.random()*23}px;animation-delay:${-Math.random()*6}s`; }
  let introTimer;
  function resetToStart(){
    // Ignore both a restored scroll position and a previous section anchor.
    if(location.hash) history.replaceState(history.state,'',location.pathname+location.search);
    window.scrollTo({top:0,left:0,behavior:'instant'});
    scrollY=0;
    $('.progress').style.width='0%';
  }
  window.addEventListener('pageshow',()=>{
    if(!intro.classList.contains('departed')) resetToStart();
  });
  function lockPage(lock){$('main').inert=lock;$('footer').inert=lock;document.body.style.overflow=lock?'hidden':'';}
  function openGift(skip=false){
    if(intro.classList.contains('opening')||intro.classList.contains('departed'))return;
    resetToStart();
    startBackgroundMusic();
    intro.classList.add('opening');
    introTimer=setTimeout(()=>{
      intro.classList.add('departed');intro.inert=true;lockPage(false);
      resetToStart();
      $('#home').classList.add('hero-enter');
      $('.hero-content .pill').focus({preventScroll:true});
      requestAnimationFrame(resetToStart);
      if(!skip&&!reducedMotion.matches)startShow(2800,true);
    },skip||reducedMotion.matches?0:1750);
  }
  $('.open-gift').addEventListener('click',()=>openGift());
  $('.intro-skip').addEventListener('click',()=>openGift(true));
  intro.addEventListener('keydown',event=>{if(event.key==='Escape')openGift(true);});
  const reopen=markup('button','secret-button','',$('footer'));
  reopen.dataset.i18n='reopen';reopen.addEventListener('click',()=>{
    clearTimeout(introTimer);finishShow();window.scrollTo({top:0,behavior:'instant'});intro.classList.remove('opening','departed');intro.inert=false;lockPage(true);$('.open-gift').focus();
  });

  const qualities=$$('.quality');
  const themes=['brave','warm','radiant'];
  qualities.forEach((section,i)=>{
    section.classList.add(themes[i]);
    const scene=markup('div','quality-scene','',section);scene.setAttribute('aria-hidden','true');
    if(i===0)scene.innerHTML='<i class="mist-ribbon"></i><i class="star-path"></i><i class="journey-star">✦</i>';
    if(i===1)scene.innerHTML='<i class="warm-ring"></i><i class="warm-ring"></i><i class="warm-ring"></i><i class="warm-heart">♡</i>';
    if(i===2)scene.innerHTML='<i class="crystal-flower">'+Array.from({length:8},(_,n)=>`<b class="crystal-petal" style="--petal:${n}"></b>`).join('')+'</i>';
  });
  const lineObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add(entry.target.matches('.signature')?'signed':'line-visible');lineObserver.unobserve(entry.target);}}),{threshold:.65});
  function observeLetter(){ $$('#letter-body p').forEach(p=>lineObserver.observe(p));lineObserver.observe($('.signature')); }

  const cake=markup('button','cake-stage',`<span class="cake-orbit"></span><span class="cake"><span class="cake-plate"></span><span class="cake-layer"><span class="cake-top"></span><span class="cake-ribbon"></span><span class="cake-pearls">${'<i></i>'.repeat(12)}</span><span class="cake-script">for Katie ♡</span></span>${[-42,0,42].map(x=>`<span class="candle" style="--candle-x:${x}px"><i class="flame"></i><i class="smoke"></i></span>`).join('')}</span>`);
  cake.type='button';cake.style.border='0';cake.style.background='transparent';
  $('#wish').insertBefore(cake,$('#wish-message'));
  const actions=markup('div','wish-action','<button class="pill replay-fireworks" data-i18n="replayFireworks"></button><button class="pill relight" data-i18n="relight"></button>',$('#wish'));
  actions.hidden=true;
  $('.replay-fireworks').addEventListener('click',()=>startShow(11000));
  $('.relight').addEventListener('click',()=>{
    finishShow();cake.classList.remove('candles-out');$('.wish-section').classList.remove('wish-sent');wished=false;$('#wish-message').textContent=text('wishHint');actions.hidden=true;
  });
  cake.addEventListener('click',makeWish);

  const galaxy=markup('div','galaxy-stage','<div class="galaxy-core"></div><div class="galaxy-inner"></div><p class="galaxy-label" data-i18n="galaxyLabel"></p>');
  $('#memories').insertBefore(galaxy,$('#gallery'));
  const scenePhotos=[];
  [1,7,12,18,23,28,33,38,44,48,52,56].forEach((index,i)=>{
    const card=markup('button','galaxy-photo',`<img src="${photos[index]}" alt="" loading="lazy" decoding="async">`,$('.galaxy-inner'));
    card.dataset.index=index;card.addEventListener('click',()=>openPhoto(index));scenePhotos.push(card);
  });
  const galleryObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('arrived');galleryObserver.unobserve(entry.target);}}),{threshold:.05});
  function observeGallery(){ $$('.memory').forEach((el,i)=>{el.style.setProperty('--delay',`${i%4*75}ms`);galleryObserver.observe(el);}); }
  new MutationObserver(observeGallery).observe($('#gallery'),{childList:true});
  const secret=markup('div','secret-area','<button class="secret-button" data-i18n="secretButton"></button><p class="secret-message" role="status"></p>',$('footer'));
  let secretOpened=false;
  secret.querySelector('button').addEventListener('click',()=>{secretOpened=true;$('.secret-message').textContent=text('secretText');if(!reducedMotion.matches)startShow(2200,true);});
  const constellation=markup('div','footer-art',`<svg class="footer-constellation" viewBox="0 0 420 130" aria-hidden="true"><path class="constellation-path" d="M40 80L65 28L92 70L120 38L145 90L180 60L210 85L239 42L265 79L290 35L320 85L345 40L380 70"/>${[[40,80],[65,28],[92,70],[120,38],[145,90],[180,60],[210,85],[239,42],[265,79],[290,35],[320,85],[345,40],[380,70]].map(([x,y],i)=>`<circle class="constellation-dot" cx="${x}" cy="${y}" r="3" style="animation-delay:${i*.2}s"/>`).join('')}<text x="210" y="123" text-anchor="middle" fill="#a68ab8" font-family="Georgia,serif" font-style="italic" font-size="23">Tợp ♡</text></svg>`);
  $('footer').insertBefore(constellation,$('.footer-star'));
  new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('constellation-visible');}),{threshold:.3}).observe(constellation);

  const night=markup('div','firework-night','');
  const fireworks=markup('canvas','fireworks-canvas','');fireworks.setAttribute('aria-hidden','true');
  const fx=fireworks.getContext('2d');
  const greeting=markup('div','celebration-title','<h2>Happy Birthday,<br><em>Katie!</em></h2><p data-i18n="celebrationLine"></p>');
  greeting.setAttribute('aria-live','polite');
  const endButton=markup('button','pill end-show','');endButton.dataset.i18n='endShow';endButton.hidden=true;endButton.addEventListener('click',()=>finishShow(true));
  let show=null,fxFrame=0,lastFrame=0,fw=innerWidth,fh=innerHeight,returnFocus=null;
  function sizeFX(){fw=innerWidth;fh=innerHeight;const d=Math.min(devicePixelRatio||1,2);fireworks.width=fw*d;fireworks.height=fh*d;fx.setTransform(d,0,0,d,0,0);}
  sizeFX();window.addEventListener('resize',sizeFX,{passive:true});
  const palette=['#e3c3ff','#ffe1a7','#fff8ed','#bdceff','#ffb6d5','#cbb3ff'];
  const random=(min,max)=>min+Math.random()*(max-min);
  function rocket(kind='bloom',mini=false){
    if(!show)return;
    const tx=fw*random(.14,.86),ty=fh*random(.12,.42);
    show.rockets.push({x:fw*random(.15,.85),y:fh+10,sx:fw*random(.25,.75),tx,ty,age:0,flight:random(.65,1.05),kind,color:mini?'#a47ab8':palette[Math.floor(Math.random()*palette.length)]});
  }
  function boomSound(){
    if(!musicOn||!audioContext||document.hidden)return;
    const now=audioContext.currentTime,len=.45,buffer=audioContext.createBuffer(1,audioContext.sampleRate*len,audioContext.sampleRate),data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,3);
    const source=audioContext.createBufferSource(),gain=audioContext.createGain(),filter=audioContext.createBiquadFilter();source.buffer=buffer;filter.type='lowpass';filter.frequency.value=650;gain.gain.setValueAtTime(.06,now);gain.gain.exponentialRampToValueAtTime(.001,now+len);source.connect(filter);filter.connect(gain);gain.connect(audioContext.destination);source.start();
  }
  function burst(r){
    if(!show)return;
    boomSound();
    const count=innerWidth<650?85:130;
    for(let i=0;i<count;i++){
      const a=i/count*Math.PI*2;let vx,vy;
      const speed=random(75,210)*(show.mini?.65:1);
      if(r.kind==='heart'){const s=10;vx=16*Math.pow(Math.sin(a),3)*s;vy=-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*s;}
      else if(r.kind==='ring'){vx=Math.cos(a)*160;vy=Math.sin(a)*90;}
      else {vx=Math.cos(a)*speed;vy=Math.sin(a)*speed;}
      show.particles.push({x:r.tx,y:r.ty,vx,vy,age:0,life:r.kind==='willow'?random(2.8,3.6):random(1.5,2.7),color:r.color,kind:r.kind,trail:[],size:r.kind==='ring'?2.1:random(.9,1.8)});
    }
    if(show.particles.length>1800)show.particles.splice(0,show.particles.length-1800);
  }
  function startShow(duration=11000,mini=false){
    if(reducedMotion.matches){if(!mini){wished=true;$('#wish-message').textContent=text('wishSent');}return;}
    if(show&&!show.mini)return;
    finishShow();
    returnFocus=document.activeElement;
    show={duration:duration/1000,elapsed:0,next:0,rockets:[],particles:[],mini,count:0};
    if(!mini){lockPage(true);$('.topbar').inert=true;night.classList.add('active');endButton.hidden=false;endButton.focus({preventScroll:true});greeting.classList.remove('visible');}
    lastFrame=0;fxFrame=requestAnimationFrame(renderFireworks);
  }
  function renderFireworks(time){
    if(!show)return;
    const dt=lastFrame?Math.min((time-lastFrame)/1000,.04):.016;lastFrame=time;show.elapsed+=dt;
    fx.clearRect(0,0,fw,fh);
    const launchEnd=show.duration-(show.mini?.8:3.3);
    if(show.elapsed>=show.next&&show.elapsed<launchEnd){
      const kind=['bloom','ring','willow','heart'][show.count++%4];rocket(kind,show.mini);
      if(!show.mini&&show.count%3===0)rocket('bloom');
      show.next=show.elapsed+(show.mini?.65:.62);
    }
    show.rockets=show.rockets.filter(r=>{
      r.age+=dt;const p=Math.min(r.age/r.flight,1),lastX=r.x,lastY=r.y;r.x=r.sx+(r.tx-r.sx)*p;r.y=fh+(r.ty-fh)*(1-Math.pow(1-p,1.7));
      fx.globalAlpha=.9;fx.strokeStyle=r.color;fx.lineWidth=1.8;fx.beginPath();fx.moveTo(lastX,lastY);fx.lineTo(r.x,r.y);fx.stroke();fx.shadowBlur=12;fx.shadowColor=r.color;fx.fillStyle=r.color;fx.beginPath();fx.arc(r.x,r.y,2,0,Math.PI*2);fx.fill();fx.shadowBlur=0;
      if(p>=1){burst(r);return false;}return true;
    });
    show.particles=show.particles.filter(p=>{
      p.age+=dt;if(p.age>=p.life)return false;
      p.trail.push([p.x,p.y]);if(p.trail.length>6)p.trail.shift();
      const drag=Math.pow(p.kind==='willow'?.987:.975,dt*60);p.vx*=drag;p.vy=p.vy*drag+(p.kind==='willow'?43:30)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
      const alpha=Math.pow(1-p.age/p.life,.7);fx.globalAlpha=alpha;fx.strokeStyle=p.color;fx.lineWidth=p.size*.65;fx.beginPath();p.trail.forEach(([x,y],i)=>i?fx.lineTo(x,y):fx.moveTo(x,y));fx.lineTo(p.x,p.y);fx.stroke();fx.fillStyle=p.color;fx.beginPath();fx.arc(p.x,p.y,p.size,0,Math.PI*2);fx.fill();
      if(p.kind==='ring'){fx.fillRect(p.x-3,p.y-.45,6,.9);fx.fillRect(p.x-.45,p.y-3,.9,6);}return true;
    });
    fx.globalAlpha=1;
    if(!show.mini&&show.elapsed>2)greeting.classList.add('visible');
    if(!show.mini&&show.elapsed>7.5&&!show.finale){show.finale=true;celebrateWish();}
    if(show.elapsed>=show.duration){finishShow(true);return;}
    fxFrame=requestAnimationFrame(renderFireworks);
  }
  function finishShow(restoreFocus=false){
    const wasFull=show&&!show.mini;show=null;cancelAnimationFrame(fxFrame);fx.clearRect(0,0,fw,fh);night.classList.remove('active');greeting.classList.remove('visible');endButton.hidden=true;
    if(wasFull){lockPage(false);$('.topbar').inert=false;}
    if(wasFull&&restoreFocus&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
  }
  function makeWish(){
    if(show&&!show.mini)return;
    cake.classList.add('candles-out');celebrateWish(false);actions.hidden=false;startShow(11000);
  }
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&show)finishShow(true);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)finishShow();});

  let lastScene=0;
  function update(time){
    if(reducedMotion.matches||time-lastScene<32)return;lastScene=time;
    qualities.forEach(section=>{
      const rect=section.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;
      const travel=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
      section.style.setProperty('--travel',travel.toFixed(3));section.style.setProperty('--lean',((travel-.5)*2).toFixed(3));
    });
    const rect=galaxy.getBoundingClientRect();
    if(rect.bottom>0&&rect.top<innerHeight){
      const travel=(innerHeight-rect.top)/(innerHeight+rect.height),spread=innerWidth<650?130:350;
      scenePhotos.forEach((card,i)=>{
        const angle=i/scenePhotos.length*Math.PI*2+travel*1.8;
        const x=Math.cos(angle)*spread,y=Math.sin(angle)*105,z=Math.sin(angle)*150;
        card.style.transform=`translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) rotateY(${-Math.cos(angle)*16}deg) rotateZ(${Math.sin(angle)*8}deg)`;
        card.style.zIndex=String(Math.round(z+200));
      });
    }
  }
  let lastSpark=0;
  window.addEventListener('pointermove',event=>{
    if(reducedMotion.matches||event.pointerType!=='mouse'||performance.now()-lastSpark<100||show||!intro.classList.contains('departed'))return;
    lastSpark=performance.now();
    const spark=markup('span','cursor-spark','✧');spark.style.cssText=`position:fixed;pointer-events:none;z-index:125;left:${event.clientX}px;top:${event.clientY}px;color:#bca1cc;font-size:12px`;
    const animation=spark.animate([{opacity:.7,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-50%,22px) scale(.2) rotate(90deg)'}],{duration:850});animation.onfinish=()=>spark.remove();
  },{passive:true});
  setInterval(()=>{
    if(document.hidden||reducedMotion.matches||show||!intro.classList.contains('departed'))return;
    const meteor=markup('i','meteor','');meteor.setAttribute('aria-hidden','true');meteor.style.left=`${random(0,65)}vw`;meteor.style.top=`${random(5,35)}vh`;meteor.addEventListener('animationend',()=>meteor.remove());
  },8500);
  window.addEventListener('birthday-language',()=>{
    cake.setAttribute('aria-label',text('cakeHint'));
    scenePhotos.forEach(card=>card.setAttribute('aria-label',`${text('photo')} ${Number(card.dataset.index)+1}`));
    if(secretOpened)$('.secret-message').textContent=text('secretText');
    observeLetter();observeGallery();
  });
  reducedMotion.addEventListener('change',syncMotion);
  window.BirthdayEffects={makeWish,update};
  translate();syncMotion();observeLetter();observeGallery();
  // Give the static orbit a usable layout even before the next animation frame.
  function layoutStaticGalaxy(){scenePhotos.forEach((card,i)=>{const a=i/scenePhotos.length*Math.PI*2;card.style.transform=`translate(-50%,-50%) translate(${Math.cos(a)*(innerWidth<650?120:330)}px,${Math.sin(a)*100}px) rotate(${Math.sin(a)*8}deg)`;});}
  layoutStaticGalaxy();
  window.addEventListener('resize',()=>{if(reducedMotion.matches)layoutStaticGalaxy();},{passive:true});
  resetToStart();lockPage(true);$('.open-gift').focus({preventScroll:true});
})();
