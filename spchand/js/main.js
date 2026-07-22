/* S.P. Chand Convent School — site behaviour
   - accessible dropdown nav (click + hover on desktop, accordion on mobile)
   - mobile menu toggle
   - year stamp in footer
   - contact form: client-side validation only (no backend wired up)
*/
(function () {
  'use strict';

  var DESKTOP = window.matchMedia('(min-width: 901px)');

  /* ---------------- dropdown navigation ---------------- */
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav__item--has-panel'));

  function closeAll(except) {
    navItems.forEach(function (item) {
      if (item === except) return;
      item.setAttribute('data-open', 'false');
      var btn = item.querySelector('.nav__link');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function toggle(item, force) {
    var open = force !== undefined ? force : item.getAttribute('data-open') !== 'true';
    if (open) closeAll(item);
    item.setAttribute('data-open', open ? 'true' : 'false');
    var btn = item.querySelector('.nav__link');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  navItems.forEach(function (item) {
    var btn = item.querySelector('.nav__link');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      toggle(item);
    });

    // hover only on desktop
    item.addEventListener('mouseenter', function () {
      if (DESKTOP.matches) toggle(item, true);
    });
    item.addEventListener('mouseleave', function () {
      if (DESKTOP.matches) toggle(item, false);
    });

    // keyboard: escape closes and returns focus
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        toggle(item, false);
        btn.focus();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item--has-panel')) closeAll();
  });

  /* ---------------- mobile menu ---------------- */
  var toggleBtn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', function () {
      var open = toggleBtn.getAttribute('aria-expanded') !== 'true';
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.setAttribute('data-mobile-open', open ? 'true' : 'false');
      if (!open) closeAll();
    });

    // reset state when crossing the breakpoint
    var onChange = function () {
      toggleBtn.setAttribute('aria-expanded', 'false');
      nav.setAttribute('data-mobile-open', 'false');
      closeAll();
    };
    if (DESKTOP.addEventListener) DESKTOP.addEventListener('change', onChange);
    else if (DESKTOP.addListener) DESKTOP.addListener(onChange);
  }

  /* ---------------- footer year ---------------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------- contact / enquiry form ---------------- */
  var form = document.querySelector('[data-enquiry-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) {
        status.hidden = false;
        status.textContent =
          'Thanks — your enquiry has been recorded locally. Connect this form to an email service or backend to actually deliver it.';
      }
      form.reset();
    });
  }
})();
