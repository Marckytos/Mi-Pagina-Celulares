document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/phones.json')
    .then(res => res.json())
    .then(data => renderSeries(data.series))
    .catch(err => {
      console.error('Error cargando phones.json', err);
      const c = document.getElementById('series-list');
      if (c) c.innerHTML = '<p>No se pudieron cargar los lanzamientos.</p>';
    });

  function renderSeries(series) {
    const container = document.getElementById('series-list');
    if (!container) return;
    container.innerHTML = series.map(serieCardHTML).join('');
  }

  function serieCardHTML(serie) {
    const img = serie.image || '/Recursos/Imagenes/placeholder.png';
    return `
      <article class="card">
        <img src="${img}" alt="${escapeHtml(serie.name)}" class="card-img">
        <div class="card-body">
          <h3>${escapeHtml(serie.name)}</h3>
          <p class="release">Lanzamiento: ${escapeHtml(serie.releaseDate)}</p>
          <p class="small">Modelos incluidos: ${serie.models.length}</p>
          <a class="btn" href="series.html?id=${serie.id}">Ver serie completa</a>
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
