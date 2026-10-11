function safeUrl(url) {
  if (!url) return '#';
  if (/^javascript:/i.test(String(url))) return '#';
  return url;
}

const TIMELINE_PHASES = {
  foundations: 'Foundations',
  automations: 'Automations',
  samourai: 'Samouraï',
  builder: 'Builder'
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonth(value) {
  const match = /^(\d{4})-(\d{2})$/.exec(String(value));
  if (!match || !MONTHS[match[2] - 1]) return '';
  return MONTHS[match[2] - 1] + ' ' + match[1];
}

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function buildTimelineDate(m) {
  const start = formatMonth(m.date);
  if (!start) return createEl('span', 'timeline-date', 'Date to be defined');
  const end = formatMonth(m.dateEnd);
  const time = createEl('time', 'timeline-date', end ? start + ' – ' + end : start);
  time.setAttribute('datetime', m.date);
  return time;
}

function buildTimelineDetail(m, id) {
  const detail = createEl('div', 'timeline-detail');
  detail.id = id;
  detail.hidden = true;

  function addRow(label, text) {
    if (!text) return;
    const p = createEl('p');
    p.appendChild(createEl('span', 'timeline-detail-label', label));
    p.appendChild(document.createTextNode(text));
    detail.appendChild(p);
  }

  addRow('Why', m.why);
  if (Array.isArray(m.structure) && m.structure.length) {
    detail.appendChild(createEl('p', 'timeline-detail-label', 'How it works'));
    const pre = createEl('pre', 'timeline-structure', m.structure.join('\n'));
    pre.setAttribute('tabindex', '0');
    pre.setAttribute('role', 'group');
    pre.setAttribute('aria-label', 'How it works — ' + m.title);
    detail.appendChild(pre);
  }
  addRow('Skill', m.skill);

  const links = (Array.isArray(m.links) ? m.links : []).filter(function(l) { return l && l.label && l.href; });
  if (links.length) {
    const list = createEl('div', 'timeline-links');
    if (m.linksTitle) {
      list.classList.add('timeline-links-box');
      list.appendChild(createEl('p', 'timeline-detail-label', m.linksTitle));
    }
    links.forEach(function(l) {
      const external = /^https?:/i.test(l.href);
      const a = createEl('a', external ? 'btn-gh' : 'btn-dl', l.label);
      a.setAttribute('href', safeUrl(l.href));
      a.setAttribute('aria-label', l.label + ' — ' + m.title + (external ? ' (opens in a new tab)' : ''));
      if (l.download) a.setAttribute('download', '');
      if (external) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
      list.appendChild(a);
    });
    detail.appendChild(list);
  }
  return detail;
}

function buildTimelineItem(m, index) {
  const detailId = 'timeline-detail-' + index;
  const metaId = 'timeline-meta-' + index;
  const item = createEl('li', 'timeline-item');
  item.dataset.phase = m.phase;

  const card = createEl('div', 'timeline-card');
  const meta = createEl('p', 'timeline-meta');
  meta.id = metaId;
  meta.appendChild(buildTimelineDate(m));
  meta.appendChild(createEl('span', 'timeline-phase', TIMELINE_PHASES[m.phase]));

  const title = createEl('h3', 'timeline-title');
  const toggle = createEl('button', 'timeline-toggle', m.title);
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', detailId);
  toggle.setAttribute('aria-describedby', metaId);
  toggle.appendChild(createEl('span', 'timeline-toggle-icon', '+')).setAttribute('aria-hidden', 'true');
  title.appendChild(toggle);

  const detail = buildTimelineDetail(m, detailId);
  toggle.addEventListener('click', function() {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    detail.hidden = open;
  });

  card.appendChild(meta);
  card.appendChild(title);
  card.appendChild(detail);
  item.appendChild(card);
  return item;
}

function filterTimeline(items, phase) {
  let shown = 0;
  items.forEach(function(item) {
    const match = phase === 'all' || item.dataset.phase === phase;
    item.hidden = !match;
    if (!match) return;
    item.classList.toggle('is-right', shown % 2 === 1);
    shown += 1;
  });
  return shown;
}

function revealOnScroll(items) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reducedMotion) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  items.forEach(function(item) {
    item.classList.add('reveal');
    observer.observe(item);
  });
}

function loadTimeline() {
  const list = document.getElementById('timeline-list');
  const errorEl = document.getElementById('timeline-error');
  const status = document.getElementById('timeline-status');
  const filters = Array.prototype.slice.call(document.querySelectorAll('.timeline-filter'));
  if (!list) return;

  fetch('data/timeline.json')
    .then(function(r) {
      if (!r.ok) throw new Error();
      return r.json();
    })
    .then(function(data) {
      if (!Array.isArray(data.milestones)) throw new Error();
      const items = data.milestones
        .filter(function(m) { return m && m.title && Object.prototype.hasOwnProperty.call(TIMELINE_PHASES, m.phase); })
        .map(buildTimelineItem);
      items.forEach(function(item) { list.appendChild(item); });
      filterTimeline(items, 'all');
      revealOnScroll(items);

      filters.forEach(function(btn) {
        btn.addEventListener('click', function() {
          filters.forEach(function(b) { b.setAttribute('aria-pressed', String(b === btn)); });
          const shown = filterTimeline(items, btn.dataset.phase);
          if (status) status.textContent = btn.textContent + ': ' + shown + (shown === 1 ? ' milestone shown' : ' milestones shown');
        });
      });
    })
    .catch(function() {
      filters.forEach(function(btn) { btn.disabled = true; });
      if (errorEl) errorEl.removeAttribute('hidden');
    });
}

function initArchitecture() {
  const nodes = Array.prototype.slice.call(document.querySelectorAll('.arch-node'));
  nodes.forEach(function(node) {
    node.addEventListener('click', function() {
      const open = node.getAttribute('aria-expanded') === 'true';
      nodes.forEach(function(n) {
        n.setAttribute('aria-expanded', 'false');
        document.getElementById(n.getAttribute('aria-controls')).hidden = true;
      });
      if (open) return;
      node.setAttribute('aria-expanded', 'true');
      document.getElementById(node.getAttribute('aria-controls')).hidden = false;
    });
  });
}

function initScrollProgress() {
  const root = document.documentElement;
  function update() {
    const max = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--scroll', max > 0 ? window.scrollY / max : 0);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initNavSpy() {
  if (!('IntersectionObserver' in window)) return;
  const links = Array.prototype.slice.call(document.querySelectorAll('nav ul a'));
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function(a) {
        if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section').forEach(function(section) { observer.observe(section); });
}

document.addEventListener('DOMContentLoaded', function() {
  loadTimeline();
  initArchitecture();
  initScrollProgress();
  initNavSpy();
  revealOnScroll(Array.prototype.slice.call(document.querySelectorAll('section:not(#hero) h2, .reports-intro, .timeline-filters, .arch-layer, .report-row, .contact-inner')));

  const copyBtn = document.querySelector('[data-action="copy-email"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const status = document.getElementById('copy-status');
      const label = copyBtn.querySelector('.copy-label');
      const originalText = label ? label.textContent : '';
      navigator.clipboard.writeText('contact.9jared99@gmail.com').then(function() {
        if (status) status.textContent = 'Email address copied!';
        if (label) label.textContent = 'Copied!';
        copyBtn.classList.add('is-copied');
        setTimeout(function() {
          if (status) status.textContent = '';
          if (label) label.textContent = originalText;
          copyBtn.classList.remove('is-copied');
        }, 2000);
      }).catch(function() {
        if (status) status.textContent = 'Could not copy — address: contact.9jared99@gmail.com';
        setTimeout(function() { if (status) status.textContent = ''; }, 4000);
      });
    });
  }

  const themeBtn = document.querySelector('[data-action="toggle-theme"]');
  if (themeBtn) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeBtn.setAttribute('aria-label', currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    themeBtn.addEventListener('click', function() {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeBtn.setAttribute('aria-label', next === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    });
  }
});
