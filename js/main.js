'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
// Services and Coverage Areas are real links with a hover-opening dropdown (desktop).
// On mobile, hover doesn't apply, so opening the menu expands every dropdown at once,
// and tapping a caret toggles just that one—matching the rest of the menu being visible.
const navItems = [...document.querySelectorAll('.nav-item')];
const MOBILE_QUERY = '(max-width: 980px)';
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  navItems.forEach(item => item.classList.toggle('mobile-open', open));
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (navigation?.classList.contains('open')) {
    navigation.classList.remove('open');
    navItems.forEach(item => item.classList.remove('mobile-open'));
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
navItems.forEach(item => {
  const caret = item.querySelector('.caret');
  caret?.addEventListener('click', (event) => {
    if (!window.matchMedia(MOBILE_QUERY).matches) return;
    event.preventDefault();
    event.stopPropagation();
    item.classList.toggle('mobile-open');
  });
});
const form = document.querySelector('#inquiry-form');
if (form) {
  const button = form.querySelector('button[type="submit"]');
  let sending = false;
  button.disabled = !form.elements.access_key?.value || !form.dataset.endpoint;
  const queryParams = new URLSearchParams(location.search);
  const service = queryParams.get('service');
  if (['buyer-support','remote-property-oversight','owner-care'].includes(service)) form.elements.stage.value = service;
  const cityParam = queryParams.get('location');
  if (cityParam && form.elements.location) form.elements.location.value = cityParam;
  const status = document.querySelector('#form-status');
  const fields = [...form.querySelectorAll('.field input, .field select, .field textarea')];
  function clearError(field) {
    field.removeAttribute('aria-invalid');
    document.querySelector('#' + field.id + '-error')?.remove();
    const descriptions = (field.getAttribute('aria-describedby') || '').split(' ').filter(id => id && id !== field.id + '-error');
    if (descriptions.length) field.setAttribute('aria-describedby', descriptions.join(' '));
    else field.removeAttribute('aria-describedby');
  }
  fields.forEach(field => field.addEventListener('input', () => clearError(field)));
  function announce(message, state = '') {
    status.className = 'form-status ' + state;
    status.textContent = message;
    status.focus();
  }
  // Status and validation copy lives on the form as data-msg-* attributes so each language
  // page supplies its own text; English defaults below only guard a missing attribute.
  const msg = Object.assign({
    msgBotcheck: 'Unable to send this inquiry. Please reload the page and try again.',
    msgRequired: 'Please complete this field.',
    msgEmail: 'Enter a valid email address.',
    msgUrl: 'Enter a full link beginning with https:// or http://.',
    msgGeneric: 'Please check this value.',
    msgUrlScheme: 'Use a link beginning with https:// or http://.',
    msgHighlighted: 'Please check the highlighted fields. Nothing has been sent.',
    msgUnavailable: 'Inquiry delivery is unavailable. Nothing has been sent.',
    msgSending: 'Sending your inquiry…',
    msgSuccess: 'Thank you for getting in touch. Your inquiry has been sent. We’ll review the details and reply by email.',
    msgError: 'We couldn’t confirm that your inquiry was sent. Your details are still here. Please try again.'
  }, form.dataset);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    if (form.elements.botcheck.checked) {
      announce(msg.msgBotcheck, 'error');
      return;
    }
    const invalid = [];
    fields.forEach(field => {
      clearError(field);
      if (field.type !== 'date') field.value = field.value.trim();
      let message = '';
      if (!field.validity.valid) message = field.validity.valueMissing ? msg.msgRequired : field.type === 'email' ? msg.msgEmail : field.type === 'url' ? msg.msgUrl : msg.msgGeneric;
      if (field.name === 'listingUrl' && field.value && !/^https?:\/\//i.test(field.value)) message = msg.msgUrlScheme;
      if (message) {
        invalid.push(field);
        field.setAttribute('aria-invalid', 'true');
        const error = document.createElement('span');
        error.id = field.id + '-error';
        error.className = 'field-error';
        error.textContent = message;
        field.after(error);
        field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
      }
    });
    if (invalid.length) {
      status.className = 'form-status error';
      status.textContent = msg.msgHighlighted;
      invalid[0].focus();
      return;
    }
    // Web3Forms access keys are intended for public, client-side forms.
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      announce(msg.msgUnavailable, 'error');
      return;
    }
    sending = true;
    const payload = Object.fromEntries(new FormData(form));
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    announce(msg.msgSending);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json', 'Accept':'application/json'}, body:JSON.stringify(payload), signal:controller.signal, credentials:'omit'});
      const result = await response.json();
      // Require the provider’s documented success flag as well as a successful HTTP response.
      if (!response.ok || result.success !== true) throw new Error('Unconfirmed delivery');
      announce(msg.msgSuccess, 'success');
      // Preserve any edits made while the earlier submission was in flight.
      if (JSON.stringify(Object.fromEntries(new FormData(form))) === JSON.stringify(payload)) form.reset();
    } catch {
      announce(msg.msgError, 'error');
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}

// Which channel floats (WhatsApp or LINE) is set per language in each page's markup.
const backToTop = document.querySelector('#back-to-top');
if (backToTop) {
  const updateBackToTop = () => { backToTop.hidden = window.scrollY < 500; };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    const target = document.querySelector('.site-header .wordmark');
    target?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
}


// Illustrative property concerns, not quotations from client inquiries.
const propertyTicker = document.querySelector('.property-ticker');
if (propertyTicker) {
  const windowElement = propertyTicker.querySelector('.ticker-window');
  const track = propertyTicker.querySelector('.ticker-track');
  const phrases = propertyTicker.querySelector('.ticker-phrases');
  const toggle = propertyTicker.querySelector('.ticker-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copy = phrases.cloneNode(true);
  copy.classList.add('ticker-copy');
  copy.setAttribute('aria-hidden', 'true');
  let paused = false;
  const updateMotion = () => {
    copy.remove();
    propertyTicker.classList.toggle('is-moving', !reducedMotion.matches);
    toggle.hidden = reducedMotion.matches;
    if (!reducedMotion.matches) {
      track.append(copy);
      windowElement.scrollLeft = 0;
    }
  };
  const updateSpeed = () => {
    propertyTicker.style.setProperty('--ticker-duration', `${phrases.getBoundingClientRect().width / 28}s`);
  };
  // The pause/resume labels are supplied per language via data attributes on the button,
  // with its initial aria-label (the pause state) as the fallback.
  const pauseLabel = toggle.dataset.labelPause || toggle.getAttribute('aria-label');
  const resumeLabel = toggle.dataset.labelResume || pauseLabel;
  toggle.addEventListener('click', () => {
    paused = !paused;
    propertyTicker.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? resumeLabel : pauseLabel);
    toggle.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
  });
  reducedMotion.addEventListener('change', updateMotion);
  new ResizeObserver(updateSpeed).observe(phrases);
  updateSpeed();
  updateMotion();
}
