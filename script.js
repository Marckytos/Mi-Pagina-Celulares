document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/phones.json')
    .then(res => res.json())
    .then(phones => renderPhones(phones))
    .catch(err => {
      console.error('Error cargando phones.json', err);
      const c = document.getElementById('lanzamientos-list');
      if (c) c.innerHTML = '<p>No se pudieron cargar los lanzamientos.</p>';
    });

  function renderPhones(phones) {
    const container = document.getElementById('lanzamientos-list');
    if (!container) return;
    container.innerHTML = phones.map(phoneCardHTML).join('');
  }

  function phoneCardHTML(phone) {
    const img = phone.images && phone.images[0] ? phone.images[0] : '/Recursos/Imagenes/placeholder.png';
    return `
      <article class="card">
        <img src="${img}" alt="${phone.brand} ${phone.model}" class="card-img">
        <div class="card-body">
          <h3>${escapeHtml(phone.brand)} ${escapeHtml(phone.model)}</h3>
          <p class="release">Lanzamiento: ${escapeHtml(phone.releaseDate)}</p>
          <p class="small">${escapeHtml(phone.specs.display)} • ${escapeHtml(phone.specs.cpu)}</p>
          <a class="btn" href="phone.html?id=${phone.id}">Ver ficha</a>
        </div>
      </article>
    `;
  }

  // pequeña función para evitar inyección accidental
  function escapeHtml(text) {
    if (!text && text !== 0) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
