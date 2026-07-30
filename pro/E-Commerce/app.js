/* ==========================================================================
   PAWTOON - Interactive JavaScript Logic & State Management
   ========================================================================== */

// Sample Product Catalog with Rich Cartoon Details
const PRODUCTS = [
  {
    id: 'toy-1',
    name: 'Os Pouët-Pouët Fluo 🦴',
    category: 'dogs',
    categoryLabel: 'Pour Chiens',
    price: 12.99,
    rating: 4.9,
    reviews: 128,
    image: './assets/images/toy_bone.jpg',
    badge: 'Coup de Cœur 🔥',
    isBestseller: true,
    description: "Le jouet en forme d'os indestructible au couinement super joyeux ! Conçu en silicone souple non-toxique, il prend soin de la dentition de votre toutou tout en l'amusant pendant des heures.",
    features: ['Couinement rigolo à chaque pression 🎵', 'Resistant aux crocs affûtés 🦷', 'Flotte dans l\'eau 🌊', '100% Sans BPA & Eco-friendly 🌿']
  },
  {
    id: 'toy-2',
    name: 'Souris Cyber-Catnip 🐭',
    category: 'cats',
    categoryLabel: 'Pour Chats',
    price: 15.50,
    rating: 4.8,
    reviews: 95,
    image: './assets/images/toy_mouse.jpg',
    badge: 'Nouveauté ✨',
    isBestseller: false,
    description: "Une souris mecha-cartoon irrésistible avec queue en herbe à chat bio ! Elle roule de façon imprévisible pour stimuler l'instinct de chasseur de votre félin.",
    features: ['Herbe à chat Bio Premium incluse 🌿', 'Mouvements aléatoires rigolos ⚡', 'Oreilles lumineuses LED douces 💡', 'Rechargeable en USB-C 🔌']
  },
  {
    id: 'toy-3',
    name: 'Canard Pluche Piquant 🦆',
    category: 'dogs',
    categoryLabel: 'Pour Chiens',
    price: 18.99,
    rating: 5.0,
    reviews: 210,
    image: './assets/images/toy_duck.jpg',
    badge: 'Best-Seller 🌟',
    isBestseller: true,
    description: "Le canard en peluche cartoon le plus doux de la planète ! Avec ses petites bottes rouges et ses ailes bruissantes, c'est le compagnon de dodo et de jeu idéal.",
    features: ['Texture ultra-doudou renforcée ☁️', 'Bruit de papier froissé dans les ailes 🍃', 'Lavable en machine à 30° 🧼', 'Design cartoon Pixar adoré par les chiots 🐶']
  },
  {
    id: 'toy-4',
    name: 'Donut Corde Arc-en-Ciel 🍩',
    category: 'dogs',
    categoryLabel: 'Pour Chiens',
    price: 9.99,
    rating: 4.7,
    reviews: 64,
    image: './assets/images/toy_donut.jpg',
    badge: 'Promo 🎉',
    isBestseller: false,
    description: "Un gourmand donut en corde tressée naturelle multicolore ! Parfait pour les jeux de lancer/rapporter et pour nettoyer le tartre en douceur.",
    features: ['Fibres de coton 100% naturelles 🧵', 'Aide à l\'hygiène dentaire 🦷', 'Design coloré gourmand 🎨', 'Prise en gueule facile 👄']
  },
  {
    id: 'toy-5',
    name: 'Balle Rebondie Tutti-Frutti ⚽',
    category: 'dogs',
    categoryLabel: 'Pour Chiens',
    price: 8.50,
    rating: 4.6,
    reviews: 42,
    image: './assets/images/toy_bone.jpg', // fallback image
    badge: 'Fun 🌈',
    isBestseller: false,
    description: "Balle cartoon ultra-rebondissante parfum fraise sauvage ! Elle saute plus haut que les arbres et résiste aux morsures intenses.",
    features: ['Parfum fraise intégrée 🍓', 'Rebond imprévisible et super haut 🚀', 'Nettoyage ultra facile sous l\'eau 🚿']
  },
  {
    id: 'toy-6',
    name: 'Plumeau Laser Magique 🪶',
    category: 'cats',
    categoryLabel: 'Pour Chats',
    price: 14.00,
    rating: 4.9,
    reviews: 180,
    image: './assets/images/toy_mouse.jpg', // fallback image
    badge: 'Top Vente 🐾',
    isBestseller: true,
    description: "La baguette magique interactive avec plumes naturelles et pointeur lumineux sécurisé pour faire faire de la gymnastique à votre chat !",
    features: ['Plumes d\'autruche synthétiques hypoallergéniques 🪶', 'Manche ergonomique rigide anti-casse 🪄', 'Déclenche des pirouettes mémorables 🤸']
  },
  {
    id: 'toy-7',
    name: 'Echelle Suspendue Jungle 🦜',
    category: 'birds',
    categoryLabel: 'Pour Oiseaux',
    price: 11.20,
    rating: 4.8,
    reviews: 31,
    image: './assets/images/toy_donut.jpg',
    badge: 'Aventurier 🦜',
    isBestseller: false,
    description: "Un parcours d'agilité en bois naturel coloré avec clochettes tintantes pour perruches et perroquets curieux.",
    features: ['Bois non traité peints avec colorants alimentaires 🎨', 'Clochettes en acier inoxydable 🔔', 'Fixation facile à toute cage 🔩']
  },
  {
    id: 'toy-8',
    name: 'Roue Silencieuse Neuf Nuages 🐹',
    category: 'small_pets',
    categoryLabel: 'Pour NAC',
    price: 16.80,
    rating: 4.9,
    reviews: 88,
    image: './assets/images/toy_duck.jpg',
    badge: 'Zéro Bruit 🤫',
    isBestseller: true,
    description: "La roue pour hamsters et cochons d'Inde garantie 100% silencieuse grâce à ses roulements à billes de compétition.",
    features: ['Roulements ultra-fluides silencieux ⚙️', 'Surface de course antidérapante 🐾', 'Protège la colonne vertébrale des NAC 🐹']
  }
];

// App State
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'popular';
let modalSelectedQty = 1;
let currentModalProduct = null;

// Sound Effects (Web Audio API Synthesizer)
function playCartoonSound(type = 'pop') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'squeak') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.08);
      osc.frequency.linearRampToValueAtTime(700, now + 0.18);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'fanfare') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(freq, now + i * 0.08);
        subGain.gain.setValueAtTime(0.2, now + i * 0.08);
        subGain.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.25);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now + i * 0.08);
        subOsc.stop(now + i * 0.08 + 0.25);
      });
    }
  } catch (e) {
    // Silent fallback if audio context not permitted
  }
}

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
  updateCartUI();
});

// Event Listeners Setup
function setupEventListeners() {
  // Category Chips
  const chipBtns = document.querySelectorAll('.chip-btn');
  chipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      playCartoonSound('pop');
      renderProducts();
    });
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Cart Drawer Toggles
  const cartBtn = document.getElementById('cart-toggle-btn');
  const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartCloseBtn = document.getElementById('cart-close-btn');

  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      cartDrawerBackdrop.classList.add('open');
      playCartoonSound('pop');
    });
  }

  if (cartCloseBtn && cartDrawerBackdrop) {
    cartCloseBtn.addEventListener('click', () => {
      cartDrawerBackdrop.classList.remove('open');
    });
    cartDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === cartDrawerBackdrop) {
        cartDrawerBackdrop.classList.remove('open');
      }
    });
  }

  // Modal Product Close
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Quantity Picker inside Modal
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  if (qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      if (modalSelectedQty > 1) {
        modalSelectedQty--;
        document.getElementById('modal-qty-val').textContent = modalSelectedQty;
        playCartoonSound('pop');
      }
    });
    qtyPlus.addEventListener('click', () => {
      modalSelectedQty++;
      document.getElementById('modal-qty-val').textContent = modalSelectedQty;
      playCartoonSound('pop');
    });
  }

  // Modal Add to Cart Button
  const modalAddCartBtn = document.getElementById('modal-add-cart-btn');
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', () => {
      if (currentModalProduct) {
        addToCart(currentModalProduct.id, modalSelectedQty);
        closeModal();
      }
    });
  }

  // Checkout Button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let filtered = PRODUCTS.filter(prod => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery) || 
                          prod.description.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 4rem; margin-bottom: 15px;">🙈</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.8rem;">Oups ! Aucun jouet trouvé...</h3>
        <p style="color: var(--text-muted); font-weight: 700; margin-top: 8px;">Essayez une autre recherche ou réinitialisez les filtres !</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => `
    <div class="product-card">
      ${prod.badge ? `<span class="product-badge ${prod.isBestseller ? 'bestseller' : ''}">${prod.badge}</span>` : ''}
      <div class="product-img-wrapper" onclick="openProductModal('${prod.id}')">
        <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" />
        <div class="quick-view-overlay">
          <span class="btn-cartoon btn-yellow" style="font-size: 0.85rem; padding: 6px 12px;">Aperçu Rapide 🔍</span>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category-tag">${prod.categoryLabel}</span>
        <h3 class="product-title" onclick="openProductModal('${prod.id}')" style="cursor: pointer;">${prod.name}</h3>
        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span>${prod.rating} (${prod.reviews} avis)</span>
        </div>
        <div class="product-footer">
          <span class="product-price">${prod.price.toFixed(2)} €</span>
          <button class="btn-cartoon btn-pink add-cart-btn" onclick="addToCart('${prod.id}', 1)">
            + Panier 🛒
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Open Modal Details
function openProductModal(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  currentModalProduct = prod;
  modalSelectedQty = 1;

  document.getElementById('modal-img').src = prod.image;
  document.getElementById('modal-title').textContent = prod.name;
  document.getElementById('modal-category').textContent = prod.categoryLabel;
  document.getElementById('modal-price').textContent = `${prod.price.toFixed(2)} €`;
  document.getElementById('modal-description').textContent = prod.description;
  document.getElementById('modal-qty-val').textContent = 1;

  const featuresList = document.getElementById('modal-features');
  if (featuresList) {
    featuresList.innerHTML = prod.features.map(f => `<li>✓ ${f}</li>`).join('');
  }

  const modalBackdrop = document.getElementById('modal-backdrop');
  modalBackdrop.classList.add('open');
  playCartoonSound('squeak');
}

function closeModal() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop) modalBackdrop.classList.remove('open');
  currentModalProduct = null;
}

// Cart Functions
function addToCart(productId, quantity = 1) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].qty += quantity;
  } else {
    cart.push({ ...prod, qty: quantity });
  }

  playCartoonSound('squeak');
  showToast(`🎉 ${quantity}x "${prod.name}" ajouté au panier !`);
  updateCartUI();
}

function updateCartQty(productId, delta) {
  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].qty += delta;
    if (cart[existingIndex].qty <= 0) {
      cart.splice(existingIndex, 1);
    }
    playCartoonSound('pop');
    updateCartUI();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  playCartoonSound('pop');
  updateCartUI();
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');
  const progressBarFill = document.getElementById('shipping-progress-fill');
  const shippingText = document.getElementById('shipping-progress-text');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cartBadge) cartBadge.textContent = totalItems;

  if (cartItemsList) {
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <div style="font-size: 3.5rem; margin-bottom: 10px;">🐾</div>
          <h4 style="font-family: var(--font-heading); font-size: 1.3rem;">Votre panier est vide !</h4>
          <p style="font-size: 0.9rem; font-weight: 700; margin-top: 5px;">Offrez un jouet rigolo à votre compagnon !</p>
        </div>
      `;
    } else {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" class="cart-item-img" alt="${item.name}" />
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} €</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <button class="qty-btn" style="width:26px; height:26px; font-size:0.9rem;" onclick="updateCartQty('${item.id}', -1)">-</button>
              <span style="font-family: var(--font-heading); font-weight:800; font-size:1rem;">${item.qty}</span>
              <button class="qty-btn" style="width:26px; height:26px; font-size:0.9rem;" onclick="updateCartQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Supprimer">🗑️</button>
        </div>
      `).join('');
    }
  }

  // Free shipping progress calculation (Free at 30€)
  const freeShippingThreshold = 30.00;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (progressBarFill) progressBarFill.style.width = `${progressPercent}%`;

  if (shippingText) {
    if (subtotal >= freeShippingThreshold) {
      shippingText.innerHTML = `🎁 **Félicitations !** Vous bénéficiez de la **Livraison Gratuite** !`;
    } else {
      const remaining = (freeShippingThreshold - subtotal).toFixed(2);
      shippingText.innerHTML = `Plus que **${remaining} €** pour débloquer la **Livraison Gratuite** 🚚`;
    }
  }

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0.00 : 3.90;
  const total = subtotal + shippingCost;

  if (cartSubtotalEl) cartSubtotalEl.textContent = `${subtotal.toFixed(2)} €`;
  if (cartTotalEl) cartTotalEl.textContent = `${total.toFixed(2)} €`;
}

// Toast Notifications
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-cartoon';
  toast.innerHTML = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Checkout & Confetti Simulation
function handleCheckout() {
  if (cart.length === 0) {
    showToast('⚠️ Votre panier est vide ! Ajoutez d\'abord des jouets.');
    playCartoonSound('pop');
    return;
  }

  playCartoonSound('fanfare');
  triggerConfetti();

  showToast('🎉 Commande validée avec succès ! Merci de votre confiance PawToon ! 🐶🐱');

  cart = [];
  updateCartUI();

  setTimeout(() => {
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (backdrop) backdrop.classList.remove('open');
  }, 2000);
}

// Canvas Confetti Effect
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#FFD200', '#FF527B', '#4CC9F0', '#2EC4B6', '#8A4FFF', '#FF8811'];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 3,
      speedX: Math.random() * 4 - 2,
      rotation: Math.random() * 360
    });
  }

  let startTime = Date.now();
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += 4;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (Date.now() - startTime < 3000) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  animate();
}
