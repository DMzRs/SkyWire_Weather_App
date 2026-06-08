# 🌤️ SKYWIRE — Live Weather Terminal

> A clean, dark-themed weather web app built as a personal project. Pulls real-time weather data and displays it in a terminal-inspired UI.

---

## 📸 Preview

Search any city and get:
- Current temperature, weather condition, and "feels like"
- Humidity, wind speed & direction, pressure, visibility, and cloud cover
- Sunrise & sunset times (adjusted to the city's local timezone)
- 5-day forecast with daily highs and lows

---

## 🗂️ Project Structure

```
skywire/
├── index.html    # Markup / structure
├── style.css     # All styles and animations
├── app.js        # Weather fetching and DOM logic
└── README.md     # You're reading this
```

---

## 🚀 To use:

1. Download or clone the project files
2. Make sure all three files (`index.html`, `style.css`, `app.js`) are in the **same folder**
3. Open `index.html` in any modern browser
4. Type a city name and hit **SCAN** (or press `Enter`)

---

## 🔑 API

This project uses the **OpenWeatherMap API** (free tier).

The app currently uses a public demo key. If you want your own:

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Copy your API key
3. Open `app.js` and replace line 7:

```js
const API_KEY = 'your_api_key_here';
```

> ⚠️ Free tier allows up to **60 calls/minute** and **5-day forecasts** — more than enough for personal use.

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Structure and markup |
| CSS3 | Styling, animations, responsive layout |
| Vanilla JavaScript | API calls, DOM manipulation |
| [OpenWeatherMap API](https://openweathermap.org/api) | Live weather data |
| [Google Fonts](https://fonts.google.com/) | Bebas Neue + DM Mono typefaces |

---

## ✨ Features

- **Real-time data** — current conditions fetched fresh on every search
- **5-day forecast** — grouped by day with hi/lo temps
- **Wind compass** — converts degrees to N / NNE / NE / etc.
- **Local sunrise & sunset** — timezone-corrected for any city
- **Responsive** — works on mobile and desktop
- **Grain texture overlay** — purely aesthetic, because why not

---

## 📄 License

This project is open for learning and personal use. Do whatever you want with it — just don't sell it as your own commercial product without crediting the API source.

---

*Powered by [OpenWeatherMap](https://openweathermap.org)*