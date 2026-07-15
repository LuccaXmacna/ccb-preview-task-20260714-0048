const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('#primary-nav');
const searchButton = document.querySelector('[data-search-toggle]');
const searchPanel = document.querySelector('#search-panel');
const searchInput = document.querySelector('#site-search');
const liveRegion = document.querySelector('[data-live-region]');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu principal' : 'Abrir menu principal');
});

searchButton?.addEventListener('click', () => {
  const open = searchPanel.hidden;
  searchPanel.hidden = !open;
  searchButton.setAttribute('aria-expanded', String(open));
  if (open) searchInput.focus();
});

document.addEventListener('click', event => {
  const current = event.target.closest('.nav-group');
  document.querySelectorAll('.nav-group[open]').forEach(group => {
    if (group !== current && !group.contains(event.target)) group.removeAttribute('open');
  });
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.nav-group[open]').forEach(group => group.removeAttribute('open'));
  if (!searchPanel.hidden) {
    searchPanel.hidden = true;
    searchButton.setAttribute('aria-expanded', 'false');
    searchButton.focus();
  }
  if (nav.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu principal');
    menuButton.focus();
  }
});

const prayerDialog = document.querySelector('[data-prayer-dialog]');
document.querySelector('[data-prayer-open]')?.addEventListener('click', () => prayerDialog.showModal());
document.querySelectorAll('[data-prayer-close]').forEach(button => button.addEventListener('click', () => prayerDialog.close()));
prayerDialog?.addEventListener('click', event => {
  const bounds = prayerDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) prayerDialog.close();
});

const cookieBanner = document.querySelector('[data-cookie-banner]');
const closeCookieBanner = choice => {
  cookieBanner.hidden = true;
  liveRegion.textContent = choice === 'accepted' ? 'Preferência de cookies aceita nesta prévia.' : 'Cookies não essenciais rejeitados nesta prévia.';
};
document.querySelector('[data-cookie-accept]')?.addEventListener('click', () => closeCookieBanner('accepted'));
document.querySelector('[data-cookie-reject]')?.addEventListener('click', () => closeCookieBanner('rejected'));

const desktopQuery = window.matchMedia('(min-width: 981px)');
desktopQuery.addEventListener('change', event => {
  if (event.matches) {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu principal');
  }
});
