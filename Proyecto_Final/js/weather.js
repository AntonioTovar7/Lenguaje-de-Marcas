
function hourWanted(dateStr){
  const hour = new Date(dateStr).getHours();
  return [0,8,12,18].includes(hour);
}
function prefixIcon(url){
  if(url.startsWith('//')) return 'https:' + url;
  return url;
}

// Index: display today hours
function displayTodayHours(city, targetId){
  const container = document.getElementById(targetId);
  container.innerHTML='';
  const todayHours = climaData.forecast.forecastday[0].hour.filter(h=>hourWanted(h.time));
  todayHours.forEach(h=>{
    const div = document.createElement('div');
    div.style.border='1px solid #ccc';
    div.style.margin='4px';
    div.style.padding='4px';
    div.innerHTML = `
      <p>${h.time.split(' ')[1]}</p>
      <img src="${prefixIcon(h.condition.icon)}" alt="${h.condition.text}">
      <p>${h.temp_c}°C</p>
      <p>Viento: ${h.wind_kph} km/h</p>
      <p>Lluvia: ${h.chance_of_rain}%</p>
    `;
    container.appendChild(div);
  });
}

// Clima page: 3 days forecast
function displayThreeDays(targetId){
  const container = document.getElementById(targetId);
  container.innerHTML='';
  climaData.forecast.forecastday.slice(0,5).forEach(day=>{
    const div = document.createElement('div');
    div.style.border='1px solid #ccc';
    div.style.margin='4px';
    div.style.padding='4px';
    div.style.width='170px';
    div.innerHTML = `
      <h4>${day.date}</h4>
      <img src="${prefixIcon(day.day.condition.icon)}" alt="${day.day.condition.text}">
      <p>Máx: ${day.day.maxtemp_c}°C</p>
      <p>Mín: ${day.day.mintemp_c}°C</p>
      <p>Viento: ${day.day.maxwind_kph} km/h</p>
      <p>Lluvia: ${day.day.daily_chance_of_rain}%</p>
    `;
    container.appendChild(div);
  });
}
