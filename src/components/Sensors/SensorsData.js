import React, { useState } from 'react';

const SensorsData = () => {
  const [temperature, setTemperature] = useState(10);
  const [pressure, setPressure] = useState(740);
  const [humidity, setHumidity] = useState(30);
  const [windSpeed, setWindSpeed] = useState(2);
  const [windDirection, setWindDirection] = useState(100);
  const [dewPoint, setDewPoint] = useState(5);
  return(
    <div className='container'>
      <p align="left" style={{padding:"0 10px"}}>Показания датчиков. Температура: {temperature}ºC Давление: {pressure}мм рт.ст. Влажность: {humidity}% Скорость ветра: {windSpeed}м/с Направление ветра: {windDirection}º Точка росы: {dewPoint}ºC</p>  
    </div>
  );
}
export default SensorsData;