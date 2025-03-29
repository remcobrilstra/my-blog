'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    
    if (!API_KEY) {
      setError('OpenWeather API key is not configured');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(
          response.status === 404 
            ? 'City not found' 
            : 'Failed to fetch weather data'
        );
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && city) {
      fetchWeather();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>
      
      <div className="mb-6">
        <label htmlFor="city-input" className="sr-only">
          Enter city name
        </label>
        <input
          id="city-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
          className="p-2 border rounded mr-2"
          aria-label="City name"
          disabled={loading}
        />
        <Button
          onClick={fetchWeather}
          disabled={loading || !city}
          aria-label="Get weather information"
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4" role="alert">
          {error}
        </div>
      )}

      {weather && (
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{weather.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-4xl mb-2">{Math.round(weather.main.temp)}°C</p>
              <p className="text-gray-600">Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div>
              <p className="mb-2">
                {weather.weather[0].main} - {weather.weather[0].description}
              </p>
              <img
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="w-16 h-16"
              />
            </div>
            <div>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}