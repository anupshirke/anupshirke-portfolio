
// Prevent Ctrl+S / Cmd+S (Save Page)
window.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('anup-theme', next);
  updateIcon(next);
}
function updateIcon(theme){
  const el = document.getElementById('themeIcon');
  if(!el) return;
  el.textContent = theme === 'dark' ? '☀' : '☾';
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
async function loadFooter(){
  const footer = document.getElementById('site-footer');
  if(!footer) return;

  const response = await fetch('footer.html');
  if(!response.ok){
    throw new Error(`Footer request failed: ${response.status}`);
  }
  footer.innerHTML = await response.text();
}
loadFooter().catch(error => console.error('Unable to load footer:', error));
(function(){
  const saved = localStorage.getItem('anup-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', saved);
  document.addEventListener('DOMContentLoaded', ()=>updateIcon(saved));
})();
