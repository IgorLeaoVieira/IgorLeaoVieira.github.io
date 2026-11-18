/* ============ CONTROLE DA CONTRACAPA ============ */
const cover    = document.getElementById('cover');
const site     = document.getElementById('site');
const enterBtn = document.getElementById('enterBtn');

document.body.classList.add('no-scroll');

function enterSite() {
  if (cover.classList.contains('hidden')) return;
  cover.classList.add('hidden'); 
  document.body.classList.remove('no-scroll');
  setTimeout(() => site.classList.add('visible'), 250);
  window.scrollTo({ top: 0 });
}

// Clique em qualquer lugar da contracapa
cover.addEventListener('click', enterSite);

// Tecla Enter / Espaço / OK
window.addEventListener('keydown', (e) => {
  if (cover.classList.contains('hidden')) return;
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'OK') {
    e.preventDefault();
    enterSite();
  }
});

/* ============ TEMA CLARO/ESCURO ============ */
const themeToggle = document.getElementById('themeToggle');
const root        = document.documentElement;
const savedTheme  = localStorage.getItem('theme');

if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ============ MENU MOBILE ============ */
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ============ SCROLL SPY (link ativo) ============ */
const sections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ============ NAVBAR SCROLL ============ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'var(--bg-soft)';
    navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
  } else {
    navbar.style.background = '';
    navbar.style.boxShadow = '';
  }
});

/* ============ ANIMAÇÃO REVEAL ============ */
const revealElements = document.querySelectorAll('.card, .prof-card, .gallery-item, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(30px)';
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

/* ============ FORMULÁRIO ============ */
const form         = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formFeedback.style.color = '#f87171';
    formFeedback.textContent = 'Preencha todos os campos 🙂';
    return;
  }

  // Aqui abre o cliente de e-mail
   const mailto = `mailto:igorleaovieira66@gmail.com?subject=${encodeURIComponent('Contato do site — ' + name)}&body=${encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')')}`;

  formFeedback.style.color = '#34d399';
  formFeedback.textContent = 'Abrindo seu app de e-mail... ✉️';
  form.reset();

  setTimeout(() => { formFeedback.textContent = ''; }, 5000);
});

/* ============ ANO NO FOOTER ============ */
document.getElementById('year').textContent = new Date().getFullYear();