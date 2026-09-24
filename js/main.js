const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#main-nav');
const cursor = document.querySelector('.cursor');
const serviceList = document.querySelector('.service-list');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('mobile-open');
  menu.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

document.querySelector('.service-arrow--prev').addEventListener('click', () => moveServices(-1));
document.querySelector('.service-arrow--next').addEventListener('click', () => moveServices(1));

function moveServices(direction) {
  const card = serviceList.querySelector('.service-card');
  serviceList.scrollBy({ left: direction * (card.getBoundingClientRect().width + 12), behavior: 'smooth' });
}

serviceList.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') moveServices(-1);
  if (event.key === 'ArrowRight') moveServices(1);
});

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (matchMedia('(pointer:fine)').matches && window.gsap) {
  window.addEventListener('mousemove', event => gsap.to(cursor, { x: event.clientX - 5, y: event.clientY - 5, duration: .18 }));
}

if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const timeline = gsap.timeline();
  timeline.to('.loader__line i', { width: '100%', duration: .75, ease: 'power2.inOut' })
    .to('.loader__logo', { scale: 1.08, duration: .25, ease: 'power2.out' })
    .to('.loader', { yPercent: -100, duration: .75, ease: 'power4.inOut' })
    .from('.hero h1 span', { yPercent: 110, stagger: .12, duration: 1, ease: 'power4.out' }, '-=.25')
    .from('.hero .eyebrow,.hero__bottom', { opacity: 0, y: 20, stagger: .1, duration: .6 }, '-=.55');

  gsap.to('.hero__media', { scale: 1.13, yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.utils.toArray('.section-head,.barber-card,.service-card,.contacts>a').forEach(element => {
    gsap.from(element, { opacity: 0, y: 42, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 90%', once: true } });
  });
} else {
  document.querySelector('.loader').remove();
}

setTimeout(() => {
  const loader = document.querySelector('.loader');
  if (loader && !window.gsap) loader.remove();
}, 1200);
