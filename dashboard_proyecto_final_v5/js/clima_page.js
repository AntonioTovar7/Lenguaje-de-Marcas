document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('city-select');

  function update() {
    getAndDisplayToday(sel.value, 'clima-hoy');
    displayFiveDay(sel.value, 'clima-cinco');
  }

  sel.addEventListener('change', update);
  sel.value = 'Málaga'; update();
});
