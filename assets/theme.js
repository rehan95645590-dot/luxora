/**
 * Luxora Atelier — Core Interactive Theme Script
 */
document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initCurrencyModal();
  initAccordions();
  initProductVariants();
});

// Cart Drawer Controller
function initCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const openButtons = document.querySelectorAll('[data-cart-drawer-open]');
  const closeButtons = document.querySelectorAll('[data-cart-drawer-close]');

  if (!drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  }));

  closeButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeDrawer();
  }));

  backdrop.addEventListener('click', closeDrawer);

  // Intercept Add to Cart forms for seamless slide-out drawer
  document.querySelectorAll('form[action*="/cart/add"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Handcrafting Order...</span>';
      }

      try {
        const formData = new FormData(form);
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          await updateCartState();
          openDrawer();
        }
      } catch (err) {
        console.error('Add to cart failed:', err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  });
}

async function updateCartState() {
  try {
    const res = await fetch('/cart.js');
    if (!res.ok) return;
    const cart = await res.json();
    const countBubbles = document.querySelectorAll('.cart-count-bubble');
    countBubbles.forEach(b => {
      b.textContent = cart.item_count;
      b.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });
  } catch (err) {
    console.error('Failed to update cart state', err);
  }
}

// Regional & Currency Modal
function initCurrencyModal() {
  const modal = document.getElementById('country-currency-modal');
  const openButtons = document.querySelectorAll('[data-currency-modal-open]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const regionCards = document.querySelectorAll('.region-card');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  regionCards.forEach(card => {
    card.addEventListener('click', () => {
      regionCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const currency = card.dataset.currency;
      const country = card.dataset.country;
      const triggerLabel = document.querySelector('[data-active-region-label]');
      if (triggerLabel) {
        triggerLabel.textContent = `${country} (${currency})`;
      }
      setTimeout(closeModal, 250);
    });
  });
}

// Collapsible Accordions (Materials, Leather Grading, Electrics)
function initAccordions() {
  const triggers = document.querySelectorAll('[data-accordion-trigger]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.accordion-item');
      if (parent) {
        parent.classList.toggle('active');
      }
    });
  });
}

// Product Variant & Swatch Selector
function initProductVariants() {
  const swatches = document.querySelectorAll('.swatch-option');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const parent = swatch.closest('.swatch-group');
      if (parent) {
        parent.querySelectorAll('.swatch-option').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const selectedValue = swatch.dataset.value;
        const label = parent.querySelector('.selected-swatch-name');
        if (label) label.textContent = selectedValue;
      }
    });
  });

  const plugOptions = document.querySelectorAll('.plug-pill');
  plugOptions.forEach(pill => {
    pill.addEventListener('click', () => {
      const parent = pill.closest('.plug-group');
      if (parent) {
        parent.querySelectorAll('.plug-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
    });
  });
}


// Interactive Lamp Dimmer & Ambient Lighting Controller
function initInteractiveLampDimmer() {
  const toggleBtn = document.getElementById('dimmer-toggle');
  const slider = document.getElementById('lamp-dimmer-slider');
  const shade = document.querySelector('.lamp-shade');
  const cone = document.querySelector('.lamp-light-cone');
  const stage = document.querySelector('.interactive-lamp-stage');
  const statusLabel = document.getElementById('dimmer-status-label');

  if (!toggleBtn || !slider || !shade) return;

  function updateLighting(val) {
    slider.value = val;
    if (val == 0) {
      shade.classList.remove('lit');
      if (cone) cone.style.setProperty('--cone-opacity', '0');
      if (stage) stage.style.setProperty('--stage-glow', '#1F1C18');
      toggleBtn.textContent = 'Illuminate';
      if (statusLabel) statusLabel.textContent = '0% • Dormant';
    } else {
      shade.classList.add('lit');
      const opacity = (val / 100) * 0.55;
      if (cone) cone.style.setProperty('--cone-opacity', opacity.toString());
      if (stage) {
        const glowAlpha = (val / 100) * 0.5;
        stage.style.setProperty('--stage-glow', `rgba(77, 56, 35, ${glowAlpha})`);
      }
      toggleBtn.textContent = 'Extinguish';
      if (statusLabel) statusLabel.textContent = `${val}% • 2700K Amber Glow`;
    }
  }

  toggleBtn.addEventListener('click', () => {
    const isLit = shade.classList.contains('lit');
    updateLighting(isLit ? 0 : 85);
  });

  slider.addEventListener('input', (e) => {
    updateLighting(e.target.value);
  });

  // Ambiance mode switcher
  const ambBtns = document.querySelectorAll('.ambiance-btn');
  ambBtns.forEach(b => {
    b.addEventListener('click', () => {
      ambBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      const mode = b.dataset.mode;
      if (mode === 'day') {
        updateLighting(25);
      } else if (mode === 'twilight') {
        updateLighting(70);
      } else if (mode === 'midnight') {
        updateLighting(100);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveLampDimmer();
});
