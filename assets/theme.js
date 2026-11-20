/**
 * Oreliaa Atelier — Core Interactive Theme Script
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


);
