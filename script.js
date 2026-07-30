const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlEl = document.documentElement;

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    
    if (newTheme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  });
}

let currentLang = 'EN';

const translations = {
  FR: {
    nav_home: 'Accueil',
    nav_projects: 'Projets',
    nav_about: 'À propos',
    nav_contact: 'Contact',
    availability: 'Disponibilité : Projets & Offres',
    user_title: 'Architecte Logiciel & Développeur Full-Stack',
    and_more: 'et +',
    hero_bio: "Développeur Full Stack passionné par l'ingénierie logicielle, spécialisé dans la conception d'applications web d'entreprise, la création d'architectures SaaS évolutives et le développement d'interfaces réactives à forte valeur ajoutée.",
    exp_saas_title: 'Applications Web & SaaS',
    exp_saas_sub: 'Conçues sur-mesure pour vos besoins',
    exp_cyber_title: 'Cybersécurité & CTF',
    exp_cyber_sub: 'Code sécurisé & protection des données',
    exp_shop_title: 'E-Commerce & Boutiques',
    exp_shop_sub: 'Boutiques réactives avec panier en direct',
    exp_corp_title: 'Sites Institutionnels',
    exp_corp_sub: "Portails d'entreprise & vitrines haut de gamme",
    btn_discover: 'Découvrir mes Projets',
    btn_contact: 'Me Contacter',
    tag_projects: 'Portfolio Officiel',
    title_projects_1: 'Mes',
    title_projects_2: 'Projets',
    sub_projects: 'Présentation complète des applications réelles avec leurs technologies et outils effectifs.',
    p1_desc: "Plateforme SaaS moderne d'automatisation des workflows et d'analyse des métriques d'ingénierie en temps réel.",
    p2_type: 'Cyber & Éducation',
    p2_desc: "Plateforme d'apprentissage du code et de la cybersécurité avec interface cyberpunk et canvas Matrix rain.",
    p3_desc: 'Boutique e-commerce cartoon de jouets pour animaux, avec panier réactif en tiroir et barre de livraison.',
    p4_desc: "Plateforme haut de gamme d'avocats d'affaires avec simulateur d'évaluation de préjudice et consultation sous scellé.",
    p5_type: 'Santé & Bien-être',
    p5_desc: "Portail médical d'ostéopathie douce avec sélecteur interactif des maux traités, réservation et FAQ en accordéon.",
    btn_demo: 'Démo Live ↗',
    btn_terminal: 'Terminal ↗',
    btn_shop: 'Boutique ↗',
    btn_consult: 'Consulter ↗',
    btn_portal: 'Voir Portal ↗',
    btn_details: 'Détails',
    tag_about: 'Philosophie',
    title_about: 'L\'Ingénierie au service de l\'expérience',
    lead_about: "Créer une application web ne consiste pas uniquement à écrire des lignes de code. C'est l'art d'harmoniser la performance backend, la sécurité de l'infrastructure et la beauté de l'interface utilisateur.",
    p_about: "Grâce à une approche tactile et moderne, j'offre une expérience visuelle fluide et intuitive, tout en garantissant des temps de réponse ultra-rapides et une maintenabilité totale.",
    tag_contact: 'Contact Direct',
    title_contact_1: 'Discutons de votre',
    title_contact_2: 'Prochain Projet',
    sub_contact: "Besoin d'un développeur full stack pour une application web, un SaaS ou une mission ? Transmettez votre message ci-dessous.",
    ph_name: 'Votre Nom / Société',
    ph_email: 'Adresse Email',
    ph_subject: 'Sujet (ex: Développement SaaS, Refonte Web...)',
    ph_message: 'Décrivez les objectifs de votre projet...',
    btn_submit: 'Envoyer le Message sur WhatsApp',
    btn_launch: 'Lancer la Démo Live ↗',
    btn_close: 'Fermer',
    footer_rights: '© 2026 Ethann Wantiez • Développeur Full Stack',
    footer_sub: 'Conçu avec précision & passion sur Windows Desktop.',
    tech_title: 'Technologies & Outils Réels Utilisés :'
  },
  EN: {
    nav_home: 'Home',
    nav_projects: 'Projects',
    nav_about: 'About',
    nav_contact: 'Contact',
    availability: 'Available for Projects & Roles',
    user_title: 'Software Architect & Full-Stack Developer',
    and_more: 'and more',
    hero_bio: 'Full Stack Developer passionate about software engineering, specializing in enterprise web applications, scalable SaaS architectures, and high-performance reactive interfaces.',
    exp_saas_title: 'Web & SaaS Applications',
    exp_saas_sub: 'Tailor-made for your business needs',
    exp_cyber_title: 'Cybersecurity & CTF',
    exp_cyber_sub: 'Secure code & data protection',
    exp_shop_title: 'E-Commerce & Digital Shops',
    exp_shop_sub: 'Interactive stores with live cart drawer',
    exp_corp_title: 'Corporate & Business Portals',
    exp_corp_sub: 'High-end enterprise portals & showcases',
    btn_discover: 'Discover My Projects',
    btn_contact: 'Get in Touch',
    tag_projects: 'Official Portfolio',
    title_projects_1: 'Featured',
    title_projects_2: 'Projects',
    sub_projects: 'Full showcase of real-world applications highlighting actual tools and technologies.',
    p1_desc: 'Modern SaaS platform for workflow automation and real-time engineering metrics analysis.',
    p2_type: 'Cyber & Education',
    p2_desc: 'Interactive coding and cybersecurity platform featuring a cyberpunk UI and HTML5 Matrix rain canvas.',
    p3_desc: 'Cartoon e-commerce pet toy store built with a reactive drawer cart and free shipping progress bar.',
    p4_desc: 'Luxury corporate law firm portal featuring a dispute assessment simulator and confidential consultation modal.',
    p5_type: 'Healthcare & Wellness',
    p5_desc: 'Gentle osteopathy medical portal with an interactive symptom selector, online booking, and accordion FAQ.',
    btn_demo: 'Live Demo ↗',
    btn_terminal: 'Terminal ↗',
    btn_shop: 'View Shop ↗',
    btn_consult: 'View Portal ↗',
    btn_portal: 'View Portal ↗',
    btn_details: 'Details',
    tag_about: 'Philosophy',
    title_about: 'Engineering Focused on User Experience',
    lead_about: 'Building a web application is not just about writing lines of code. It is the art of harmonizing backend performance, infrastructure security, and frontend visual excellence.',
    p_about: 'Through a modern tactile design approach, I deliver smooth and intuitive user experiences while ensuring lightning-fast response times and long-term maintainability.',
    tag_contact: 'Direct Contact',
    title_contact_1: 'Let\'s Discuss Your',
    title_contact_2: 'Next Project',
    sub_contact: 'Need a full stack developer for a web application, SaaS platform, or contract role? Send your message below.',
    ph_name: 'Your Name / Company',
    ph_email: 'Email Address',
    ph_subject: 'Subject (e.g. SaaS Development, Web Redesign...)',
    ph_message: 'Describe your project goals...',
    btn_submit: 'Send Message via WhatsApp',
    btn_launch: 'Launch Live Demo ↗',
    btn_close: 'Close',
    footer_rights: '© 2026 Ethann Wantiez • Full Stack Developer',
    footer_sub: 'Crafted with precision & passion on Windows Desktop.',
    tech_title: 'Actual Technologies & Tools Used:'
  }
};

const langToggleBtn = document.getElementById('lang-toggle');
const langCodeEl = document.getElementById('lang-code');

if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'EN' ? 'FR' : 'EN';
    langCodeEl.innerText = currentLang === 'EN' ? 'FR' : 'EN';
    applyLanguage(currentLang);
  });
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

const projectDetails = {
  saas: {
    title: {
      FR: 'FlowPulse — SaaS Analytics & Workflow Engine',
      EN: 'FlowPulse — SaaS Analytics & Workflow Engine'
    },
    desc: {
      FR: 'Plateforme SaaS moderne d\'automatisation des workflows et d\'analyse des performances d\'ingénierie et produit en temps réel. Intègre un calculateur ROI interactif, des graphiques dynamiques et la gestion d\'état LocalStorage.',
      EN: 'Modern SaaS platform for workflow automation and real-time engineering metrics analysis. Features an interactive ROI calculator, dynamic chart simulations, and LocalStorage state management.'
    },
    stack: ['JavaScript ES6+', 'HTML5 / CSS3 System', 'LocalStorage API', 'Calculateur ROI Engine', 'Tabs State Machine', 'CSS Grid & Flexbox'],
    path: 'pro/SaaS/index.html'
  },
  cyber: {
    title: {
      FR: 'ZeroDay // Academy — Hacker & CTF Learning Platform',
      EN: 'ZeroDay // Academy — Hacker & CTF Learning Platform'
    },
    desc: {
      FR: 'Plateforme d\'apprentissage du code et de la cybersécurité avec interface cyberpunk, terminal CLI interactif en Vanilla JS, animation Matrix Canvas HTML5 et effets sonores Web Audio API.',
      EN: 'Interactive coding and cybersecurity learning platform featuring a cyberpunk UI, Vanilla JS interactive CLI terminal, HTML5 Matrix Rain canvas, and Web Audio API sound FX.'
    },
    stack: ['HTML5 Canvas (Matrix Rain)', 'JavaScript ES6+ (Terminal CLI)', 'Web Audio API', 'Cyberpunk CSS System', 'Bac à Sable CTF Engine'],
    path: 'pro/Coding Academy/index.html'
  },
  shop: {
    title: {
      FR: 'PawToon 🐾 — Le Royaume Cartoon des Jouets',
      EN: 'PawToon 🐾 — The Cartoon Toy Kingdom'
    },
    desc: {
      FR: 'Boutique e-commerce cartoon de jouets rigolos pour animaux. Réalisée avec un moteur de panier JS réactif, tiroir coulissant (Cart Drawer), barre de progression de livraison et filtres instantanés sans dépendances lourdes.',
      EN: 'Playful cartoon e-commerce store for pet toys. Built with a reactive JS cart engine, slide-over drawer cart, free shipping progress bar, and instant live filtering.'
    },
    stack: ['Vanilla JS ES6', 'CSS Cartoon Tokens', 'Cart Engine (LocalStorage)', 'Tiroir Drawer Modal', 'Filtres & Recherche Live'],
    path: 'pro/E-Commerce/index.html'
  },
  legal: {
    title: {
      FR: 'Harvey, Vance & Associés — Cabinet d\'Avocats',
      EN: 'Harvey, Vance & Partners — Corporate Law Firm'
    },
    desc: {
      FR: 'Plateforme institutionnelle haut de gamme pour cabinet d\'avocats d\'affaires. Comprend un simulateur d\'évaluation de préjudice en JavaScript, un système de réservation sous scellé et une direction artistique d\'exception.',
      EN: 'High-end institutional web platform for a corporate law firm. Includes an interactive dispute evaluation simulator, confidential consultation booking modal, and luxury design tokens.'
    },
    stack: ['HTML5 Semantic', 'CSS Luxury Variables', 'Simulateur Évaluation Litiges', 'Modal System JS', 'Formulaires de Consultation'],
    path: 'pro/Cabinet Avocat/index.html'
  },
  health: {
    title: {
      FR: 'Cabinet Dr. Julien Laurent D.O. — Ostéopathie Paris 8',
      EN: 'Dr. Julien Laurent D.O. — Medical Osteopathy Clinic'
    },
    desc: {
      FR: 'Portail médical d\'ostéopathie douce et posturologie. Propose un guide interactif des maux traités, un module de prise de rendez-vous, une FAQ en accordéon et des illustrations vectorielles SVG.',
      EN: 'Gentle osteopathy medical portal. Features an interactive symptom selector, online booking appointment modal, accordion FAQ engine, and custom SVG illustrations.'
    },
    stack: ['Healthcare UX Design', 'JavaScript ES6+', 'Sélecteur Interactif de Maux', 'Accordion FAQ Engine', 'SVG Vector Illustrations'],
    path: 'pro/Osthéopathie/index.html'
  }
};

function openProjectModal(key) {
  const p = projectDetails[key];
  if (!p) return;

  const titleText = typeof p.title === 'object' ? p.title[currentLang] : p.title;
  const descText = typeof p.desc === 'object' ? p.desc[currentLang] : p.desc;
  const techTitle = translations[currentLang].tech_title;

  document.getElementById('modal-title').innerText = titleText;
  document.getElementById('modal-body').innerHTML = `
    <p style="margin-bottom: 1.25rem;">${descText}</p>
    <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--cyan-primary);">${techTitle}</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
      ${p.stack.map(s => `<span class="neu-pill">${s}</span>`).join('')}
    </div>
  `;
  document.getElementById('modal-live-btn').href = p.path;

  const modal = document.getElementById('project-modal');
  modal.classList.add('show');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('show');
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !subject || !message) return;

  const formattedText = currentLang === 'FR'
    ? `Bonjour Ethann,\n\nNouveau message depuis votre Portfolio :\n\n👤 *Nom / Société* : ${name}\n📧 *Email* : ${email}\n📌 *Sujet* : ${subject}\n\n💬 *Message* :\n${message}`
    : `Hello Ethann,\n\nNew message from your Portfolio:\n\n👤 *Name / Company*: ${name}\n📧 *Email*: ${email}\n📌 *Subject*: ${subject}\n\n💬 *Message*:\n${message}`;

  const whatsappUrl = `https://wa.me/33615837784?text=${encodeURIComponent(formattedText)}`;
  
  window.open(whatsappUrl, '_blank');
  e.target.reset();
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.neu-nav-btn');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

if (langCodeEl) langCodeEl.innerText = 'FR';
applyLanguage('EN');
