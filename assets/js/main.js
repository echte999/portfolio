document.addEventListener('DOMContentLoaded', function () {
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
