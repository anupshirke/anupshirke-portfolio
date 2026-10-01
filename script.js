// Prevent Ctrl+S / Cmd+S (Save Page)
window.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);

let pointerFrame;
let pointerX = 0;
let pointerY = 0;
window.addEventListener('pointermove', event => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (pointerFrame) return;

  pointerFrame = window.requestAnimationFrame(() => {
    const root = document.documentElement;
    root.style.setProperty('--mouse-x', `${pointerX}px`);
    root.style.setProperty('--mouse-y', `${pointerY}px`);
    pointerFrame = null;
  });
}, { passive: true });

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('anup-theme', next);
  updateIcon(next);
  updateKursorColor(next);
}
function updateIcon(theme){
  const el = document.getElementById('themeIcon');
  if(!el) return;
  el.textContent = theme === 'dark' ? '☀' : '☾';
}
function updateKursorColor(theme) {
  const cursor = document.querySelector('.kursor');
  if (!cursor) return;

  const color = theme === 'light' ? '#1a1a1a' : '#ffffff';
  cursor.style.borderColor = color;
  cursor.style.backgroundColor = color;
  cursor.style.opacity = '0.5';
}
function toggleMobile(){
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
  const icon = document.getElementById('menuIcon');
  if(nav.classList.contains('open')){
    icon.setAttribute('d','M6 18L18 6M6 6l12 12');
  } else {
    icon.setAttribute('d','M3 12h18M3 6h18M3 18h18');
  }
}
let animationObserver;
function initAnimations(){
  const fadeInElements = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    fadeInElements.forEach(element => element.classList.add('visible'));
    return;
  }

  if (!animationObserver) {
    animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  }

  fadeInElements.forEach(element => {
    if (!element.classList.contains('visible')) {
      animationObserver.observe(element);
    }
  });
}
document.addEventListener('DOMContentLoaded', initAnimations);

function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!(form instanceof HTMLFormElement)) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const botcheck = form.elements.namedItem('botcheck');
    if (botcheck instanceof HTMLInputElement && botcheck.checked) return;

    const name = form.elements.namedItem('name');
    const email = form.elements.namedItem('email');
    const message = form.elements.namedItem('message');
    if (!(name instanceof HTMLInputElement)
      || !(email instanceof HTMLInputElement)
      || !(message instanceof HTMLTextAreaElement)) return;

    const subject = `Portfolio inquiry from ${name.value.trim()}`;
    const body = `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`;
    window.location.href = `mailto:anup.a.shirke@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
document.addEventListener('DOMContentLoaded', initContactForm);

async function fetchComponentHtml(path, componentName){
  const requestUrl = new URL(path, window.location.href);
  if (requestUrl.origin !== window.location.origin) {
    throw new Error(`${componentName} request must use the current origin`);
  }

  const response = await fetch(requestUrl.href, {
    headers: { Accept: 'text/html' }
  });
  if (!response.ok) {
    throw new Error(`${componentName} request failed: ${response.status}`);
  }
  if (response.type !== 'basic') {
    throw new Error(`${componentName} response has an unexpected response type`);
  }

  const responseUrl = new URL(response.url);
  if (responseUrl.origin !== window.location.origin) {
    throw new Error(`${componentName} response came from an external origin`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.split(';', 1)[0].trim().toLowerCase() !== 'text/html') {
    throw new Error(`${componentName} response has an unexpected content type: ${contentType || 'missing'}`);
  }

  return response.text();
}

async function loadHeader(){
  const header = document.getElementById('site-header');
  if(!header) return;

  header.innerHTML = await fetchComponentHtml('/header.html', 'Header');
  initAnimations();

  const normalizePath = pathname => {
    const path = pathname.replace(/\/+$/, '');
    if(!path) return '/index.html';
    if(path.endsWith('/index.html')) return path;
    return path.slice(path.lastIndexOf('/') + 1).includes('.')
      ? path
      : `${path}/index.html`;
  };
  const normalizedCurrentPath = normalizePath(window.location.pathname);
  const navLinks = header.querySelector('.nav-links');
  if(!navLinks) throw new Error('Header markup is missing .nav-links');

  navLinks.querySelectorAll('a[href]').forEach(link => {
    const linkPath = new URL(link.href, window.location.href).pathname;
    link.classList.toggle('active', normalizePath(linkPath) === normalizedCurrentPath);
  });

  updateIcon(localStorage.getItem('anup-theme') || 'dark');
}
loadHeader().catch(error => console.error('Unable to load header:', error));
async function loadFooter(){
  const footer = document.getElementById('site-footer');
  if(!footer) return;

  footer.innerHTML = await fetchComponentHtml('footer.html', 'Footer');
  initAnimations();
}
loadFooter().catch(error => console.error('Unable to load footer:', error));
(function(){
  const saved = localStorage.getItem('anup-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', saved);
  document.addEventListener('DOMContentLoaded', ()=>updateIcon(saved));
})();
document.addEventListener('DOMContentLoaded', () => {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';

  if (typeof kursor !== 'undefined') {
    new kursor({
      type: 1,
      removeDefaultCursor: true,
      color: theme === 'light' ? '#1a1a1a' : '#ffffff'
    });
    updateKursorColor(theme);
  }
});