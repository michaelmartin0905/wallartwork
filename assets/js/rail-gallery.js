/* wallartwork.it.com — small vanilla helpers (no dependencies) */
(function () {
  'use strict';

  /* ---- Mobile picture-rail drawer ---- */
  var rail = document.querySelector('.rail');
  var toggle = document.querySelector('.rail__toggle');
  if (rail && toggle) {
    var setOpen = function (open) {
      rail.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-locked', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && rail.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    rail.querySelectorAll('.rail__nav a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1200 && rail.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ---- Hero / section video: respect reduced motion + pause control ---- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-wall-video]').forEach(function (wrap) {
    var v = wrap.querySelector('video');
    var b = wrap.querySelector('.vid-toggle');
    if (!v) return;
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); }
    var sync = function () {
      if (!b) return;
      var playing = !v.paused;
      b.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
      b.innerHTML = playing
        ? '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" fill="currentColor"/></svg>'
        : '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l10 6-10 6z" fill="currentColor"/></svg>';
    };
    if (b) b.addEventListener('click', function () { if (v.paused) { v.play(); } else { v.pause(); } });
    v.addEventListener('play', sync);
    v.addEventListener('pause', sync);
    sync();
  });

  /* ---- Service index: swap preview image on hover / focus ---- */
  var view = document.querySelector('.index__view img');
  var cap = document.querySelector('.index__view figcaption');
  if (view) {
    var rows = document.querySelectorAll('.row[data-img]');
    var show = function (row) {
      rows.forEach(function (r) { r.classList.remove('is-active'); });
      row.classList.add('is-active');
      if (view.getAttribute('src') === row.getAttribute('data-img')) return;
      view.style.opacity = '0';
      setTimeout(function () {
        view.src = row.getAttribute('data-img');
        view.alt = row.getAttribute('data-alt') || '';
        if (cap) cap.textContent = row.getAttribute('data-cap') || '';
        view.style.opacity = '1';
      }, 180);
    };
    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () { show(row); });
      row.addEventListener('focus', function () { show(row); });
    });
  }

  /* ---- Spaces scroller buttons ---- */
  var track = document.querySelector('.spaces');
  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!track) return;
      var dir = btn.getAttribute('data-scroll') === 'next' ? 1 : -1;
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
