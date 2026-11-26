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

cover.addEventListener('click', enterSite);

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
const navLinksMenu = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinksMenu.classList.remove('open');
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

  const mailto = `mailto:igorleaovieira66@gmail.com?subject=${encodeURIComponent('Contato do site — ' + name)}&body=${encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')')}`;

  formFeedback.style.color = '#34d399';
  formFeedback.textContent = 'Abrindo seu app de e-mail... ✉️';
  form.reset();

  setTimeout(() => { formFeedback.textContent = ''; }, 5000);
});

/* ============ ANO NO FOOTER ============ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================
   NAVBAR BARALHO — distribuir + flip ao clicar
============================================ */
(function () {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  const links = Array.from(navLinks.querySelectorAll('.nav-link'));

  function distribuirCartas() {
    navLinks.classList.add('distribuindo');
    setTimeout(() => navLinks.classList.remove('distribuindo'), 1300);
  }

  function tentarDistribuir() {
    if (!site) return distribuirCartas();
    const visivel = getComputedStyle(site).display !== 'none';
    if (visivel) setTimeout(distribuirCartas, 500);
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', () => setTimeout(distribuirCartas, 600));
  }
  window.addEventListener('load', () => setTimeout(tentarDistribuir, 400));

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const alvo = document.querySelector(href);
      if (!alvo) return;

      e.preventDefault();

      link.classList.add('virando');
      setTimeout(() => link.classList.remove('virando'), 600);

      setTimeout(() => {
        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 280);

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
})();

/* ============================================
   MASCOTE KIARA & MENU LIVRO
============================================ */
(function() {
  const kiaraBtn = document.getElementById('kiaraBtn'); // A flutuante
  const kiaraBtnSobre = document.getElementById('kiaraBtnSobre'); // A do sobre mim
  const kiaraMenu = document.getElementById('kiara-menu');
  const livroOverlay = document.getElementById('livro-overlay');
  const kiaraLivro = document.getElementById('kiara-livro');
  const fecharLivro = document.getElementById('fecharLivro');
  const livroContent = document.getElementById('livroContent');

  if (!kiaraBtn && !kiaraBtnSobre) return;

  const historias = {
    historia: `
      <h2>📖 A História da Kiara</h2>
      <p>A Kiara é uma Chitsu cheia de personalidade! Ela tem o costume mais fofo do mundo: adora ficar em pé, andando com as duas patinhas pra frente quando quer comer e quando me ver. E claro, sempre com aquele sorriso de orelha a orelha.</p>
      <div class="livro-fotos">
        <img src="img/img4k.jpg" alt="Kiara andando com duas patas">
        <img src="img/img5k.jpg" alt="Kiara sorrindo">
      </div>
    `,
    gostos: `
      <h2>🍖 O que ela ama</h2>
      <p>Se depender da Kiara, o mundo seria feito de frango desfiado, colo e brincadeiras. Ela é super ciumenta com o dono e ama receber carinho. Quando está feliz, ela se joga de barriga pra cima e fica rindo desse jeito!</p>
      <div class="livro-fotos">
        <img src="img/img6k.jpg" alt="Kiara de barriga pra cima rindo">
        <img src="img/img7k.jpg" alt="Kiara relaxando">
      </div>
    `,
    travessuras: `
      <h2>😈 Travessuras</h2>
      <p>Ela não é de ficar quieta! Já foi flagrada aprontando, tirando um cochilo no lugar mais inusitado possível (como debaixo de móveis) e até latindo pro carteiro. É impossível ficar bravo com essa carinha de laço amarelo!</p>
      <div class="livro-fotos">
        <img src="img/img8k.jpg" alt="Kiara aprontando">
        <img src="img/img9k.jpg" alt="Kiara descansando">
      </div>
    `
  };

  // 1. Abrir/Fechar menu ao clicar na Kiara
  function toggleMenu(e) {
    e.stopPropagation();
    kiaraMenu.classList.toggle('aberto');
  }

  if (kiaraBtn) kiaraBtn.addEventListener('click', toggleMenu);
  if (kiaraBtnSobre) kiaraBtnSobre.addEventListener('click', toggleMenu);

  // 2. Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    const isClickInBtn = (kiaraBtn && kiaraBtn.contains(e.target)) || (kiaraBtnSobre && kiaraBtnSobre.contains(e.target));
    if (!kiaraMenu.contains(e.target) && !isClickInBtn) {
      kiaraMenu.classList.remove('aberto');
    }
  });

  // 3. Abrir o livrinho ao clicar em uma opção
  document.querySelectorAll('.menu-opcao').forEach(opcao => {
    opcao.addEventListener('click', () => {
      const target = opcao.getAttribute('data-target');
      livroContent.innerHTML = historias[target];
      
      kiaraMenu.classList.remove('aberto');
      livroOverlay.classList.add('ativo');
      kiaraLivro.classList.add('aberto');
    });
  });

  // 4. Fechar o livrinho
  function fecharTudo() {
    livroOverlay.classList.remove('ativo');
    kiaraLivro.classList.remove('aberto');
  }

  fecharLivro.addEventListener('click', fecharTudo);
  livroOverlay.addEventListener('click', fecharTudo);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharTudo();
  });
})();

/* ============================================
   MODAL DE DETALHES DOS QUADROS (SOBRE MIM)
============================================ */
(function() {
  const detalheOverlay = document.getElementById('detalhe-overlay');
  const detalheModal = document.getElementById('detalhe-modal');
  const fecharDetalhe = document.getElementById('fecharDetalhe');
  const detalheContent = document.getElementById('detalheContent');

  if (!detalheModal) return;

  // Textos que vão aparecer ao clicar em cada quadro
  const detalhes = {
    foco: `
      <h2>🎯 Foco: Infraestrutura</h2>
      <p>Meu foco principal de estudos e carreira é a infraestrutura de TI. Estou me dedicando a entender como os sistemas, servidores e redes funcionam por trás dos panos.</p>
      <p>Quero dominar desde a configuração de servidores Linux até a arquitetura de redes complexas, garantindo que tudo funcione de forma estável, segura e eficiente.</p>
      <ul>
        <li>Estudos em Linux e Windows Server</li>
        <li>Fundamentos de Cloud (AWS e Azure)</li>
        <li>Automação com scripts (Python e Bash)</li>
      </ul>
    `,
    meta: `
      <h2>🌍 Meta: Morar fora</h2>
      <p>Meu maior sonho é construir minha carreira internacionalmente. Tenho como destino principal a <strong>Espanha</strong> ou os <strong>Estados Unidos</strong>.</p>
      <p>Para isso, estou focado em aprender inglês e espanhol, além de buscar certificações internacionais que são valorizadas no mercado de infraestrutura.</p>
      <p>Acredito que morar fora vai me proporcionar crescimento profissional e pessoal, além de me permitir conhecer novas culturas e expandir minha visão de mundo.</p>
    `,
    semestre: `
      <h2>📚 2º semestre</h2>
      <p>Atualmente estou no 2º semestre do curso de <strong>Tecnólogo em TI</strong>. Mesmo no início da jornada, estou aproveitando ao máximo cada disciplina e buscando conhecimento além da sala de aula.</p>
      <p>Tenho me dedicado a projetos pessoais e laboratórios para aplicar na prática o que aprendo na faculdade, pois acredito que a prática é essencial para a formação de um bom profissional.</p>
      <p>Minha meta é terminar o curso com um portfólio sólido e experiência prática que me destaquem no mercado.</p>
    `,
    seguranca: `
      <h2>🛡️ Segurança de Redes</h2>
      <p>A segurança de redes é uma das minhas maiores paixões na área de TI. Estou estudando para me tornar um especialista em proteger sistemas e dados contra ameaças.</p>
      <p>Tenho interesse em atuar com SOC (Security Operations Center) e NOC (Network Operations Center), monitorando e respondendo a incidentes de segurança em tempo real.</p>
      <ul>
        <li>Firewalls (Fortinet, pfSense)</li>
        <li>VPNs e controle de acesso</li>
        <li>Análise de logs e SIEM</li>
      </ul>
    `
  };

  // Função para abrir o modal
  function abrirDetalhe(target) {
    detalheContent.innerHTML = detalhes[target];
    detalheOverlay.classList.add('ativo');
    detalheModal.classList.add('aberto');
  }

  // Função para fechar o modal
  function fecharDetalheModal() {
    detalheOverlay.classList.remove('ativo');
    detalheModal.classList.remove('aberto');
  }

  // 1. Adicionar evento de clique em todos os quadros (menos o da Kiara)
  document.querySelectorAll('.sobre-stat[data-target]').forEach(quadro => {
    quadro.addEventListener('click', () => {
      const target = quadro.getAttribute('data-target');
      abrirDetalhe(target);
    });
  });

  // 2. Fechar o modal ao clicar no botão "Fechar"
  fecharDetalhe.addEventListener('click', fecharDetalheModal);

  // 3. Fechar ao clicar no fundo escuro
  detalheOverlay.addEventListener('click', fecharDetalheModal);

  // 4. Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharDetalheModal();
  });
})();
