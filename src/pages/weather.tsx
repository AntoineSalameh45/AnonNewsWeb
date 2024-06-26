import { useState, useEffect } from 'react';
import axios from 'axios';

import AppHeader from "../components/Organisms/AppHeader";
import NavBar from "../components/Organisms/NavBar";
import BigCityWeather from '../components/Molecules/BigCityWeather';

export interface iWeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
    };
}
export interface iForecastData {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
        };
    };
}

const Weather = () => {
    const bgimg = 'src/assets/bg/img5.jpg';
    const [currentWeatherData, setCurrentWeatherData] = useState<iWeatherData | null>(null);
    const [forecastData, setForecastData] = useState<iForecastData[]>([]);

    const apiKey = import.meta.env.VITE_WEATHER_API;

    useEffect(() => {
        const fetchCurrentWeatherData = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`);
                setCurrentWeatherData(response.data as iWeatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        const fetchForecastData = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&days=3`);
                setForecastData(response.data.forecast.forecastday);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        fetchCurrentWeatherData();
        fetchForecastData();
    }, [apiKey]);

    return (
        <>
            <div className="relative bg-local min-h-[100vh] min-w-[100vw]">
                <div
                    className="absolute inset-0 bg-black opacity-50"
                    style={{ backgroundImage: `url(${bgimg})`, zIndex: -1 }}
                ></div>
                <div className="relative z-10">
                    <AppHeader showLogoutButton={true} />
                    <NavBar />
                    <div>
                        {currentWeatherData ? (
                            <div>
                                <h2>Weather Update</h2>
                                <p>Location: {currentWeatherData.location.name}, {currentWeatherData.location.country}</p>
                                <p>Temperature: {currentWeatherData.current.temp_c}°C</p>
                                <p>Condition: {currentWeatherData.current.condition.text}</p>
                            </div>
                        ) : (
                            <p>Loading weather data...</p>
                        )}
                    </div>
                    <div className='md:px-[100px]'>
                        <h2>3-Day Weather Forecast</h2>
                        <table className='bg-[#7AA2E3] w-full text-center'>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Max Temp</th>
                                    <th>Min Temp</th>
                                    <th>Condition</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forecastData.map((day: iForecastData, index: number) => (
                                    <tr key={index} className='border-t-2'>
                                        <td>{day.date}</td>
                                        <td>{day.day.maxtemp_c}°C</td>
                                        <td>{day.day.mintemp_c}°C</td>
                                        <td>{day.day.condition.text}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='my-10'>
                    <BigCityWeather cities={["London", "Paris", "New York", "Tokyo", "Sydney", "Rome"]} />
                </div>
            </div>
        </>
    );
};

export default Weather;
