import React from 'react';

// WeatherCard component to display comprehensive weather information with detailed data visualization

const WeatherCard = ({ 
  data, 
  forecastData, 
  airQualityData, 
  astronomyData, 
  alertsData, 
  marineData, 
  sportsData, 
  historicalData, 
  activeTab 
}) => {
  console.log('🌤️ WeatherCard received data for tab:', activeTab);
  
  if (!data) {
    console.error('❌ WeatherCard: No data provided');
    return <div>No weather data available</div>;
  }

  const { current, location } = data;
  const { forecast } = forecastData || {};
  const airQuality = airQualityData?.current?.air_quality;
  const astronomy = astronomyData?.astronomy?.astro;
  const alerts = alertsData?.alerts?.alert || [];
  const marine = marineData?.forecast?.forecastday || [];
  const sports = sportsData?.football || [];
  const historical = historicalData?.forecast?.forecastday || [];

  const getWeatherIcon = (conditionCode) => {
    const iconMap = {
      1000: 'fas fa-sun', // Sunny
      1003: 'fas fa-cloud-sun', // Partly cloudy
      1006: 'fas fa-cloud', // Cloudy
      1009: 'fas fa-cloud', // Overcast
      1030: 'fas fa-smog', // Mist
      1063: 'fas fa-cloud-rain', // Patchy rain
      1066: 'fas fa-snowflake', // Patchy snow
      1069: 'fas fa-cloud-rain', // Patchy sleet
      1072: 'fas fa-cloud-rain', // Freezing drizzle
      1087: 'fas fa-bolt', // Thundery outbreaks
      1114: 'fas fa-snowflake', // Blowing snow
      1117: 'fas fa-snowflake', // Blizzard
      1135: 'fas fa-smog', // Fog
      1147: 'fas fa-smog', // Freezing fog
      1150: 'fas fa-cloud-rain', // Patchy light drizzle
      1153: 'fas fa-cloud-rain', // Light drizzle
      1168: 'fas fa-cloud-rain', // Freezing drizzle
      1171: 'fas fa-cloud-rain', // Heavy freezing drizzle
      1180: 'fas fa-cloud-rain', // Patchy light rain
      1183: 'fas fa-cloud-rain', // Light rain
      1186: 'fas fa-cloud-sun-rain', // Patchy light rain
      1189: 'fas fa-cloud-rain', // Moderate rain
      1192: 'fas fa-cloud-rain', // Heavy rain
      1195: 'fas fa-cloud-rain', // Heavy rain
      1198: 'fas fa-cloud-rain', // Light freezing rain
      1201: 'fas fa-cloud-rain', // Moderate or heavy freezing rain
      1204: 'fas fa-cloud-rain', // Light sleet
      1207: 'fas fa-cloud-rain', // Moderate or heavy sleet
      1210: 'fas fa-snowflake', // Patchy light snow
      1213: 'fas fa-snowflake', // Light snow
      1216: 'fas fa-snowflake', // Patchy moderate snow
      1219: 'fas fa-snowflake', // Moderate snow
      1222: 'fas fa-snowflake', // Patchy heavy snow
      1225: 'fas fa-snowflake', // Heavy snow
      1237: 'fas fa-snowflake', // Ice pellets
      1240: 'fas fa-cloud-rain', // Light rain shower
      1243: 'fas fa-cloud-rain', // Moderate or heavy rain shower
      1246: 'fas fa-cloud-rain', // Torrential rain shower
      1249: 'fas fa-cloud-rain', // Light sleet showers
      1252: 'fas fa-cloud-rain', // Moderate or heavy sleet showers
      1255: 'fas fa-snowflake', // Light snow showers
      1258: 'fas fa-snowflake', // Moderate or heavy snow showers
      1261: 'fas fa-snowflake', // Light showers of ice pellets
      1264: 'fas fa-snowflake', // Moderate or heavy showers of ice pellets
      1273: 'fas fa-bolt', // Patchy light rain with thunder
      1276: 'fas fa-bolt', // Moderate or heavy rain with thunder
      1279: 'fas fa-bolt', // Patchy light snow with thunder
      1282: 'fas fa-bolt' // Moderate or heavy snow with thunder
    };
    return iconMap[conditionCode] || 'fas fa-cloud';
  };

  const getAirQualityColor = (aqi) => {
    if (aqi <= 1) return '#00e400'; // Good - Green
    if (aqi <= 2) return '#ffff00'; // Moderate - Yellow
    if (aqi <= 3) return '#ff7e00'; // Unhealthy for Sensitive - Orange
    if (aqi <= 4) return '#ff0000'; // Unhealthy - Red
    if (aqi <= 5) return '#8f3f97'; // Very Unhealthy - Purple
    return '#7e0023'; // Hazardous - Maroon
  };

  const getAirQualityText = (aqi) => {
    const levels = ['Good', 'Moderate', 'Unhealthy for Sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
    return levels[aqi - 1] || 'Unknown';
  };

  // Render Current Weather Tab
  const renderCurrentTab = () => (
    <div className="tab-content">
      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="weather-alerts">
          <h3 className="alerts-title">
            <i className="fas fa-exclamation-triangle"></i>
            Weather Alerts ({alerts.length})
          </h3>
          {alerts.slice(0, 2).map((alert, index) => (
            <div key={index} className="alert-item">
              <strong>{alert.headline}</strong>
              <p>{alert.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Main Weather Header */}
      <div className="weather-header">
        <div className="location">
          <h2 className="city-name">
            <i className="fas fa-map-marker-alt"></i>
            {location?.name}, {location?.country}
          </h2>
          <p className="location-details">
            {location?.region && `${location.region}, `}
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="weather-icon">
          <i className={getWeatherIcon(current?.condition?.code)}></i>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{Math.round(current?.temp_c)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="weather-description">
          <h3>{current?.condition?.text}</h3>
          <p>Feels like {Math.round(current?.feelslike_c)}°C</p>
        </div>
      </div>

      {/* Air Quality Section */}
      {airQuality && (
        <div className="air-quality-section">
          <h4 className="section-title">
            <i className="fas fa-wind"></i>
            Air Quality
          </h4>
          <div className="air-quality-display">
            <div className="aqi-circle" style={{ backgroundColor: getAirQualityColor(airQuality['us-epa-index']) }}>
              <span className="aqi-value">{airQuality['us-epa-index']}</span>
            </div>
            <div className="aqi-info">
              <span className="aqi-label">{getAirQualityText(airQuality['us-epa-index'])}</span>
              <div className="aqi-details">
                <span>PM2.5: {airQuality.pm2_5?.toFixed(1)}</span>
                <span>PM10: {airQuality.pm10?.toFixed(1)}</span>
                <span>O₃: {airQuality.o3?.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Astronomy Section */}
      {astronomy && (
        <div className="astronomy-section">
          <h4 className="section-title">
            <i className="fas fa-sun"></i>
            Sun & Moon
          </h4>
          <div className="astronomy-details">
            <div className="astro-item">
              <i className="fas fa-sun"></i>
              <span>Sunrise: {astronomy.sunrise}</span>
            </div>
            <div className="astro-item">
              <i className="fas fa-moon"></i>
              <span>Sunset: {astronomy.sunset}</span>
            </div>
            <div className="astro-item">
              <i className="fas fa-moon"></i>
              <span>Moon Phase: {astronomy.moon_phase}</span>
            </div>
          </div>
        </div>
      )}

      {/* Weather Details Grid */}
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">
            <i className="fas fa-tint"></i>
          </div>
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{current?.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <i className="fas fa-wind"></i>
          </div>
          <div className="detail-content">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{current?.wind_kph} km/h</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <i className="fas fa-thermometer-half"></i>
          </div>
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{current?.pressure_mb} mb</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <i className="fas fa-eye"></i>
          </div>
          <div className="detail-content">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{current?.vis_km} km</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <i className="fas fa-thermometer-quarter"></i>
          </div>
          <div className="detail-content">
            <span className="detail-label">UV Index</span>
            <span className="detail-value">{current?.uv}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <i className="fas fa-cloud-rain"></i>
          </div>
          <div className="detail-content">
            <span className="detail-label">Precipitation</span>
            <span className="detail-value">{current?.precip_mm} mm</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render 14-Day Forecast Tab
  const renderForecastTab = () => (
    <div className="tab-content">
      <div className="forecast-header">
        <h3 className="section-title">
          <i className="fas fa-calendar-alt"></i>
          14-Day Weather Forecast
        </h3>
      </div>
      
      <div className="forecast-grid-extended">
        {forecast?.forecastday?.map((day, index) => (
          <div key={index} className="forecast-day-extended">
            <div className="forecast-date">
              {new Date(day.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            <div className="forecast-icon">
              <i className={getWeatherIcon(day.day.condition.code)}></i>
            </div>
            <div className="forecast-condition">
              {day.day.condition.text}
            </div>
            <div className="forecast-temps">
              <span className="forecast-high">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="forecast-low">{Math.round(day.day.mintemp_c)}°</span>
            </div>
            <div className="forecast-details">
              <div className="forecast-detail-item">
                <i className="fas fa-tint"></i>
                <span>{day.day.avghumidity}%</span>
              </div>
              <div className="forecast-detail-item">
                <i className="fas fa-wind"></i>
                <span>{day.day.maxwind_kph} km/h</span>
              </div>
              <div className="forecast-detail-item">
                <i className="fas fa-cloud-rain"></i>
                <span>{day.day.totalprecip_mm}mm</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  // Render based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'current':
        return renderCurrentTab();
      case 'forecast':
        return renderForecastTab();
      default:
        return renderCurrentTab();
    }
  };

  return (
    <div className="weather-card">
      {renderTabContent()}
    </div>
  );
};

export default WeatherCard;