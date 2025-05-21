const WEATHER_API_KEY = 'e41143664a394d1097e181922252105';

function getWeatherForecast(city, days = 5) {
  return fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&days=${days}&lang=es`)
    .then(r => r.json());
}

function hourWanted(h) {
  const hour = new Date(h.time).getHours();
  return [0, 8, 12, 18].includes(hour);
}

// Muestra el clima de hoy para las horas 00, 08, 12, 18
function getAndDisplayToday(city, targetId) {
  getWeatherForecast(city, 1)
    .then(data => {
      const container = document.getElementById(targetId);
      container.innerHTML = '';
      const hours = data.forecast.forecastday[0].hour.filter(hourWanted);
      hours.forEach(h => {
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.padding = '4px';
        div.innerHTML = `
          <p>${h.time.split(' ')[1]}</p>
          <img src="https:${h.condition.icon}" alt="${h.condition.text}">
          <p>${h.temp_c}°C</p>
          <p>Viento: ${h.wind_kph} km/h</p>
          <p>Lluvia: ${h.chance_of_rain}%</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(console.error);
}

function displayFiveDay(city, targetId) {
  getWeatherForecast(city, 5)
    .then(data => {
      const container = document.getElementById(targetId);
      container.innerHTML = '';
      data.forecast.forecastday.forEach(day => {
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.padding = '4px';
        div.style.margin = '4px';
        div.innerHTML = `
          <h4>${day.date}</h4>
          <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
          <p>Máx: ${day.day.maxtemp_c}°C / Mín: ${day.day.mintemp_c}°C</p>
          <p>Viento: ${day.day.maxwind_kph} km/h</p>
          <p>Lluvia: ${day.day.daily_chance_of_rain}%</p>
        `;
        container.appendChild(div);
      });

      // Alertas
      const alertContainer = document.getElementById('alertas');
      if (alertContainer) {
        alertContainer.innerHTML = '';
        if (data.alerts && data.alerts.alert && data.alerts.alert.length) {
          data.alerts.alert.forEach(a => {
            const p = document.createElement('p');
            p.textContent = a.headline;
            alertContainer.appendChild(p);
          });
        } else {
          alertContainer.textContent = 'No hay alertas meteorológicas para esta ubicación.';
        }
      }
    })
    .catch(console.error);
}
