import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import './Weather.css'

const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  }

  const search = async (city) => {
    if(city === ""){
      alert("Enter city name!");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data")
    }
  }

  useEffect(() => {
    search("London");
  },[]);

  return (
    <div id='weather' className='weather flex flex-col items-center'>

        <div id="search-bar" className='search-bar flex items-center gap-[10px]'>
            <input ref={inputRef} type="text" placeholder='Search' className='h-[50px] border-none outline-none rounded-[40px] text-[#626262] bg-[#ebfffa] text-2x1'/>
            <img src={search_icon} alt='search_icon' className='w-[50px] rounded-[50%] bg-[#ebfffa] cursor-pointer' onClick={() => search(inputRef.current.value)} />
        </div>

        {weatherData?<>
          <img src={weatherData.icon} alt="weather_icon" id='weather-icon' className='weather-icon w-[150px]'/>
        <p id='temperature' className='temperature text-white text-[80px]'>{weatherData.temperature}°F</p>
        <p id='location' className='text-white text-[40px]'>{weatherData.location}</p>

        <div id='weather-data' className='weather-data w-full text-white flex justify-between '>

          <div id='weather-col-1' className='flex items-start gap-[12px] text-[22px] '>
            <img id='data-icon' src={humidity_icon} alt='humidity_icon' className='data-icon w-[26px]'/>
            <div>
              <p>{weatherData.humidity} %</p>
              <span className='block text-[16px]'>Humidity</span>
            </div>
          </div>

          <div id='weather-col-2' className='flex items-start gap-[12px] text-[22px] '>
            <img id='data-icon' src={wind_icon} alt='wind_icon' className='data-icon w-[26px]'/>
            <div>
              <p>{weatherData.windSpeed} MPH</p>
              <span className='block text-[16px]'>Wind Speed</span>
            </div>
          </div>
        </div>
        </> : <></>}
    </div>
  )
}

export default Weather
