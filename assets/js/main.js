const ICONS = {
  download: '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  github: '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>'
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeUrl(url) {
  if (!url) return '#';
  if (/^javascript:/i.test(String(url))) return '#';
  return url;
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

function buildProjectCard(p) {
  if (!p || !p.title || !Array.isArray(p.tags) || !Array.isArray(p.links)) return '';

  const tags = p.tags.map(function(t) {
    return '<span class="tag">' + escapeHtml(t) + '</span>';
  }).join('');

  const links = p.links.map(function(l) {
    let attrs = 'href="' + safeUrl(l.href) + '" class="' + escapeHtml(l.class) + '" aria-label="' + escapeHtml(l.label) + ' \u2014 ' + escapeHtml(p.title) + '"';
    if (l.download) attrs += ' download';
    if (l.external) attrs += ' target="_blank" rel="noopener noreferrer"';
    return '<a ' + attrs + '>' + (ICONS[l.icon] || '') + ' ' + escapeHtml(l.label) + '</a>';
  }).join('');

  const titleLink = p.github_url
    ? '<a href="' + safeUrl(p.github_url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(p.title) + '<span class="sr-only"> (opens in a new tab)</span></a>'
    : escapeHtml(p.title);

  const timeSaved = (p.timeSaved && p.timeSaved.value)
    ? '<p class="project-roi">'
        + '<svg class="project-roi-icon" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
        + '<strong>' + escapeHtml(p.timeSaved.value) + '</strong>'
        + (p.timeSaved.label ? ' <span>' + escapeHtml(p.timeSaved.label) + '</span>' : '')
      + '</p>'
    : '';

  return '<div class="project-card">'
    + '<div class="project-header">'
    + '<h3 class="project-title">' + titleLink + '</h3>'
    + '<span class="project-badge ' + escapeHtml(p.badge.class) + '">' + escapeHtml(p.badge.label) + '</span>'
    + '</div>'
    + '<p class="project-desc">' + escapeHtml(p.description) + '</p>'
    + timeSaved
    + (p.lastUpdated ? '<p class="project-date">Updated ' + formatDate(p.lastUpdated) + '</p>' : '')
    + ((p.image && p.image.src) ? '<div class="project-img"><img src="' + safeUrl(p.image.src) + '" alt="' + escapeHtml(p.image.alt) + '" loading="lazy"></div>' : '')
    + '<div class="tag-row">' + tags + '</div>'
    + '<div class="project-links">' + links + '</div>'
    + '</div>';
}

function loadProjects() {
  const grid = document.getElementById('project-grid');
  const errorEl = document.getElementById('project-error');
  if (!grid) return;

  fetch('data/projects.json')
    .then(function(r) {
      if (!r.ok) throw new Error();
      return r.json();
    })
    .then(function(data) {
      if (!Array.isArray(data.projects)) throw new Error();
      grid.innerHTML = data.projects.map(buildProjectCard).join('');
    })
    .catch(function() {
      if (errorEl) errorEl.removeAttribute('hidden');
    });
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

  [['Why', m.why], ['Skill', m.skill]].forEach(function(row) {
    if (!row[1]) return;
    const p = createEl('p');
    p.appendChild(createEl('span', 'timeline-detail-label', row[0]));
    p.appendChild(document.createTextNode(row[1]));
    detail.appendChild(p);
  });

  const links = (Array.isArray(m.links) ? m.links : []).filter(function(l) { return l && l.label && l.href; });
  if (links.length) {
    const list = createEl('div', 'timeline-links');
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

function revealTimeline(items) {
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
    item.classList.add('timeline-reveal');
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
      revealTimeline(items);

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

document.addEventListener('DOMContentLoaded', function() {
  loadProjects();
  loadTimeline();

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
