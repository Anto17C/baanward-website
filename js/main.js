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
  form.querySelector('button[type="submit"]').disabled = false;
  const service = new URLSearchParams(location.search).get('service');
  if (['buyer-support','remote-property-oversight','owner-care'].includes(service)) form.elements.stage.value = service;
  const status = document.querySelector('#form-status');
  const fields = [...form.querySelectorAll('input, select, textarea')];
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
    // Remains empty until an authorised destination and privacy arrangements are approved.
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      announce('Your example details are complete. This preview cannot send inquiries. Nothing has been sent or saved.');
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    announce('Sending your inquiry…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(Object.fromEntries(new FormData(form))), signal:controller.signal, credentials:'same-origin'});
      const result = await response.json();
      // An HTTP 200 alone is not a delivery receipt. Backend must confirm durable acceptance.
      if (!response.ok || result.accepted !== true || typeof result.reference !== 'string' || !result.reference.trim()) throw new Error('Unconfirmed delivery');
      announce('Your inquiry has been received. Reference: ' + result.reference + '.', 'success');
      form.reset();
    } catch {
      announce('We could not confirm receipt. Your details remain here. Please try again later; no successful delivery has been confirmed.', 'error');
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
}
