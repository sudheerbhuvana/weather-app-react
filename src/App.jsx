import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

// Weather App - Main application component with comprehensive weather data handling

const API_KEY = import.meta.env.VITE_API_KEY; 
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// Weather API integration with comprehensive error handling and fallback mechanisms

console.log('🔑 Environment check:');
console.log('VITE_API_KEY from env:', import.meta.env.VITE_API_KEY);
console.log('Final API_KEY:', API_KEY);
console.log('All env vars:', import.meta.env);

// Main App component for weather application
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [astronomyData, setAstronomyData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('London');
  const [activeTab, setActiveTab] = useState('current');

  const fetchWeatherData = async (city) => {
    console.log('🌤️ Starting comprehensive weather fetch for city:', city);
    console.log('🔑 API Key:', API_KEY);
    setLoading(true);
    setError(null);
    
    try {
      const [currentResponse, forecastResponse, airQualityResponse, astronomyResponse, alertsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=yes`),
        fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=14&aqi=yes&alerts=yes`),
        fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=yes`),
        fetch(`${API_BASE_URL}/astronomy.json?key=${API_KEY}&q=${city}`),
        fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&alerts=yes`)
      ]);

      console.log('📡 All API requests completed');

      const responses = [currentResponse, forecastResponse, airQualityResponse, astronomyResponse, alertsResponse];
      const failedResponse = responses.find(r => !r.ok);
      
      if (failedResponse) {
        const errorData = await failedResponse.json();
        console.error('❌ API Error Response:', errorData);
        
        if (failedResponse.status === 401) {
          throw new Error('Invalid API key. Please check your WeatherAPI.com key.');
        } else if (failedResponse.status === 400) {
          throw new Error('Invalid location. Please try a different city name.');
        } else if (failedResponse.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`API Error (${failedResponse.status}): ${errorData.error?.message || 'Unknown error'}`);
        }
      }

      const [currentData, forecastData, airQualityData, astronomyData, alertsData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json(),
        airQualityResponse.json(),
        astronomyResponse.json(),
        alertsResponse.json()
      ]);

      console.log('✅ All API responses parsed successfully');

      setWeatherData(currentData);
      setForecastData(forecastData);
      setAirQualityData(airQualityData);
      setAstronomyData(astronomyData);
      setAlertsData(alertsData);
      
      console.log('✅ All weather data set successfully');
    } catch (err) {
      console.error('❌ Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('🏁 Loading finished');
    }
  };

  const handleSearch = (city) => {
    console.log('🔍 Search triggered for city:', city);
    if (city.trim()) {
      console.log('✅ Valid city name, proceeding with search');
      setLocation(city);
      fetchWeatherData(city);
    } else {
      console.log('❌ Empty city name provided');
    }
  };

  useEffect(() => {
    console.log('🚀 App mounted, fetching initial weather for:', location);
    fetchWeatherData(location);
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">
            <i className="fas fa-cloud-sun"></i>
            Weather App
          </h1>
          <p className="app-subtitle">Get current weather information</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {weatherData && !loading && !error && (
          <>
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
                onClick={() => setActiveTab('current')}
              >
                <i className="fas fa-sun"></i>
                Current Weather
              </button>
              <button 
                className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
                onClick={() => setActiveTab('forecast')}
              >
                <i className="fas fa-calendar-alt"></i>
                14-Day Forecast
              </button>
            </div>

            <WeatherCard 
              data={weatherData}
              forecastData={forecastData}
              airQualityData={airQualityData}
              astronomyData={astronomyData}
              alertsData={alertsData}
              activeTab={activeTab}
            />
          </>
        )}
        
        <footer className="app-footer">
          <p>Made with ❤️ by Sudheer</p>
        </footer>
      </div>
    </div>
  );
}

export default App;