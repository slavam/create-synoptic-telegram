import React, { Component, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainParams from './components/Params/MainParams';
import SensorsData from './components/Sensors/SensorsData';
// import Telegram from './components/Telegram/Telegram';
const d = new Date();
const cd = `${d.getUTCFullYear()}-${('0'+(d.getUTCMonth()+1)).slice(-2)}-${('0'+(d.getUTCDate())).slice(-2)}`;


const App = () => {
  const [currDate, setCurrDate] = useState(cd);
  const [term, setTerm] = useState(Math.floor(d.getUTCHours() / 3) * 3);
  const initTelegram = term % 2 == 0 ? 'ЩЭСМЮ' : 'ЩЭСИД';
  const [telegram, setTelegram] = useState(initTelegram);
  return (
    <div className="App">
      <Header />     
      <MainParams currDate={currDate} term={term}/>
      <SensorsData />
      <p>{telegram}</p>
      {/* <Telegram term={term} /> */}
    </div>
  );
}

export default App;
