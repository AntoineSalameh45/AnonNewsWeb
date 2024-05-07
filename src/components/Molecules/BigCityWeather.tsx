import axios from "axios";
import { useState, useEffect } from "react";
import { iWeatherData } from "../../pages/weather";

export interface iWeatherProps {
    cities: string[];
}

const BigCityWeather = ({ cities }: iWeatherProps) => {
    const [weatherDataList, setWeatherDataList] = useState<(iWeatherData | null)[]>(new Array(cities.length).fill(null));

    const apiKey = import.meta.env.VITE_WEATHER_API;

    useEffect(() => {
        const fetchWeatherData = async (city: string, index: number) => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
                const weatherData = response.data as iWeatherData;
                setWeatherDataList(prevData => {
                    const newData = [...prevData];
                    newData[index] = weatherData;
                    return newData;
                });
            } catch (error) {
                console.error(`Error fetching weather data for ${city}:`, error);
            }
        };

        cities.forEach((city, index) => {
            fetchWeatherData(city, index);
        });
    }, [apiKey, cities]);

    return (
        <>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {cities.map((city, index) => (
                        <div key={index} className="bg-[#7AA2E3aa] rounded-lg h-[150px] w-[175px] lg:h-[120px]">
                            {weatherDataList[index] ? (
                                <div className="w-full h-full p-4">
                                    <p>{weatherDataList[index]?.location.name}, {weatherDataList[index]?.location.country}</p>
                                    <p>{weatherDataList[index]?.current.temp_c}°C</p>
                                    <p>{weatherDataList[index]?.current.condition.text}</p>
                                </div>
                            ) : (
                                <p>Loading weather data for {city}...</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );    
};

export default BigCityWeather;
