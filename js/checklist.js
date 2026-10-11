// Personalised purchase checklist: shows the steps that fit the answers. Nothing leaves the browser.
(function () {
  var form = document.querySelector('.checklist-form');
  if (!form) return;
  var GROUP = { condo: 'buying', house: 'buying', land: 'buying', offplan: 'stage', resale: 'stage',
    freehold: 'tenure', lease: 'tenure', abroad: 'where', local: 'where', loan: 'finance', cash: 'finance' };
  var steps = [].slice.call(document.querySelectorAll('.checklist li[data-when]'));
  var groups = [].slice.call(document.querySelectorAll('.checklist-group'));
  var count = document.getElementById('checklist-count');
  var KEY = 'bw-checklist';

  function answers() {
    var a = {};
    [].forEach.call(form.elements, function (el) { if (el.name && el.value) a[el.name] = el.value; });
    return a;
  }
  function update() {
    var a = answers(), shown = 0;
    steps.forEach(function (li) {
      var by = {};
      li.getAttribute('data-when').split(' ').forEach(function (t) {
        if (!t) return;
        var g = GROUP[t];
        (by[g] = by[g] || []).push(t);
      });
      var show = Object.keys(by).every(function (g) { return !a[g] || by[g].indexOf(a[g]) > -1; });
      li.hidden = !show;
      if (show) shown++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('li:not([hidden])'); });
    if (count) count.textContent = shown;
    try { sessionStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {}
  }
  try {
    var saved = JSON.parse(sessionStorage.getItem(KEY) || '{}');
    Object.keys(saved).forEach(function (n) { if (form.elements[n]) form.elements[n].value = saved[n]; });
  } catch (e) {}
  form.addEventListener('change', update);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  var print = document.getElementById('checklist-print');
  if (print) { print.hidden = false; print.addEventListener('click', function () { window.print(); }); }
  update();
})();
