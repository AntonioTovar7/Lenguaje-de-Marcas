const NEWS_API_KEY = '7f4b3db55be55a1164d41562ba3bb8ee';

function loadNews(targetId) {
  const url = `https://gnews.io/api/v4/top-headlines?lang=es&country=es&max=5&apikey=${NEWS_API_KEY}`;
  fetch(url)
    .then(r => r.json())
    .then(data => {
      console.log('GNews response:', data); // depuración
      const container = document.getElementById(targetId);
      container.innerHTML = '';
      if (!data.articles || !data.articles.length) {
        container.textContent = 'No se pudieron cargar las noticias.';
        return;
      }
      data.articles.forEach(n => {
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.margin = '8px';
        div.style.padding = '8px';
        div.style.background = '#f9f9f9';
        div.innerHTML = `
          ${n.image ? `<img src="${n.image}" alt="imagen noticia" style="max-width:100px;">` : ''}
          <h3><a href="${n.url}" target="_blank">${n.title}</a></h3>
          <p>${n.description || ''}</p>
          <small>${n.source?.name || ''}</small>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById(targetId).textContent = 'Error al cargar noticias.';
    });
}
