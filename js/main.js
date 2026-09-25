'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const navItems = [...document.querySelectorAll('.nav-item')];
const mobileNavigation = window.matchMedia('(max-width: 1100px)');
function setSubmenu(item, open) {
  item.classList.toggle('submenu-open', open);
  item.classList.toggle('submenu-dismissed', !open && !mobileNavigation.matches);
  item.querySelector('.nav-toggle')?.setAttribute('aria-expanded', String(open));
}
function setMenu(open) {
  menuButton?.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('open', open);
  navItems.forEach(item => setSubmenu(item, false));
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navItems.forEach(item => {
  const toggle = item.querySelector('.nav-toggle');
  toggle?.addEventListener('click', () => setSubmenu(item, toggle.getAttribute('aria-expanded') !== 'true'));
  item.addEventListener('mouseenter', () => { if (!mobileNavigation.matches) setSubmenu(item, true); });
  item.addEventListener('mouseleave', () => { if (!mobileNavigation.matches && !item.contains(document.activeElement)) setSubmenu(item, false); });
  item.addEventListener('focusin', event => {
    if (!mobileNavigation.matches && event.target === item.querySelector('a')) setSubmenu(item, true);
  });
  item.addEventListener('focusout', event => {
    if (!mobileNavigation.matches && !item.contains(event.relatedTarget)) setSubmenu(item, false);
  });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (mobileNavigation.matches && navigation?.classList.contains('open')) {
    setMenu(false);
    menuButton.focus();
  } else {
    const item = navItems.find(item => item.classList.contains('submenu-open') && item.contains(document.activeElement));
    if (item) {
      setSubmenu(item, false);
      item.querySelector('.nav-toggle').focus();
    }
  }
});
mobileNavigation.addEventListener('change', () => setMenu(false));

// Preserve the visitor's chosen city and service through service and language links.
const inquiryContext = new URLSearchParams(location.search);
const validServices = ['buyer-support','remote-property-oversight','owner-care'];
const pageService = location.pathname.split('/').pop().replace(/\.html$/, '');
const selectedService = validServices.includes(pageService) ? pageService : inquiryContext.get('service');
const selectedCity = inquiryContext.get('location');
document.querySelectorAll('a[href]').forEach(link => {
  const target = new URL(link.getAttribute('href'), location.href);
  if (target.origin !== location.origin) return;
  const isContact = /\/contact(?:\.html)?$/.test(target.pathname);
  const isLanguage = Boolean(link.closest('.lang-item'));
  if (!isContact && !isLanguage) return;
  if (selectedCity && selectedCity.length <= 120) target.searchParams.set('location', selectedCity);
  if (validServices.includes(selectedService)) target.searchParams.set('service', selectedService);
  if (target.search) link.setAttribute('href', target.pathname + target.search + target.hash);
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

// Step cards fade up one after another as they scroll into view.
(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = document.querySelectorAll('.process-steps>li, .qa-card, .pillar, .ab-card, .ab-checks-row li');
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      seen.unobserve(el);
      el.classList.add('in');
      setTimeout(() => { el.classList.remove('js-reveal', 'in'); el.style.transitionDelay = ''; }, 1400);
    });
  }, { threshold: 0.12 });
  cards.forEach((el) => {
    el.style.transitionDelay = `${([...el.parentElement.children].indexOf(el) % 4) * 90}ms`;
    el.classList.add('js-reveal');
    seen.observe(el);
  });
})();

// Mobile eyebrows: keep them on one line. Short ones use the wide 0.2em spacing; long ones tighten
// their letter-spacing (and, if still too long, their size) until they fit the available width.
(() => {
  const narrow = window.matchMedia('(max-width: 900px)');
  const eyebrows = [...document.querySelectorAll('.eyebrow')];
  const px = (value) => parseFloat(value) || 0;
  const fit = () => {
    eyebrows.forEach((el) => {
      ['letter-spacing', 'font-size', 'white-space'].forEach((prop) => el.style.removeProperty(prop));
    });
    if (!narrow.matches) return;
    const thai = document.body.classList.contains('lang-th');
    eyebrows.forEach((el) => {
      const style = getComputedStyle(el);
      const parent = el.parentElement;
      const parentStyle = getComputedStyle(parent);
      const avail = parent.clientWidth - px(parentStyle.paddingLeft) - px(parentStyle.paddingRight)
        - px(style.paddingLeft) - px(style.paddingRight) - px(style.borderLeftWidth) - px(style.borderRightWidth);
      if (avail <= 0) return;
      el.style.setProperty('white-space', 'nowrap', 'important');
      el.style.setProperty('letter-spacing', '0px', 'important');
      const range = document.createRange();
      range.selectNodeContents(el);
      const natural = range.getBoundingClientRect().width;
      const chars = el.textContent.trim().length;
      const size = px(style.fontSize);
      let spacing = Math.min(size * (thai ? 0.02 : 0.2), (avail - natural) / chars);
      if (spacing < 0) {
        el.style.setProperty('font-size', `${(size * avail / natural) * 0.98}px`, 'important');
        spacing = 0;
      }
      el.style.setProperty('letter-spacing', `${spacing}px`, 'important');
    });
  };
  let timer;
  const refit = () => { clearTimeout(timer); timer = setTimeout(fit, 80); };
  window.addEventListener('resize', refit);
  narrow.addEventListener('change', fit);
  (document.fonts?.ready || Promise.resolve()).then(fit);
  fit();
})();
