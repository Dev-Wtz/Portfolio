/* ==========================================================================
   FlowPulse AI - Interactive SaaS Mockup JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Header Sticky Glass Effect on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Interactive Dashboard Tabs & SVG Chart Switching
  const dashTabs = document.querySelectorAll('.dash-tab');
  const statDeploy = document.getElementById('stat-deploy');
  const statBuild = document.getElementById('stat-build');
  const statSavings = document.getElementById('stat-savings');
  const chartCaption = document.getElementById('chart-caption');
  const chartLine = document.getElementById('chartLine');
  const chartArea = document.getElementById('chartArea');

  const chartData = {
    overview: {
      deploy: '148',
      build: '1.2m',
      savings: '$4,850',
      caption: 'Performance des Pipelines en Temps Réel',
      pathLine: 'M0,130 Q100,60 200,90 T400,30 T600,70',
      pathArea: 'M0,130 Q100,60 200,90 T400,30 T600,70 L600,160 L0,160 Z'
    },
    pipelines: {
      deploy: '342',
      build: '0.8m',
      savings: '$8,120',
      caption: 'Taux de Succès Auto-Healing (AI 3.0)',
      pathLine: 'M0,100 Q120,40 250,70 T450,20 T600,40',
      pathArea: 'M0,100 Q120,40 250,70 T450,20 T600,40 L600,160 L0,160 Z'
    },
    latency: {
      deploy: '99.99%',
      build: '14ms',
      savings: '$12,400',
      caption: 'Latence API & Optimisation des Serveurs',
      pathLine: 'M0,60 Q150,110 300,50 T500,80 T600,20',
      pathArea: 'M0,60 Q150,110 300,50 T500,80 T600,20 L600,160 L0,160 Z'
    }
  };

  dashTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dashTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetKey = tab.getAttribute('data-tab');
      const data = chartData[targetKey];

      if (data) {
        // Animate stat updates
        statDeploy.textContent = data.deploy;
        statBuild.textContent = data.build;
        statSavings.textContent = data.savings;
        chartCaption.textContent = data.caption;

        // Smooth transition for chart paths
        chartLine.setAttribute('d', data.pathLine);
        chartArea.setAttribute('d', data.pathArea);
      }
    });
  });

  // 3. Interactive ROI Calculator
  const devRange = document.getElementById('dev-range');
  const costRange = document.getElementById('cost-range');
  const devCountLabel = document.getElementById('dev-count-label');
  const costLabel = document.getElementById('cost-label');
  const savingsAmount = document.getElementById('savings-amount');
  const hoursAmount = document.getElementById('hours-amount');

  function calculateROI() {
    const devs = parseInt(devRange.value, 10);
    const hourlyRate = parseInt(costRange.value, 10);

    // Formula: 4.5 hours saved per dev per month -> 54 hours per dev per year
    const hoursSavedPerYear = devs * 54;
    const totalSavingsDollar = hoursSavedPerYear * hourlyRate;

    devCountLabel.textContent = `${devs} devs`;
    costLabel.textContent = `${hourlyRate} $/h`;

    savingsAmount.textContent = `$${totalSavingsDollar.toLocaleString('en-US')}`;
    hoursAmount.textContent = `${hoursSavedPerYear.toLocaleString('en-US')} h`;
  }

  if (devRange && costRange) {
    devRange.addEventListener('input', calculateROI);
    costRange.addEventListener('input', calculateROI);
    calculateROI();
  }

  // 4. Monthly vs Yearly Pricing Toggle
  const pricingToggle = document.getElementById('pricing-toggle');
  const planPrices = document.querySelectorAll('.plan-price');

  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      pricingToggle.classList.toggle('active');
      const isYearly = pricingToggle.classList.contains('active');

      planPrices.forEach(priceEl => {
        const monthly = priceEl.getAttribute('data-monthly');
        const yearly = priceEl.getAttribute('data-yearly');

        if (monthly && yearly) {
          priceEl.textContent = isYearly ? `$${yearly}` : `$${monthly}`;
        }
      });
    });
  }

  // 5. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other items
      faqItems.forEach(other => other.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

});
