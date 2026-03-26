document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('[data-action="copy-email"]');
  if (!btn) return;
  btn.addEventListener('click', function () {
    navigator.clipboard.writeText('contact.9jared99@gmail.com').then(function () {
      var label = btn.querySelector('.copy-label');
      label.textContent = 'Copié !';
      setTimeout(function () {
        label.textContent = 'contact.9jared99@gmail.com';
      }, 2000);
    });
  });
});
