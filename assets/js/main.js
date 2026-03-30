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
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function buildProjectCard(p) {
  if (!p || !p.title || !p.image || !Array.isArray(p.tags) || !Array.isArray(p.links)) return '';

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
    ? '<a href="' + safeUrl(p.github_url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(p.title) + '<span class="sr-only"> (s\'ouvre dans un nouvel onglet)</span></a>'
    : escapeHtml(p.title);

  return '<div class="project-card">'
    + '<div class="project-header">'
    + '<h3 class="project-title">' + titleLink + '</h3>'
    + '<span class="project-badge ' + escapeHtml(p.badge.class) + '">' + escapeHtml(p.badge.label) + '</span>'
    + '</div>'
    + '<p class="project-desc">' + escapeHtml(p.description) + '</p>'
    + (p.lastUpdated ? '<p class="project-date">Mis à jour le ' + formatDate(p.lastUpdated) + '</p>' : '')
    + '<div class="project-img"><img src="' + safeUrl(p.image.src) + '" alt="' + escapeHtml(p.image.alt) + '" loading="lazy"></div>'
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

document.addEventListener('DOMContentLoaded', function() {
  loadProjects();

  const copyBtn = document.querySelector('[data-action="copy-email"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const status = document.getElementById('copy-status');
      const label = copyBtn.querySelector('.copy-label');
      const originalText = label ? label.textContent : '';
      navigator.clipboard.writeText('contact.9jared99@gmail.com').then(function() {
        if (status) status.textContent = 'Adresse e-mail copiée !';
        if (label) label.textContent = 'Copié !';
        copyBtn.classList.add('is-copied');
        setTimeout(function() {
          if (status) status.textContent = '';
          if (label) label.textContent = originalText;
          copyBtn.classList.remove('is-copied');
        }, 2000);
      }).catch(function() {
        if (status) status.textContent = 'Impossible de copier — adresse : contact.9jared99@gmail.com';
        setTimeout(function() { if (status) status.textContent = ''; }, 4000);
      });
    });
  }

  const themeBtn = document.querySelector('[data-action="toggle-theme"]');
  if (themeBtn) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeBtn.setAttribute('aria-label', currentTheme === 'light' ? 'Activer le thème sombre' : 'Activer le thème clair');
    themeBtn.addEventListener('click', function() {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeBtn.setAttribute('aria-label', next === 'light' ? 'Activer le thème sombre' : 'Activer le thème clair');
    });
  }
});
