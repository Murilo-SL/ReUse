document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.ongs-grid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.ong-card');
    if (!card) return;
    const id = card.dataset.id;
    if (!id) return;
    window.location.href = `ong.html?id=${encodeURIComponent(id)}`;
  });

  // keyboard accessibility: Enter / Space opens
  grid.querySelectorAll('.ong-card[tabindex]').forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});
