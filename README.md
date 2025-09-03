# Weather App - React + Vite

## Tech Stack
- React 18.2.0
- Vite 7.1.7
- WeatherAPI.com
- CSS3 + Flexbox/Grid
- Docker

## API Endpoints

### Base URL: `https://api.weatherapi.com/v1`

#### Current Weather
```
GET /current.json?key={API_KEY}&q={city}&aqi=yes
```

#### 14-Day Forecast
```
GET /forecast.json?key={API_KEY}&q={city}&days=14&aqi=yes&alerts=yes
```

#### Astronomy Data
```
GET /astronomy.json?key={API_KEY}&q={city}
```

#### Weather Alerts
```
GET /forecast.json?key={API_KEY}&q={city}&days=3&alerts=yes
```

#### Historical Weather
```
GET /history.json?key={API_KEY}&q={city}&dt={date}
```

#### Marine Weather
```
GET /marine.json?key={API_KEY}&q={city}&days=3
```

#### Sports Weather
```
GET /sports.json?key={API_KEY}&q={city}
```

## Environment Variables
```
VITE_API_KEY=your_weatherapi_key
```

## Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## Docker Deployment
```bash
# Build Docker image
docker build -t weather-app .

# Run container
docker run -p 3000:3000 weather-app
```


---

Made with ❤️ by Sudheer