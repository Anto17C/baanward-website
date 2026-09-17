'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const servicesMenu = document.querySelector('.services-menu');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (servicesMenu?.open) {
    servicesMenu.open = false;
    servicesMenu.querySelector('summary').focus();
  } else if (navigation?.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (servicesMenu?.open && !servicesMenu.contains(event.target)) servicesMenu.open = false;
});
const form = document.querySelector('#inquiry-form');
if (form) {
  const button = form.querySelector('button[type="submit"]');
  let sending = false;
  button.disabled = !form.elements.access_key?.value || !form.dataset.endpoint;
  const service = new URLSearchParams(location.search).get('service');
  if (['buyer-support','remote-property-oversight','owner-care'].includes(service)) form.elements.stage.value = service;
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
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    if (form.elements.botcheck.checked) {
      announce('Unable to send this inquiry. Please reload the page and try again.', 'error');
      return;
    }
    const invalid = [];
    fields.forEach(field => {
      clearError(field);
      if (field.type !== 'date') field.value = field.value.trim();
      let message = '';
      if (!field.validity.valid) message = field.validity.valueMissing ? 'Please complete this field.' : field.type === 'email' ? 'Enter a valid email address.' : field.type === 'url' ? 'Enter a full link beginning with https:// or http://.' : 'Please check this value.';
      if (field.name === 'listingUrl' && field.value && !/^https?:\/\//i.test(field.value)) message = 'Use a link beginning with https:// or http://.';
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
      status.textContent = 'Please check the highlighted fields. Nothing has been sent.';
      invalid[0].focus();
      return;
    }
    // Web3Forms access keys are intended for public, client-side forms.
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      announce('Inquiry delivery is unavailable. Nothing has been sent.', 'error');
      return;
    }
    sending = true;
    const payload = Object.fromEntries(new FormData(form));
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    announce('Sending your inquiry…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json', 'Accept':'application/json'}, body:JSON.stringify(payload), signal:controller.signal, credentials:'omit'});
      const result = await response.json();
      // Require the provider’s documented success flag as well as a successful HTTP response.
      if (!response.ok || result.success !== true) throw new Error('Unconfirmed delivery');
      announce('Thank you for getting in touch. Your inquiry has been sent. We’ll review the details and reply by email.', 'success');
      // Preserve any edits made while the earlier submission was in flight.
      if (JSON.stringify(Object.fromEntries(new FormData(form))) === JSON.stringify(payload)) form.reset();
    } catch {
      announce('We couldn’t confirm that your inquiry was sent. Your details are still here. Please try again.', 'error');
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}
