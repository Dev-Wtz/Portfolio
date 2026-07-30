/* ==========================================================================
   HARVEY, VANCE & ASSOCIÉS — MAQUETTE INTERACTIVE (SUITS STYLE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSmoothScroll();
});

/* Navbar scroll effect */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Mobile Menu Toggle */
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu.style.display === 'flex') {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.background = 'rgba(7, 9, 14, 0.98)';
    navMenu.style.padding = '2rem';
    navMenu.style.borderBottom = '1px solid var(--border-gold)';
  }
}

/* Smooth scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function scrollToSimulateur() {
  const elem = document.getElementById('simulateur');
  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ==========================================================================
   CONSULTATION MODAL LOGIC
   ========================================================================== */
function openConsultationModal(partnerName = null) {
  const modal = document.getElementById('consultation-modal');
  modal.classList.add('active');
  
  if (partnerName) {
    const select = document.getElementById('target-partner');
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.includes(partnerName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  modal.classList.remove('active');
}

function handleFormSubmit(e) {
  e.preventDefault();
  const clientName = document.getElementById('client-name').value;
  const partner = document.getElementById('target-partner').value;
  
  closeConsultationModal();
  
  // Show high end notification
  showToast(`Demande confidentielle enregistrée. Un associé (${partner}) vous recontactera sous 2h ouvrées.`);
  document.getElementById('consultation-form').reset();
}

/* Custom Notification Toast */
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.right = '2rem';
  toast.style.background = 'linear-gradient(135deg, #111726 0%, #07090E 100%)';
  toast.style.border = '1px solid var(--gold-primary)';
  toast.style.borderRadius = '8px';
  toast.style.padding = '1.25rem 1.75rem';
  toast.style.color = 'var(--text-main)';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.3)';
  toast.style.zIndex = '3000';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '1rem';
  toast.style.animation = 'fadeIn 0.3s ease';

  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: var(--gold-primary); font-size: 1.5rem;"></i>
    <div>
      <div style="font-family: var(--font-serif); font-weight: 700; color: var(--gold-light); font-size: 1rem;">PROTOCOLE TRANSMIS</div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">${message}</div>
    </div>
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}

/* ==========================================================================
   SIMULATEUR / CASE EVALUATOR LOGIC
   ========================================================================== */
const evaluatorData = {
  step1: null,
  step2: null,
  step3: null
};

function selectOption(step, value, element) {
  evaluatorData[`step${step}`] = value;
  
  // Update visual selection
  const parentGrid = element.parentElement;
  parentGrid.querySelectorAll('.option-card').forEach(card => {
    card.classList.remove('selected');
  });
  element.classList.add('selected');
}

function nextStep(stepNumber) {
  // Validate current step
  const prevStep = stepNumber - 1;
  if (!evaluatorData[`step${prevStep}`]) {
    alert("Veuillez sélectionner une option avant de continuer.");
    return;
  }

  // Update dots
  document.querySelectorAll('.eval-step-dot').forEach((dot, idx) => {
    if (idx + 1 === stepNumber) {
      dot.classList.add('active');
    } else if (idx + 1 < stepNumber) {
      dot.classList.add('completed');
    }
  });

  // Hide all contents and show target
  document.querySelectorAll('.eval-step-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`step-${stepNumber}`).classList.add('active');
}

function prevStep(stepNumber) {
  document.querySelectorAll('.eval-step-dot').forEach((dot, idx) => {
    if (idx + 1 > stepNumber) {
      dot.classList.remove('active', 'completed');
    }
  });

  document.querySelectorAll('.eval-step-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`step-${stepNumber}`).classList.add('active');
}

function calculateResult() {
  if (!evaluatorData.step3) {
    alert("Veuillez sélectionner l'urgence avant de valider.");
    return;
  }

  document.getElementById('summary-domain').textContent = evaluatorData.step1 || "Contentieux";
  document.getElementById('summary-amount').textContent = evaluatorData.step2 || "Enjeu majeur";
  
  nextStep(4);
}

function resetEvaluator() {
  evaluatorData.step1 = null;
  evaluatorData.step2 = null;
  evaluatorData.step3 = null;

  document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  document.querySelectorAll('.eval-step-dot').forEach(dot => dot.classList.remove('active', 'completed'));
  document.getElementById('dot-1').classList.add('active');

  document.querySelectorAll('.eval-step-content').forEach(content => content.classList.remove('active'));
  document.getElementById('step-1').classList.add('active');
}

function openConsultationModalWithData() {
  openConsultationModal();
  const textarea = document.getElementById('case-description');
  textarea.value = `[DIAGNOSTIC SIMULATEUR AUTOMATIQUE]\nDomaine: ${evaluatorData.step1}\nEnjeu: ${evaluatorData.step2}\nUrgence: ${evaluatorData.step3}\n\nNotes additionnelles du client: `;
}

/* ==========================================================================
   EXPERTISE MODAL DETAILS
   ========================================================================== */
const expertiseDetails = {
  "Contentieux d'Affaires": {
    title: "Contentieux d'Affaires Complex & Arbitrage",
    icon: "fa-briefcase",
    desc: "Gestion stratégique des affrontements judiciaires à haut risque entre actionnaires, groupes industriels et partenaires commerciaux.",
    points: [
      "Conflits d'actionnaires & gouvernance de crise",
      "Procédures d'urgence en référé d'heure à heure & saisies conservatoires",
      "Arbitrage international CCI, CIRDI et ad hoc",
      "Rupture brutale de relations commerciales et concurrence déloyale"
    ],
    partner: "Me Alexandre Harvey"
  },
  "M&A & Private Equity": {
    title: "Fusion-Acquisition & Ingénierie M&A",
    icon: "fa-building-columns",
    desc: "Accompagnement de haut niveau pour les acquisitions stratégiques, levées de fonds et restructurations de groupes.",
    points: [
      "Audit juridique d'acquisition et cartographie des risques cachés",
      "Négociation de garanties d'actif et de passif (GAP) ultra-protectrices",
      "Structuring de carve-out et LBO d'envergure",
      "Défense contre les tentatives d'OPA hostiles"
    ],
    partner: "Me Alexandre Harvey"
  },
  "Pénal des Affaires": {
    title: "Pénal des Affaires & Cellule de Crise",
    icon: "fa-user-shield",
    desc: "Intervention d'urgence 24/7 lors de perquisitions, gardes à vue et enquêtes judiciaires visant les dirigeants.",
    points: [
      "Assistance immédiate lors de perquisitions AMF & Brigade Financière",
      "Défense contre les accusations de blanchiment, abus de biens sociaux et corruption",
      "Gestion de la communication de crise judiciaire",
      "Audits de compliance et prévention des risques pénaux (Loi Sapin II)"
    ],
    partner: "Me Victoria Vance"
  },
  "Ingénierie Patrimoniale": {
    title: "Ingénierie Patrimoniale & Family Office",
    icon: "fa-gem",
    desc: "Protection stratégique et gouvernance transfrontalière du patrimoine des grandes familles d'entrepreneurs.",
    points: [
      "Structuring de fiducies et trusts internationaux",
      "Transmission d'entreprises familiales sous Pacte Dutreil",
      "Contentieux successoral complexe à hauts enjeux",
      "Gouvernance et pactes de famille sur mesure"
    ],
    partner: "Me Victoria Vance"
  },
  "Négociation d'Urgence": {
    title: "Négociation Sous Haute Pression",
    icon: "fa-handshake-slash",
    desc: "Sortie de crise en position de force lors de négociations bloquées ou sous chantage d'affaires.",
    points: [
      "Rattrapage d'accords compromis avant procédure judiciaire",
      "Utilisation de la pression réglementaire et réputationnelle",
      "Médiation internationale confidentielle",
      "Verrouillage d'accords transactionnels confidentiels avec indemnités fermes"
    ],
    partner: "Me Alexandre Harvey"
  },
  "Propriété Intellectuelle": {
    title: "Propriété Intellectuelle & Secrets d'Affaires",
    icon: "fa-microchip",
    desc: "Défense des actifs immatériels, brevets critiques et savoir-faire technologique à forte valeur.",
    points: [
      "Actions en contrefaçon de brevet à l'échelle européenne et US",
      "Protection et contentieux des secrets d'affaires et bases de données",
      "Négociation de contrats de licence et transfert technologique d'élite",
      "Litiges relatifs à la propriété des innovations de salariés ou fondateurs"
    ],
    partner: "Me Gabriel Specter"
  }
};

function showExpertiseDetail(key) {
  const detail = expertiseDetails[key];
  if (!detail) return;

  const modalBody = document.getElementById('expertise-modal-body');
  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <div class="expertise-icon" style="margin: 0 auto 1rem auto;">
        <i class="fa-solid ${detail.icon}"></i>
      </div>
      <h3 class="heading-serif" style="font-size: 1.8rem;">${detail.title}</h3>
      <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 0.95rem;">${detail.desc}</p>
    </div>

    <div style="background: rgba(7, 9, 14, 0.6); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
      <h4 style="font-family: var(--font-serif); color: var(--gold-light); font-size: 1.1rem; margin-bottom: 1rem;">Points d'Intervention Privilégiés</h4>
      <ul style="list-style: none; color: var(--text-main); font-size: 0.9rem;">
        ${detail.points.map(pt => `<li style="margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.75rem;"><i class="fa-solid fa-chevron-right" style="color: var(--gold-primary); font-size: 0.8rem;"></i> ${pt}</li>`).join('')}
      </ul>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div>
        <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Associé Référent</div>
        <div style="font-family: var(--font-serif); font-weight: 700; color: var(--gold-light);">${detail.partner}</div>
      </div>
      <button class="btn btn-primary btn-glow" onclick="closeExpertiseModal(); openConsultationModal('${detail.partner}')">
        <i class="fa-solid fa-lock"></i>
        <span>Consulter l'Associé</span>
      </button>
    </div>
  `;

  document.getElementById('expertise-modal').classList.add('active');
}

function closeExpertiseModal() {
  document.getElementById('expertise-modal').classList.remove('active');
}
