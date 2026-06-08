// ============================================
//  SKYWIRE — Live Weather Terminal
//  JavaScript
// ============================================

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

// Weather condition icon map (OpenWeatherMap icon codes → emoji)
const ICONS = {
  '01d': '☀️',  '01n': '🌙',
  '02d': '⛅',  '02n': '🌙',
  '03d': '☁️',  '03n': '☁️',
  '04d': '☁️',  '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️',  '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️'
};

// Compass direction labels
const DIRS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

/**
 * Convert wind degrees to a compass direction label.
 */
function degToDir(deg) {
  return DIRS[Math.round(deg / 22.5) % 16];
}

/**
 * Format a Unix timestamp + timezone offset into HH:MM (UTC-adjusted).
 */
function fmtTime(unix, tz) {
  return new Date((unix + tz) * 1000).toISOString().slice(11, 16);
}

/**
 * Return a 3-letter day abbreviation from a Unix timestamp.
 */
function dayName(unix) {
  return ['SUN','MON','TUE','WED','THU','FRI','SAT'][new Date(unix * 1000).getUTCDay()];
}

/**
 * Main function: fetch current weather + 5-day forecast and render the UI.
 */
async function fetchWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;

  // Reset UI state
  document.getElementById('err').style.display       = 'none';
  document.getElementById('main-card').style.display = 'none';
  document.getElementById('loading').style.display   = 'block';

  try {
    // ── Current weather ──────────────────────────────────────────────
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error('City not found');
    const d = await res.json();

    // Populate current weather fields
    document.getElementById('city-name').textContent =
      d.name.toUpperCase();

    document.getElementById('country-line').textContent =
      `${d.sys.country}  ·  ${d.coord.lat.toFixed(2)}° N, ${d.coord.lon.toFixed(2)}° E`;

    document.getElementById('temp-big').innerHTML =
      `${Math.round(d.main.temp)}<span class="temp-unit">°C</span>`;

    document.getElementById('feels-val').textContent =
      `${Math.round(d.main.feels_like)}°`;

    document.getElementById('weather-icon').textContent =
      ICONS[d.weather[0].icon] || '🌡️';

    document.getElementById('desc').textContent =
      d.weather[0].description.toUpperCase();

    document.getElementById('humidity').innerHTML =
      `${d.main.humidity}<span class="stat-unit">%</span>`;

    document.getElementById('wind').innerHTML =
      `${Math.round(d.wind.speed * 3.6)}<span class="stat-unit">km/h</span>`;

    document.getElementById('pressure').innerHTML =
      `${d.main.pressure}<span class="stat-unit">hPa</span>`;

    document.getElementById('visibility').innerHTML =
      `${(d.visibility / 1000).toFixed(1)}<span class="stat-unit">km</span>`;

    document.getElementById('clouds').innerHTML =
      `${d.clouds.all}<span class="stat-unit">%</span>`;

    document.getElementById('wind-dir').textContent =
      degToDir(d.wind.deg || 0);

    document.getElementById('sunrise').textContent =
      fmtTime(d.sys.sunrise, d.timezone);

    document.getElementById('sunset').textContent =
      fmtTime(d.sys.sunset, d.timezone);

    // ── 5-day forecast ───────────────────────────────────────────────
    const fRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    const fd = await fRes.json();

    // Group forecast data by calendar day, tracking hi/lo temps
    const days = {};
    fd.list.forEach(item => {
      const day = new Date(item.dt * 1000).toISOString().slice(0, 10);
      if (!days[day]) {
        days[day] = { icon: item.weather[0].icon, hi: -999, lo: 999, dt: item.dt };
      }
      if (item.main.temp_max > days[day].hi) days[day].hi = item.main.temp_max;
      if (item.main.temp_min < days[day].lo) days[day].lo = item.main.temp_min;
    });

    // Render up to 5 forecast day cards
    const dayKeys = Object.keys(days).slice(0, 5);
    document.getElementById('forecast-row').innerHTML = dayKeys.map(k => `
      <div class="fc-day">
        <div class="fc-label">${dayName(days[k].dt)}</div>
        <div class="fc-icon">${ICONS[days[k].icon] || '🌡️'}</div>
        <div class="fc-temp">${Math.round(days[k].hi)}°</div>
        <div class="fc-lo">${Math.round(days[k].lo)}°</div>
      </div>
    `).join('');

    // Show the card
    document.getElementById('loading').style.display   = 'none';
    document.getElementById('main-card').style.display = 'block';

  } catch (e) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('err').style.display     = 'block';
  }
}

// Allow pressing Enter to trigger search
document.getElementById('city-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') fetchWeather();
});
