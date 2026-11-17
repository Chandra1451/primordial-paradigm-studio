// Essay page: the cell strip at the top fills as the reader scrolls. No other motion.
(() => {
  const fill = document.getElementById('progress');
  let queued = false;

  function update() {
    queued = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const share = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 1;
    fill.style.transform = `scaleX(${share.toFixed(4)})`;
    fill.dataset.share = share.toFixed(3);
  }

  function request() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();
})();
