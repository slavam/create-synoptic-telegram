// import React, { useState } from 'react';
import React from 'react';

const SensorsData = () => {
  // const [temperature, setTemperature] = useState(10);
  const temperature = 10;
  // const [pressure, setPressure] = useState(1011.0);
  const pressure = 1011.0;
  // const [humidity, setHumidity] = useState(30);
  const humidity = 30;
  // const [windSpeed, setWindSpeed] = useState(2);
  const windSpeed = 2;
  const windDirection = 100;
  const dewPoint = 8;
  return(
    <div className='container'>
      <p align="left" style={{padding:"0 10px"}}>Показания датчиков. Температура: {temperature}ºC Давление: {pressure}мм рт.ст. Влажность: {humidity}% Скорость ветра: {windSpeed}м/с Направление ветра: {windDirection}º Точка росы: {dewPoint}ºC</p>  
    </div>
  );
}
export default SensorsData;