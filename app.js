if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const photos = window.BIRTHDAY_PHOTOS;
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
let userReducedMotion = false;
const reducedMotion = new EventTarget();
Object.defineProperty(reducedMotion, 'matches', { get: () => systemMotion.matches || userReducedMotion });
systemMotion.addEventListener('change', () => reducedMotion.dispatchEvent(new Event('change')));
let language = 'vi';
try { language = localStorage.getItem('katie-language') === 'en' ? 'en' : 'vi'; } catch {}
let wished = false;
const copy = {
  vi: {
    heroEyebrow:'NGÀY HÔM NAY THUỘC VỀ CHỊ',heroTitle:'Một vũ trụ nhỏ',heroName:'dành cho Tợp.',heroDescription:'Là Katie khi đi làm, là Tợp khi về nhà.<br>Còn hôm nay, chị là điều đặc biệt nhất ở đây.',begin:'Mở món quà của chị',madeWith:'MỘT CHÚT PHÉP MÀU, RẤT NHIỀU YÊU THƯƠNG',scroll:'CUỘN ĐỂ KHÁM PHÁ',chapterOne:'01 / NHỮNG ĐIỀU LÀM NÊN CHỊ',wordsTitle:'Nếu chọn ba từ,<br>em sẽ chọn…',wordsSubtitle:'Ba điều thật đẹp mà em muốn dành cho chị, hôm nay và cả những ngày sau.',chapterTwo:'02 / GỬI CHỊ, Ở TUỔI MỚI',letterTitle:'Thêm một tuổi.<br><em>Thêm nhiều điều đẹp.</em>',letterAside:'Có những điều ngày thường ít nói,<br>nên hôm nay em viết ở đây.',letterGreeting:'Chúc mừng sinh nhật chị Tợp!',signature:'Thương chị,<br><em>Em của chị ♡</em>',wishEyebrow:'MỘT KHOẢNH KHẮC CHỈ DÀNH CHO CHỊ',wishTitle:'Nhắm mắt lại.<br><em>Ước một điều nhé.</em>',wishSubtitle:'Có một ngôi sao nhỏ đang đợi mang điều ước của chị đi.',wishHint:'CHẠM VÀO NGÔI SAO ĐỂ GỬI ĐIỀU ƯỚC',wishSent:'ĐIỀU ƯỚC ĐÃ GỬI ĐẾN CÁC VÌ SAO. MONG MỌI ĐIỀU ĐẸP SẼ ĐẾN VỚI CHỊ ♡',memoriesEyebrow:'NHỮNG MẢNH GHÉP LẤP LÁNH',memoriesTitle:'57 khoảnh khắc.<br><em>Một chị Tợp rất riêng.</em>',memoriesSubtitle:'Mỗi tấm ảnh là một ngôi sao nhỏ.<br>Chạm để ngắm nhìn gần hơn.',morePhotos:'Xem tất cả 57 khoảnh khắc',lessPhotos:'Thu gọn album',footerTitle:'Happy Birthday, Katie.',footerNote:'Cả một vũ trụ yêu thương, dành cho chị Tợp.',backTop:'VỀ ĐẦU TRANG ↑',soundOff:'Âm thanh tắt',soundOn:'Âm thanh bật',soundLabel:'Bật hoặc tắt nhạc nền',wishLabel:'Gửi điều ước',closeLabel:'Đóng ảnh',prevLabel:'Ảnh trước',nextLabel:'Ảnh tiếp',photo:'Khoảnh khắc',
    qualities:[
      ['Can đảm','Brave','Can đảm là khi chị vẫn bước tiếp, dù có những điều chưa chắc chắn và những ngày chẳng dễ dàng. Em mong chị luôn tin vào mình, và biết rằng mỗi bước nhỏ của chị đều đáng tự hào.'],
      ['Ấm áp','Warm-hearted','Có những người khiến một nơi trở nên thân thuộc chỉ vì họ có mặt ở đó. Với em, chị là một người như thế. Mong chị luôn nhận lại thật nhiều sự quan tâm và dịu dàng mà chị dành cho mọi người.'],
      ['Rực rỡ','Radiant','Chị có một cách tỏa sáng rất riêng: trong nụ cười, trong những điều chị yêu, và trong cách chị sống cuộc đời mình. Mong chị luôn tự tin với ánh sáng ấy và cho mình thật nhiều cơ hội để hạnh phúc.']
    ],
    letter:[
      'Tuổi mới, em chúc chị có thật nhiều sức khỏe, những giấc ngủ ngon và những ngày thức dậy thấy lòng nhẹ tênh.',
      'Mong công việc của Katie có thêm nhiều tin vui; cuộc sống của Tợp có thêm nhiều cuộc hẹn vui, món ngon và những chuyến đi đáng nhớ. Mong những điều chị đang cố gắng sẽ dần có kết quả, còn những điều chị đang mong sẽ đến vào một lúc thật đẹp.',
      'Chúc chị được yêu thương thật lòng, được thoải mái là chính mình, và luôn có người để chia sẻ cả chuyện vui lẫn những ngày mệt.',
      'Cứ lớn thêm một tuổi, xinh thêm một chút, vui thêm thật nhiều. Chuyện bị em gọi là Tợp thì chắc vẫn còn dài dài :))',
      'Thương chị. Chúc chị một tuổi mới thật đẹp.'
    ]
  },
  en: {
    heroEyebrow:'TODAY IS ALL YOURS',heroTitle:'A little universe,',heroName:'just for you.',heroDescription:'Katie at work. Tợp at home.<br>Today, you’re the most special part of this little universe.',begin:'Open your birthday gift',madeWith:'A LITTLE MAGIC, A WHOLE LOT OF LOVE',scroll:'SCROLL TO DISCOVER',chapterOne:'01 / THE THINGS THAT MAKE YOU, YOU',wordsTitle:'If I had three words,<br>I would choose…',wordsSubtitle:'Three beautiful things I want to celebrate about you, today and always.',chapterTwo:'02 / A NOTE FOR YOUR NEXT CHAPTER',letterTitle:'Another year.<br><em>More beautiful things.</em>',letterAside:'Some things don’t get said enough.<br>So today, I’m putting them into words.',letterGreeting:'Happy birthday, Tợp!',signature:'Love you, sis.<br><em>Always, your little sibling ♡</em>',wishEyebrow:'A MOMENT THAT’S JUST FOR YOU',wishTitle:'Close your eyes.<br><em>Make a little wish.</em>',wishSubtitle:'Blow out the candles, make a wish ? and let a little magic begin.',wishHint:'TOUCH THE BIRTHDAY CAKE TO BLOW OUT THE CANDLES AND SEE THE FIREWORKS',wishSent:'YOUR WISH IS AMONG THE STARS. MAY BEAUTIFUL THINGS FIND YOU ♡',memoriesEyebrow:'LITTLE PIECES OF LIGHT',memoriesTitle:'57 little moments.<br><em>One wonderful you.</em>',memoriesSubtitle:'Every photograph, a little star.<br>Tap to take a closer look.',morePhotos:'Explore all 57 moments',lessPhotos:'Show fewer moments',footerTitle:'Happy Birthday, Katie.',footerNote:'A whole universe of love, just for you, Tợp.',backTop:'BACK TO THE TOP ↑',soundOff:'Sound off',soundOn:'Sound on',soundLabel:'Toggle background music',wishLabel:'Send your wish',closeLabel:'Close photograph',prevLabel:'Previous photograph',nextLabel:'Next photograph',photo:'A little moment',
    qualities:[
      ['Brave','Can đảm','Being brave means taking the next step, even when things feel uncertain and the days are hard. I hope you keep believing in yourself and feel proud of every little step you take.'],
      ['Warm-hearted','Ấm áp','Some people make a place feel like home simply by being there. To me, you are one of those people. I hope you receive all the care and kindness you give to others.'],
      ['Radiant','Rực rỡ','You shine in your own way: through your smile, the things you love, and the life you make for yourself. I hope you trust that light and give yourself every chance to be happy.']
    ],
    letter:[
      'I wish you good health, restful nights, and mornings when your heart feels light.',
      'May Katie have plenty of good news at work, and may Tợp enjoy more fun days out, delicious food, and unforgettable trips. May your hard work pay off, and may the things you’re hoping for arrive at just the right time.',
      'I hope you feel deeply loved, feel free to be yourself, and always have someone to share both the happy moments and the tiring days with.',
      'Here’s to another year of feeling beautiful and finding even more reasons to smile. As for me calling you Tợp… that tradition is definitely staying :))',
      'Love you, sis. Here’s to a beautiful year ahead.'
    ]
  }
};
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold: .12});
const observeReveals = () => $$('.reveal:not(.visible)').forEach(el => observer.observe(el));
[0,17,34,49].forEach((index,i) => {
  const frame = document.createElement('div');
  frame.className = 'floating-photo';
  frame.innerHTML = `<img src="${photos[index]}" alt="" ${i > 1 ? 'loading="lazy"' : 'fetchpriority="high"'}><span class="photo-number">A LITTLE MOMENT · ${String(index + 1).padStart(2,'0')}</span>`;
  $('.hero-photos').append(frame);
});
[4,24,18].forEach((index,i) => {
  const section = document.createElement('section');
  section.className = 'quality';
  section.innerHTML = `<div class="quality-image reveal"><img src="${photos[index]}" alt="" loading="lazy" decoding="async"><span class="image-star" aria-hidden="true">✧</span></div><div class="quality-text reveal"><p class="quality-label">0${i+1} / <span>FOR YOU</span></p><h3></h3><span class="quality-translation"></span><p class="quality-copy"></p><span class="quality-line"></span></div>`;
  $('#qualities').append(section);
});
let galleryExpanded = false;
function renderGallery() {
  $('#gallery').replaceChildren();
  photos.slice(0, galleryExpanded ? photos.length : 12).forEach((src,index) => {
    const button = document.createElement('button');
    button.className = 'memory';
    button.innerHTML = `<img src="${src}" loading="lazy" decoding="async" alt="${copy[language].photo} ${index+1}"><span>15.11.2026 · ${String(index+1).padStart(2,'0')} / 57</span>`;
    button.addEventListener('click',() => openPhoto(index));
    $('#gallery').append(button);
  });
  $('#more-photos span:first-child').textContent = copy[language][galleryExpanded ? 'lessPhotos' : 'morePhotos'];
  $('#more-photos span:last-child').textContent = galleryExpanded ? '−' : '＋';
  $('#more-photos').setAttribute('aria-expanded',String(galleryExpanded));
}
function translate() {
  const t = copy[language];
  document.documentElement.lang = language;
  document.title = language === 'vi' ? 'Một vũ trụ nhỏ dành cho Tợp · 15.11.2026' : 'A Little Universe for Katie · 15.11.2026';
  $$('[data-i18n]').forEach(el => { if (t[el.dataset.i18n]) el.innerHTML = t[el.dataset.i18n]; });
  $$('.quality').forEach((el,i) => {
    el.querySelector('h3').textContent = t.qualities[i][0];
    el.querySelector('.quality-translation').textContent = t.qualities[i][1];
    el.querySelector('.quality-copy').textContent = t.qualities[i][2];
    el.querySelector('.quality-image img').alt = `${t.photo} · ${t.qualities[i][0]}`;
    el.querySelector('.quality-label span').textContent = language === 'vi' ? 'DÀNH CHO CHỊ' : 'FOR YOU';
  });
  $('#letter-body').innerHTML = t.letter.map(p=>`<p>${p}</p>`).join('');
  $$('[data-lang]').forEach(el => { el.classList.toggle('active',el.dataset.lang === language); el.setAttribute('aria-pressed',String(el.dataset.lang === language)); });
  $('.lightbox-close').setAttribute('aria-label',t.closeLabel);
  $('.lightbox-prev').setAttribute('aria-label',t.prevLabel);
  $('.lightbox-next').setAttribute('aria-label',t.nextLabel);
  if (wished) $('#wish-message').textContent = t.wishSent;
  renderGallery();
  if ($('#lightbox').open) showPhoto();
  window.dispatchEvent(new Event('birthday-language'));
}
$$('[data-lang]').forEach(button => button.addEventListener('click',() => {
  language = button.dataset.lang;
  try { localStorage.setItem('katie-language',language); } catch {}
  translate();
}));
$('#more-photos').addEventListener('click',() => {
  galleryExpanded = !galleryExpanded;
  const top = $('#memories').offsetTop;
  renderGallery();
  if (!galleryExpanded) window.scrollTo({top:top-80,behavior:reducedMotion.matches?'instant':'smooth'});
});
let photoIndex = 0;
function showPhoto() {
  $('#lightbox img').src = photos[photoIndex];
  $('#lightbox img').alt = `${copy[language].photo} ${photoIndex+1}`;
  $('#lightbox figcaption').textContent = `${String(photoIndex+1).padStart(2,'0')} / 57 · LÊ NHƯ HOÀI`;
}
function openPhoto(index) {
  photoIndex = index; showPhoto(); $('#lightbox').showModal(); document.body.style.overflow = 'hidden';
}
function stepPhoto(step) { photoIndex = (photoIndex + step + photos.length) % photos.length; showPhoto(); }
$('.lightbox-close').addEventListener('click',()=>$('#lightbox').close());
$('.lightbox-prev').addEventListener('click',()=>stepPhoto(-1));
$('.lightbox-next').addEventListener('click',()=>stepPhoto(1));
$('#lightbox').addEventListener('close',()=> { document.body.style.overflow = ''; });
$('#lightbox').addEventListener('click',event => { if(event.target === $('#lightbox')) { const r = event.target.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) event.target.close(); } });
document.addEventListener('keydown',event => { if($('#lightbox').open) { if(event.key==='ArrowLeft') stepPhoto(-1); if(event.key==='ArrowRight') stepPhoto(1); } });
let touchStart = 0;
$('#lightbox').addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX;},{passive:true});
$('#lightbox').addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>50)stepPhoto(delta>0?-1:1);},{passive:true});

// A quiet, original music-box loop. Audio begins only after a deliberate click.
let audioContext, musicTimer, musicOn = false;
const melody = [523.25,659.25,783.99,659.25,587.33,698.46,880,783.99,659.25,523.25,587.33,698.46,659.25,523.25,493.88,523.25];
function chime(frequency,when,volume=.055) {
  const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain();
  oscillator.type='sine'; oscillator.frequency.value=frequency;
  gain.gain.setValueAtTime(0,when); gain.gain.linearRampToValueAtTime(volume,when+.018); gain.gain.exponentialRampToValueAtTime(.0001,when+2.4);
  oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(when); oscillator.stop(when+2.5);
}
function playPhrase() {
  const start=audioContext.currentTime+.08;
  melody.forEach((note,i)=> { chime(note,start+i*.65); if(i%4===0) chime(note/2,start+i*.65,.025); });
}
// Try autoplay, then unlock on the first browser-authorized interaction.
// Repeated calls resume the same context and never create duplicate music loops.
async function startBackgroundMusic() {
  try {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();
    if (musicOn || audioContext.state !== 'running') return;
    musicOn = true;
    playPhrase();
    musicTimer = setInterval(() => {
      if (audioContext.state === 'running' && !document.hidden) playPhrase();
    }, 11400);
  } catch { /* Autoplay may wait for the next user gesture. */ }
}
window.addEventListener('pointerdown', startBackgroundMusic, { passive: true });
window.addEventListener('keydown', startBackgroundMusic);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) startBackgroundMusic();
});
function celebrateWish(withConfetti = true) {
  wished=true; $('.wish-section').classList.add('wish-sent'); $('#wish-message').textContent=copy[language].wishSent;
  if(musicOn) [523.25,659.25,783.99,1046.5].forEach((n,i)=>chime(n,audioContext.currentTime+i*.15));
  if(reducedMotion.matches || !withConfetti)return;
  for(let i=0;i<85;i++) {
    const confetti=document.createElement('i'); confetti.className='confetti';
    confetti.style.cssText=`left:${Math.random()*100}%;background:${['#d1b9df','#c6af87','#f0d8da','#b7c7bb','#e6def0'][i%5]};--duration:${3+Math.random()*3}s;--drift:${(Math.random()-.5)*300}px;animation-delay:${Math.random()*.8}s;border-radius:${i%3===0?'50%':'1px'}`;
    document.body.append(confetti); confetti.addEventListener('animationend',()=>confetti.remove());
  }
}

// Perspective projection gives the ambient stars real depth without a large library.
const canvas=$('#universe'); const ctx=canvas.getContext('2d');
let width=innerWidth,height=innerHeight,dpr=Math.min(devicePixelRatio||1,2),scrollY=window.scrollY,pointerX=0,pointerY=0,frameId;
const stars=Array.from({length:100},()=>({x:(Math.random()-.5)*2600,y:(Math.random()-.5)*2200,z:Math.random()*1400+300,r:Math.random()*1.6+.5,phase:Math.random()*Math.PI*2}));
function resize() { width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);if(reducedMotion.matches)drawStars(0); }
function drawStars(time) {
  ctx.clearRect(0,0,width,height);
  stars.forEach(star=> {
    const depth=900/(star.z+600);const shift=reducedMotion.matches?0:scrollY*.075+time*.003;
    const x=width/2+(star.x+pointerX*30)*depth;
    const y=((height/2+(star.y-shift+pointerY*20)*depth)%(height+100)+height+100)%(height+100)-50;
    const alpha=.15+(Math.sin(time*.0007+star.phase)+1)*.16;
    ctx.fillStyle=`rgba(151,125,164,${alpha})`;ctx.beginPath();ctx.arc(x,y,star.r*depth,0,Math.PI*2);ctx.fill();
    if(star.r>1.7){ctx.strokeStyle=`rgba(166,140,178,${alpha*.8})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}
  });
}
function tick(time) {
  drawStars(time);
  window.BirthdayEffects?.update(time);
  if(!reducedMotion.matches && scrollY<innerHeight*1.5) {
    $$('.floating-photo').forEach((photo,i)=>{photo.style.transform=`translate3d(${pointerX*(i%2?10:-10)}px,${scrollY*(i%2?.09:-.07)+Math.sin(time*.0006+i)*8}px,${pointerY*12}px) rotate(${[-12,12,9,-9][i]}deg)`;});
  }
  frameId=requestAnimationFrame(tick);
}
window.addEventListener('scroll',()=>{scrollY=window.scrollY;const total=document.documentElement.scrollHeight-innerHeight;$('.progress').style.width=`${total>0?scrollY/total*100:0}%`;},{passive:true});
window.addEventListener('pointermove',event=>{pointerX=(event.clientX/width-.5)*2;pointerY=(event.clientY/height-.5)*2;},{passive:true});
window.addEventListener('resize',resize,{passive:true});
function startAnimation(){cancelAnimationFrame(frameId);if(reducedMotion.matches){$$('.floating-photo').forEach(p=>p.style.transform='');drawStars(0);}else frameId=requestAnimationFrame(tick);}
reducedMotion.addEventListener('change',startAnimation);
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(frameId);else startAnimation();});
translate();observeReveals();resize();startAnimation();startBackgroundMusic();
