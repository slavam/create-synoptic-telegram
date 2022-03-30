import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
// import MainParams from './components/Params/MainParams';
import SensorsData from './components/Sensors/SensorsData';
import Telegram from './components/Telegram/Telegram';
import Select from 'react-select';
const d = new Date();
const cd = `${d.getUTCFullYear()}-${('0'+(d.getUTCMonth()+1)).slice(-2)}-${('0'+(d.getUTCDate())).slice(-2)}`;
const stations = ['','Донецк','Амвросиевка','Дебальцево','','','','','','','Седово'];
const codes = [null, 34519, 34622, 34524, null, null, null, null, null, null, 99023]
const stationsArray = [];
stations.map((s,i) => {return (s !== '') ? stationsArray.push({label: s, value: codes[i]}) : null});

const App = () => {
  // const [currDate, setCurrDate] = useState(cd);
  // const [term, setTerm] = useState(Math.floor(d.getUTCHours() / 3) * 3);
  // const [code, setCode] = useState(34519);
  const currDate = cd;
  const term = Math.floor(d.getUTCHours() / 3) * 3;
  const [station, setStation] = useState({label: 'Донецк', value: 34519});
  const handleStationSelected = (val) => {
    setStation(val);
  }
  const initSensorData = {
    temperature: 10,
    pressure: 1011.0,
    prevPressure: 1011.5,
    humidity: 30,
    windSpeed: 2,
    windDirection: 100,
    dewPoint: 8
  };

  return (
    <div className="App">
      <Header />   
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Дата (UTC)</th><th>Срок</th><th>Станция</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currDate}</td><td>{term}</td><td><Select value={station} onChange={handleStationSelected} options={stationsArray}/> </td>
          </tr>
        </tbody>
      </table> 
      
      {/* <MainParams currDate={currDate} term={term}/> */}
      <SensorsData />
      
      <Telegram term={term} code={station.value} sensorData={initSensorData}/>
    </div>
  );
}

export default App;
