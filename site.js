/* Shared behaviour for every page: theme toggle, mobile nav, TOC highlight,
   filter + accordion, tabs. No dependencies. */
(function () {
  var root = document.documentElement;

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncThemeButtons() {
    var isDark = effectiveTheme() === 'dark';
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
      btn.title = isDark ? 'Light mode' : 'Dark mode';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // ── theme ──
    syncThemeButtons();
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        store('theme', next);
        syncThemeButtons();
      });
    });

    // ── mobile nav ──
    var navToggle = document.querySelector('.nav-toggle');
    var navList = document.querySelector('.nav-list');
    if (navToggle && navList) {
      navToggle.addEventListener('click', function () {
        var open = navList.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      navList.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navList.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // ── footer year ──
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // ── gallery slots: show the image once the file exists, keep the placeholder otherwise ──
    document.querySelectorAll('.ph-frame[data-src]').forEach(function (frame) {
      var img = new Image();
      img.alt = frame.getAttribute('data-alt') || '';
      img.onload = function () {
        frame.innerHTML = '';
        var link = document.createElement('a');
        link.href = img.src;
        link.target = '_blank';
        link.rel = 'noopener';
        link.title = '원본 크기로 보기';
        link.style.display = 'contents';
        link.appendChild(img);
        frame.appendChild(link);
        frame.classList.add('has-img');
      };
      img.src = frame.getAttribute('data-src');
    });

    // ── TOC highlight (case-study pages) ──
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
    if (tocLinks.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          tocLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      tocLinks.forEach(function (a) {
        var t = document.querySelector(a.getAttribute('href'));
        if (t) io.observe(t);
      });
    }

    // ── filter chips → accordion items ──
    document.querySelectorAll('[data-filter-group]').forEach(function (bar) {
      var target = document.getElementById(bar.getAttribute('data-filter-group'));
      if (!target) return;
      var items = Array.prototype.slice.call(target.querySelectorAll('[data-cat]'));
      var counter = document.querySelector('[data-filter-count="' + target.id + '"]');
      function apply(cat) {
        var shown = 0;
        items.forEach(function (it) {
          var hit = cat === 'all' || it.getAttribute('data-cat') === cat;
          it.hidden = !hit;
          if (hit) shown += 1;
        });
        if (counter) counter.textContent = shown + ' / ' + items.length + '건 표시';
      }
      bar.querySelectorAll('.chip[data-filter]').forEach(function (chip) {
        chip.addEventListener('click', function () {
          bar.querySelectorAll('.chip[data-filter]').forEach(function (c) {
            c.classList.toggle('is-active', c === chip);
            c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
          });
          apply(chip.getAttribute('data-filter'));
        });
      });
      apply('all');
    });

    // expand / collapse all
    document.querySelectorAll('[data-acc-toggle]').forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute('data-acc-toggle'));
      if (!target) return;
      btn.addEventListener('click', function () {
        var details = target.querySelectorAll('details:not([hidden])');
        var anyClosed = Array.prototype.some.call(details, function (d) { return !d.open; });
        details.forEach(function (d) { d.open = anyClosed; });
        btn.textContent = anyClosed ? '모두 접기' : '모두 펼치기';
      });
    });

    // ── tabs (role=tablist with data-tabs) ──
    document.querySelectorAll('[data-tabs]').forEach(function (list) {
      var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab, false); });
        tab.addEventListener('keydown', function (e) {
          var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!dir) return;
          e.preventDefault();
          select(tabs[(i + dir + tabs.length) % tabs.length], true);
        });
      });
      var initial = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
      if (initial) select(initial, false);
    });
  });
})();
