document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const serieId = params.get('id');

  if (!serieId) {
    document.getElementById('serie-info').innerHTML = "<p>No se encontró ninguna serie.</p>";
    return;
  }

  fetch('/data/phones.json')
    .then(res => res.json())
    .then(data => {
      const serie = data.series.find(s => s.id === serieId);
      if (!serie) {
        document.getElementById('serie-info').innerHTML = "<p>Serie no encontrada.</p>";
        return;
      }

      renderSerie(serie);
    })
    .catch(err => {
      console.error('Error cargando phones.json', err);
      document.getElementById('serie-info').innerHTML = "<p>Error al cargar la información.</p>";
    });

  function renderSerie(serie) {
    // Cambiar título
    document.getElementById('serie-title').textContent = serie.name;

    // Crear contenido de los modelos
    const modelsHTML = serie.models.map(model => modelCardHTML(model, serie)).join('');
    document.getElementById('serie-info').innerHTML = `
      <img src="${serie.image}" alt="${serie.name}" class="serie-img">
      <h2>Modelos disponibles</h2>
      <div class="cards-grid">${modelsHTML}</div>
    `;
  }

  function modelCardHTML(model, serie) {
    const variants = model.variants.map(v => `
      <li>${v.region} • ${v.ram} / ${v.storage} • ${v.os} • $${v.priceUSD}</li>
    `).join('');

    return `
      <article class="card">
        <h3>${serie.brand} ${model.model}</h3>
        <p><strong>Pantalla:</strong> ${model.specs.display}</p>
        <p><strong>CPU:</strong> ${model.specs.cpu}</p>
        <p><strong>Batería:</strong> ${model.specs.battery}</p>
        <p><strong>Cámaras:</strong> Trasera: ${model.specs.rearCamera} | Frontal: ${model.specs.frontCamera}</p>
        <h4>Variantes</h4>
        <ul>${variants}</ul>
        <a class="btn" href="${model.officialLink}" target="_blank">Ver en web oficial</a>
      </article>
    `;
  }
});
