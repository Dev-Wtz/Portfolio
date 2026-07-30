/* ==========================================================================
   Cabinet d'Ostéopathie & Bien-être - App Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBodyMap();
  initMutuelleCalculator();
  initFaqAccordion();
  initBookingWizard();
});

/* --- 1. Navbar Navigation & Scroll Behavior --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- 2. Interactive Symptom Body Map Data & Logic --- */
const bodyZonesData = {
  cervical: {
    title: "Cervicales & Maux de Tête",
    subtitle: "Région cervicale, trapèzes et base du crâne",
    symptoms: [
      "Raideurs de la nuque & torticolis à répétition",
      "Céphalées de tension & migraines cervicogéniques",
      "Douleurs irradiant vers les épaules et les bras (NCB)",
      "Sensation de lourdeur ou vertiges positionnels légers"
    ],
    approach: "Traitement doux des vertèbres cervicales, relâchement des fascia péricrâniens et harmonisation des tensions musculaires sous-occipitales."
  },
  shoulders: {
    title: "Épaules & Membres Supérieurs",
    subtitle: "Ceinture scapulaire, coiffe des rotateurs et coudes",
    symptoms: [
      "Tendinites de l'épaule et conflit sous-acromial",
      "Bursites, blocages en élévation du bras",
      "Épicondylite (Tennis Elbow) & maux du canal carpien",
      "Tensions musculaires du haut du dos"
    ],
    approach: "Mobilisation des articulations gléno-humérale et scapulo-thoracique pour restaurer l'amplitude naturelle sans forcer."
  },
  lumbar: {
    title: "Région Lombaire & Sciatique",
    subtitle: "Bas du dos, vertèbres L1-L5 et nerf sciatique",
    symptoms: [
      "Lumbago aigu, mal de dos chronique au réveil",
      "Irradiation sciatique ou cruralgie dans la fesse/jambe",
      "Sensation de verrouillage après position assise prolongée",
      "Rigidité liée au stress ou au port de charges"
    ],
    approach: "Décompression discale douce, rééquilibrage de la charnière thoraco-lombaire et relâchement du muscle psoas."
  },
  pelvis: {
    title: "Bassin, Hanches & Sacrum",
    subtitle: "Articulations sacro-iliaques et coxofémorales",
    symptoms: [
      "Douleurs sacro-iliaques unilatérales (fesse)",
      "Tensions symphysaires ou pubalgie",
      "Gêne à la marche, blocage de la hanche",
      "Inconforts post-accouchement ou de grossesse"
    ],
    approach: "Normalisation du bassin et du sacrum par des techniques ostéopathiques structurelles et tissulaires appropriées."
  },
  knee: {
    title: "Genoux, Chevilles & Pieds",
    subtitle: "Membres inférieurs et chaîne montante",
    symptoms: [
      "Douleurs rotuliennes / syndrome essuie-glace du coureur",
      "Séquelles d'entorses de cheville mal récupérées",
      "Aponévrosite plantaire & douleurs sous le pied",
      "Compensation posturale suite à une blessure"
    ],
    approach: "Analyse globale de la posture pour libérer les compensations ascendantes du pied jusqu'au bassin."
  },
  digestive: {
    title: "Ostéopathie Viscérale & Digestif",
    subtitle: "Estomac, intestins et diaphragme",
    symptoms: [
      "Reflux gastro-œsophagien (RGO), brûlures d'estomac",
      "Ballonnements, digestion lente et spasmes abdominaux",
      "Oppression respiratoire liée au diaphragme tendu",
      "Stress somatisé dans la sphère ventrale"
    ],
    approach: "Relâchement des tensions fasciales des organes digestifs et travail spécifique du diaphragme respiratoire."
  }
};

function initBodyMap() {
  const hotspots = document.querySelectorAll('.body-hotspot');
  const zonePills = document.querySelectorAll('.zone-pill');

  function selectZone(zoneKey) {
    const data = bodyZonesData[zoneKey];
    if (!data) return;

    // Update hotspots UI
    hotspots.forEach(hs => {
      if (hs.dataset.zone === zoneKey) {
        hs.classList.add('active');
      } else {
        hs.classList.remove('active');
      }
    });

    // Update pills UI
    zonePills.forEach(pill => {
      if (pill.dataset.zone === zoneKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Update Detail Card
    const cardTitle = document.getElementById('symptom-card-title');
    const cardSubtitle = document.getElementById('symptom-card-subtitle');
    const cardList = document.getElementById('symptom-card-list');
    const cardApproach = document.getElementById('symptom-card-approach');

    if (cardTitle) cardTitle.innerHTML = `<span style="color:var(--primary)">📍</span> ${data.title}`;
    if (cardSubtitle) cardSubtitle.textContent = data.subtitle;
    if (cardApproach) cardApproach.textContent = data.approach;

    if (cardList) {
      cardList.innerHTML = data.symptoms.map(symptom => `<li>${symptom}</li>`).join('');
    }
  }

  hotspots.forEach(hs => {
    hs.addEventListener('click', () => {
      selectZone(hs.dataset.zone);
    });
  });

  zonePills.forEach(pill => {
    pill.addEventListener('click', () => {
      selectZone(pill.dataset.zone);
    });
  });
}

/* --- 3. Mutuelle Reimbursement Calculator --- */
const mutuelleData = {
  alan: { coverage: "100%", details: "Jusqu'à 4 séances / an remboursées à 50€ à 70€ par séance selon votre contrat (Alan Blue/Green)." },
  malakoff: { coverage: "50€ à 200€", details: "Forfait annuel médecine douce jusqu'à 4 séances de 50€ par an." },
  harmonie: { coverage: "3 à 5 séances", details: "Prise en charge forfaitaire de 35€ à 50€ par séance d'ostéopathie." },
  swisslife: { coverage: "100% Forfait", details: "Prise en charge jusqu'à 250€ / an pour les consultations d'ostéopathie agréée D.O." },
  axa: { coverage: "4 séances/an", details: "Remboursement direct sur facture avec praticien certifié ADELI / FINESS." },
  autre: { coverage: "Variable", details: "Près de 85% des mutuelles prennent en charge l'ostéopathie. Une facture nominative vous est délivrée en fin de séance." }
};

function initMutuelleCalculator() {
  const select = document.getElementById('mutuelle-select');
  const resultCoverage = document.getElementById('calc-result-coverage');
  const resultDetails = document.getElementById('calc-result-details');

  if (select) {
    select.addEventListener('change', (e) => {
      const key = e.target.value;
      const info = mutuelleData[key] || mutuelleData.autre;
      
      resultCoverage.style.opacity = 0;
      setTimeout(() => {
        resultCoverage.textContent = info.coverage;
        resultDetails.textContent = info.details;
        resultCoverage.style.opacity = 1;
      }, 200);
    });
  }
}

/* --- 4. FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --- 5. Interactive Booking Wizard Modal --- */
let currentStep = 1;

function initBookingWizard() {
  const modal = document.getElementById('booking-modal');
  const openBtns = document.querySelectorAll('.open-booking-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  const prevBtn = document.getElementById('wizard-prev-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
    });
  }

  // Card selection logic inside wizard
  document.querySelectorAll('.selectable-card').forEach(card => {
    card.addEventListener('click', function() {
      const parent = this.parentElement;
      parent.querySelectorAll('.selectable-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  document.querySelectorAll('.slot-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < 3) {
        currentStep++;
        updateWizardStep();
      } else if (currentStep === 3) {
        // Confirm booking
        showToast("✓ Rendez-vous confirmé ! Un SMS de confirmation vous a été envoyé.");
        if (modal) modal.classList.remove('active');
        currentStep = 1;
        updateWizardStep();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardStep();
      }
    });
  }
}

function updateWizardStep() {
  document.querySelectorAll('.wizard-step-content').forEach(step => {
    step.style.display = 'none';
  });

  const activeStepContent = document.getElementById(`wizard-step-${currentStep}`);
  if (activeStepContent) activeStepContent.style.display = 'block';

  // Update dots
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`dot-step-${i}`);
    if (dot) {
      if (i === currentStep) {
        dot.className = 'wizard-step-dot active';
      } else if (i < currentStep) {
        dot.className = 'wizard-step-dot completed';
      } else {
        dot.className = 'wizard-step-dot';
      }
    }
  }

  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');

  if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
  if (nextBtn) nextBtn.textContent = currentStep === 3 ? 'Confirmer la réservation' : 'Étape suivante →';
}

/* --- 6. Toast Notification Helper --- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
