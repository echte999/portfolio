var ICONS = {
  download: '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  github: '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>'
};

function formatDate(iso) {
  var d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function buildProjectCard(p) {
  var tags = p.tags.map(function (t) {
    return '<span class="tag">' + t + '</span>';
  }).join('');

  var links = p.links.map(function (l) {
    var attrs = 'href="' + l.href + '" class="' + l.class + '" aria-label="' + l.label + ' \u2014 ' + p.title + '"';
    if (l.download) attrs += ' download';
    if (l.external) attrs += ' target="_blank" rel="noopener noreferrer"';
    return '<a ' + attrs + '>' + ICONS[l.icon] + ' ' + l.label + '</a>';
  }).join('');

  return '<div class="project-card">'
    + '<div class="project-header">'
    + '<h3 class="project-title"><a href="' + p.github_url + '" target="_blank" rel="noopener noreferrer">' + p.title + '</a></h3>'
    + '<span class="project-badge ' + p.badge.class + '">' + p.badge.label + '</span>'
    + '</div>'
    + '<p class="project-desc">' + p.description + '</p>'
    + (p.lastUpdated ? '<p class="project-date">Mis à jour le ' + formatDate(p.lastUpdated) + '</p>' : '')
    + '<div class="project-img"><img src="' + p.image.src + '" alt="' + p.image.alt + '" loading="lazy"></div>'
    + '<div class="tag-row">' + tags + '</div>'
    + '<div class="project-links">' + links + '</div>'
    + '</div>';
}

function loadProjects() {
  var grid = document.getElementById('project-grid');
  var errorEl = document.getElementById('project-error');
  if (!grid) return;

  fetch('data/projects.json')
    .then(function (r) {
      if (!r.ok) throw new Error();
      return r.json();
    })
    .then(function (data) {
      grid.innerHTML = data.projects.map(buildProjectCard).join('');
    })
    .catch(function () {
      if (errorEl) errorEl.removeAttribute('hidden');
    });
}

document.addEventListener('DOMContentLoaded', function () {
  loadProjects();

  var copyBtn = document.querySelector('[data-action="copy-email"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText('contact.9jared99@gmail.com').then(function () {
        var label = copyBtn.querySelector('.copy-label');
        label.textContent = 'Copié !';
        setTimeout(function () {
          label.textContent = 'contact.9jared99@gmail.com';
        }, 2000);
      });
    });
  }

  var themeBtn = document.querySelector('[data-action="toggle-theme"]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
});
