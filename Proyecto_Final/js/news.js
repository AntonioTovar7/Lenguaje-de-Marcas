
function displayNews(targetId){
  const container = document.getElementById(targetId);
  container.innerHTML='';
  newsData.articles.forEach(n=>{
    const div = document.createElement('div');
    div.style.border='1px solid #ccc';
    div.style.margin='8px';
    div.style.padding='8px';
    div.innerHTML = `
      <img src="${n.image}" alt="imagen noticia" style="max-width:100%;">
      <h3><a href="${n.url}" target="_blank">${n.title}</a></h3>
      <p>${n.description}</p>
    `;
    container.appendChild(div);
  });
}
