import React, { useState, useReducer } from 'react';
import Select from 'react-select';
import {cloudHeightArray, iRArray, iXArray, visibilityRangeArray, nCloudArray, tendencyArray} from './Dictionaries';

const telegramReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IR':
      return { ...state, iR: action.irValue };
    case 'SET_IX':
        return { ...state, iX: action.ixValue };
    case 'SET_CLOUDHEIGHT':
      return { ...state, cloudHeight: action.cloudHeightValue };
    case 'SET_VISIBILITYRANGE':
      return { ...state, visibilityRange: action.visibilityRange };
    case 'SET_NCLOUD':
      return { ...state, nCloud: action.nCloud };
    case 'SET_WINDDIRECTION':
      return { ...state, windDirection: action.windDirection };
    case 'SET_WINDSPEED':
      return { ...state, windSpeed: action.windSpeed };
    case 'SET_TEMPERATURE':
      return { ...state, temperature: action.temperature };
    case 'SET_DEWPOINT':
      return { ...state, dewPoint: action.dewPoint };
    case 'SET_PRESSURE':
      return { ...state, pressure: action.pressure };
    case 'SET_PRESSURESEALEVEL':
      return { ...state, pressureSeaLevel: action.pressureSeaLevel };
    case 'SET_TENDENCY':
      return { ...state, tendency: action.tendency };
    case 'SET_TENDENCYVALUE':
      return { ...state, tendencyValue: action.tendencyValue };
    case 'SET_PRECIPITATION':
      return { ...state, precipitation: action.precipitation };
    default:
      return state;
  }
};

const Telegram = ({term, code, sensorData}) => {
  const headGroup = term % 2 === 0 ? 'ЩЭСМЮ' : 'ЩЭСИД';
  const [iR, setIR] = useState({label: "Включена в раздел 1", value: '1'});
  const [iX, setIX] = useState({label: "Включена", value: '1'});
  const [cloudHeight, setCloudHeight] = useState({label: "> 2500 или облаков нет", value: '9'});
  const [visibilityRange, setVisibilityRange] = useState({label: "1км.", value: "94"});
  const [nCloud, setNCloud] = useState({label: "0 (облаков нет)", value: "0"});
  const [windDirection, setWindDirection] = useState(sensorData.windDirection);
  const [variableWind, setVariableWind] = useState(false);
  const [windSpeed, setWindSpeed] = useState(sensorData.windSpeed);
  const [temperature, setTemperature] = useState(sensorData.temperature);
  const [dewPoint, setDewPoint] = useState(sensorData.dewPoint);
  const [pressure, setPressure] = useState(sensorData.pressure);
  const [pressureSeaLevel, setPressureSeaLevel] = useState('XXXX');
  const [tendency, setTendency] = useState({label: "Без изменений 4", value: "4"});
  const [tendencyValue, setTendencyValue] = useState(('00'+Math.abs(+sensorData.prevPressure-sensorData.pressure)).slice(-3));
  const [precipitation, setPrecipitation] = useState('002');
  const initTelegram = {
    headGroup: headGroup,
    code: code,
    iR: '1',
    iX: '1',
    cloudHeight: '9',
    visibilityRange: '94',
    nCloud: '0', 
    windDirection: windDirection/10,
    windSpeed: +windSpeed<10 ? '0'+windSpeed : windSpeed,
    temperature: (+temperature<0 ? '1': '0')+('0'+Math.abs(+temperature)*10).slice(-3),
    dewPoint: (+dewPoint<0 ? '1': '0')+('0'+Math.abs(+dewPoint)*10).slice(-3),
    pressure: +pressure>=1000 ? (''+(+pressure*10)).substr(1) : (''+(+pressure*10)),
    pressureSeaLevel: pressureSeaLevel,
    tendency: "4",
    tendencyValue: ('00'+Math.abs(+sensorData.prevPressure-sensorData.pressure)*10).slice(-3),
    precipitation: '002'
  }
  const [telegram, dispatch] = useReducer(telegramReducer,initTelegram);
  
  const handleIRSelected = (val) => {
    setIR(val);
    dispatch({
      type: 'SET_IR',
      irValue: val.value
    });
  }
  const handleIXSelected = (val) => {
    setIX(val);
    dispatch({
      type: 'SET_IX',
      ixValue: val.value
    });
  }
  const handleCloudHeightSelected = (val) =>{
    setCloudHeight(val);
    dispatch({
      type: 'SET_CLOUDHEIGHT',
      cloudHeightValue: val.value
    });
  }
  const handleVisibilityRangeSelected = (val)=>{
    setVisibilityRange(val);
    dispatch({
      type: 'SET_VISIBILITYRANGE',
      visibilityRange: val.value
    });
  }
  const handleNCloudSelected = (val)=>{
    setNCloud(val);
    dispatch({
      type: 'SET_NCLOUD',
      nCloud: val.value
    });
  }
  const handleWindDirectionChange = (e)=>{
    setWindDirection(e.target.value);
    let wd = Math.round(+e.target.value/10)
    dispatch({
      type: 'SET_WINDDIRECTION',
      windDirection: wd<10 ? '0'+wd : wd
    });
  }
  const handleVariableWindChange = (e) =>{
    setVariableWind(e.target.checked)
    if(e.target.checked)
      dispatch({
        type: 'SET_WINDDIRECTION',
        windDirection: '99'
      })
    else{
      let wd = Math.round(+windDirection/10)
      dispatch({
        type: 'SET_WINDDIRECTION',
        windDirection: wd<10 ? '0'+wd : wd
      });
    }
  }
  const handleWindSpeedChange = (e)=>{
    setWindSpeed(e.target.value);
    let ws = +e.target.value;
    dispatch({
      type: 'SET_WINDSPEED',
      windSpeed: ws<10 ? '0'+ws : ws
    });
  }
  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
    let t = (+e.target.value<0 ? '1': '0')+('0'+Math.abs(+e.target.value)*10).slice(-3)
    dispatch({
      type: 'SET_TEMPERATURE',
      temperature: t
    });
  }
  const handleDewPointChange = (e) => {
    setDewPoint(e.target.value);
    let t = (+e.target.value<0 ? '1': '0')+('0'+Math.abs(+e.target.value)*10).slice(-3)
    dispatch({
      type: 'SET_DEWPOINT',
      dewPoint: t
    });
  }
  const handlePressureChange = (e) => {
    setPressure(e.target.value);
    let p = +e.target.value>=1000 ? (''+(+e.target.value*10)).replace(".", "").substr(1) : (''+(+e.target.value*10)).replace(".", "")
    dispatch({
      type: 'SET_PRESSURE',
      pressure: p
    });
  }
  const handlePressureSeaLevelChange = (e)=>{
    setPressureSeaLevel(e.target.value);
    let p = +e.target.value>=1000 ? (''+(+e.target.value*10)).replace(".", "").substr(1) : (''+(+e.target.value*10)).replace(".", "")
    dispatch({
      type: 'SET_PRESSURESEALEVEL',
      pressureSeaLevel: p
    });
  }
  const handleTendencySelected = (val)=>{
    setTendency(val);
    dispatch({
      type: 'SET_TENDENCY',
      tendency: val.value
    });
  }
  const handleTendencyValueChange = (e)=>{
    setTendencyValue(e.target.value);
    let tv = ('00'+e.target.value*10).slice(-3);
    dispatch({
      type: 'SET_TENDENCYVALUE',
      tendencyValue: tv
    });
  }
  const handlePrecipitationChange = (e)=>{
    setPrecipitation(e.target.value);
    // let p = ('00'+e.target.value).slice(-3);
    let p = +e.target.value<1.0 ? ''+(990+e.target.value*10) : ('00'+e.target.value).slice(-3);
    dispatch({
      type: 'SET_PRECIPITATION',
      precipitation: p
    });
  }
  const t = `${telegram.headGroup} ${telegram.code} \
    ${telegram.iR}${telegram.iX}${telegram.cloudHeight}${telegram.visibilityRange} \
    ${telegram.nCloud}${telegram.windDirection}${telegram.windSpeed} \
    1${telegram.temperature} 2${telegram.dewPoint} 3${telegram.pressure} 4${telegram.pressureSeaLevel} \
    5${telegram.tendency}${telegram.tendencyValue} ${iR.value==='1'? '6': ''}${iR.value==='1'? telegram.precipitation : ''}`;
  const group6 = iR.value === "1" ? 
    <td><input type='number' value={precipitation} onChange={handlePrecipitationChange} min='0.0' max='989' step='0.1'/></td> : 
    null;
  return(
    <div className="container">
        <p>{t}</p>
        <h4>Высота облаков, видимость</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Наличие группы 6RRRt<sub>R</sub></th><th>Наличие группы 7wwW<sub>1</sub>W<sub>2</sub></th><th>Высота облаков</th><th>Дальность видимости</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Select value={iR} onChange={handleIRSelected} options={iRArray}/></td>
              <td><Select value={iX} onChange={handleIXSelected} options={iXArray}/></td>
              <td><Select value={cloudHeight} onChange={handleCloudHeightSelected} options={cloudHeightArray}/></td>
              <td><Select value={visibilityRange} onChange={handleVisibilityRangeSelected} options={visibilityRangeArray}/></td>
            </tr>
          </tbody>
        </table>
        <h4>Облака, ветер</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Общее количество облаков (баллы)</th><th>Направление ветра</th><th>Скорость ветра</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Select value={nCloud} onChange={handleNCloudSelected} options={nCloudArray}/></td>
              <td><input type="number" value={windDirection} onChange={handleWindDirectionChange} min='0' max='360'/><br/>
                <input type="checkbox" id="variable" checked={variableWind} onChange={handleVariableWindChange} />
                <label htmlFor="variable">Переменное</label>
              </td>
              <td><input type="number" id="windSpeed" value={windSpeed} onChange={handleWindSpeedChange} min='0' max='50'/></td>
            </tr>
          </tbody>
        </table>
        <h4>Температура, давление</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Температура воздуха</th><th>Точка росы</th><th>Давление на уровне станции</th>
              <th>Давление на уровне моря</th><th>Барическая тенденция</th><th>Значение тенденции</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="number" id="temperature" value={temperature} onChange={handleTemperatureChange} min='-40' max='50' step="0.1"/>
              </td>
              <td>
                <input type="number" id="dewPoint" value={dewPoint} onChange={handleDewPointChange} min='-40' max='50' step="0.1"/>
              </td>
              <td>
                <input type="number" id="pressure" value={pressure} onChange={handlePressureChange} min='800' max='1400' step="0.1"/>
              </td>
              <td>
                <input type="number" id="pressureSeaLevel" value={pressureSeaLevel} onChange={handlePressureSeaLevelChange} min='800' max='1400' step="0.1"/>
              </td>
              <td><Select value={tendency} onChange={handleTendencySelected} options={tendencyArray}/></td>
              <td>
                <input type="number" id="tendencyValue" value={tendencyValue} onChange={handleTendencyValueChange} min='0.0' max='99.9' step="0.1"/>
              </td>
            </tr>
          </tbody>
        </table>
        <h4>Раздел 1, группы 6, 7 и 8</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Осадки</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {group6}
            </tr>
          </tbody>
        </table>
    </div>
  );
}
export default Telegram;