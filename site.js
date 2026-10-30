(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open', !isOpen);
      menuButton.setAttribute('aria-label', isOpen ? 'Menüyü aç' : 'Menüyü kapat');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Menüyü aç');
    }));
  }
  const aboutDialog = document.getElementById('about-dialog');
  if (aboutDialog) {
    document.querySelectorAll('[data-open-about]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      if (typeof aboutDialog.showModal === 'function') aboutDialog.showModal();
      else aboutDialog.setAttribute('open', '');
      if (nav) nav.classList.remove('open');
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    }));
    const closeDialog = aboutDialog.querySelector('.dialog-close');
    if (closeDialog) closeDialog.addEventListener('click', () => aboutDialog.close ? aboutDialog.close() : aboutDialog.removeAttribute('open'));
    aboutDialog.addEventListener('click', event => { if (event.target === aboutDialog) aboutDialog.close(); });
  }
  const backTop = document.querySelector('.back-to-top');
  const updateTop = () => { if (backTop) backTop.classList.toggle('visible', window.scrollY > 360); };
  window.addEventListener('scroll', updateTop, { passive: true });
  updateTop();
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const revealTargets = document.querySelectorAll('.product-card,.principle,.dark-feature,.screen-shot,.workflow-step,.story-inner,.contact-inner');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  }
})();
