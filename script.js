const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const phrases=['Embedded Systems Enthusiast','IoT Developer','PCB Designer'];
const typingText=document.getElementById('typingText');
let p=0,i=0,deleting=false;
function type(){const word=phrases[p];typingText.textContent=deleting?word.slice(0,i--):word.slice(0,i++);let delay=deleting?45:80;if(!deleting&&i>word.length){deleting=true;delay=1300}if(deleting&&i<0){deleting=false;p=(p+1)%phrases.length;i=0;delay=300}setTimeout(type,delay)} type();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;if(el.dataset.done)return;el.dataset.done='1';const target=parseFloat(el.dataset.count), decimal=el.dataset.decimal?Number(el.dataset.decimal):0;let start=0;const step=target/45;const tick=()=>{start=Math.min(start+step,target);el.textContent=start.toFixed(decimal);if(start<target)requestAnimationFrame(tick)};tick()}),{threshold:.7});
counters.forEach(c=>counterObserver.observe(c));

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(card=>{const cats=card.dataset.category.split(' ');card.classList.toggle('hidden',filter!=='all'&&!cats.includes(filter))})}));

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('name').value.trim();
  const em=document.getElementById('email').value.trim();
  const m=document.getElementById('message').value.trim();
  const subject=encodeURIComponent(`Portfolio Contact from ${n}`);
  const body=encodeURIComponent(`Hi Ajith,\n\nName: ${n}\nEmail: ${em}\n\nMessage:\n${m}`);
  document.getElementById('formNote').textContent='Opening your email app...';
  window.location.href=`mailto:ajiajith95667@gmail.com?subject=${subject}&body=${body}`;
});

window.addEventListener('scroll',()=>{const h=document.documentElement;const progress=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;document.getElementById('progressBar').style.width=`${progress}%`;});
