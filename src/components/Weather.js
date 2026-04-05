import axios from "axios";
import React, { useEffect, useState } from 'react';
import '../style/weather.css'


export default function Weather({setParent}){
    const COORDS = "coords";
    const API_KEY = "c283c1b68dbf55ecb6cbcd7a807a9891";

    const [weatherInfo, setWeatherInfo] = useState();

    const saveCoords = (coordsObj)=>{
        localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    }

    const getWeather=(lat, lon)=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then((responseData) => {
            const data = responseData.data;
            
            if(!weatherInfo){
                setWeatherInfo({
                    id: data.weather[0].id,
                    temperature: parseInt(data.main.temp),
                    main: data.weather[0].main,
                    loading: false,
                });
                setParent({
                    id: data.weather[0].id,
                    temperature: parseInt(data.main.temp),
                    main: data.weather[0].main,
                    loading: false,
                });
                console.log(weatherInfo);
            }
            
        })
    }
    
    const handleGeoSuccess = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
            latitude,
            longitude,
        };
        saveCoords(coordsObj);
        getWeather(latitude, longitude);
    }

    const loadCoords = () => {
        const loadedCoords = localStorage.getItem(COORDS);
        if(loadedCoords === null){
            askForCoords();
        }
        else{
            const parseCoordes = JSON.parse(loadedCoords);
            getWeather(parseCoordes.latitude, parseCoordes.longitude);
        }
    }

    const askForCoords = () =>{
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    }
    
    loadCoords();
    console.log(weatherInfo);
    /*const selectWeather = ()=>{
        let iconId = weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
        switch (iconId) {
        case "0":
            return <TiWeatherSunny size="6rem" color="red" />;
        case "2":
            return "폭풍";
        case "3":
            return "이슬비";
        case "5":
            return "비";
        case "6":
            return "눈";
        case "7":
            return <BsCloudFog size="6rem" color="white" />;
        case "8":
            return "구름";
    }*/

    return (
        <div className="weather-info">
            {weatherInfo?.main}
        </div>
    )
    
}

// error 핸들 함수
function handleGeoError(){
    console.log("Can't access geo location");
}

