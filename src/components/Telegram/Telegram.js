import React, { useState } from 'react';
import Select from 'react-select';
const iRArray = [{label: "Включена в раздел 1", value: '1'}, 
  {label: "Не включена (осадков не было)", value: '3'}, 
  {label: "Не включена (осадки не измерялись)", value: '4'}, 
  {label: "Включена в раздел 5", value: '/'} ];
const iXArray = [{label: "Включена", value: '1'},
  {label: "Не включена (нет явлений)", value: '2'},
  {label: "Не включена (наблюдения не проводились)", value: '3'}];
const Telegram = ({term, code}) => {
  const initTelegram = term % 2 == 0 ? 'ЩЭСМЮ' : 'ЩЭСИД';
  const [telegram, setTelegram] = useState(initTelegram);
  const [iR, setIR] = useState({label: "Включена в раздел 1", value: '1'});
  const [iX, setIX] = useState({label: "Включена", value: '1'});
  
  const handleIRSelected = (val) => {
    setTelegram(`${initTelegram} ${code} ${val.value}${iX.value}`)
    setIR(val);
  }
  const handleIXSelected = (val) => {
    setTelegram(`${initTelegram} ${code} ${iR.value}${val.value}`)
    setIX(val);
  }
  return(
    <div className="container">
        <p>{telegram}</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Наличие группы 6RRRtg</th><th>Наличие группы 7wwW1W2</th><th>Станция</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Select value={iR} onChange={handleIRSelected} options={iRArray}/></td>
              <td><Select value={iX} onChange={handleIXSelected} options={iXArray}/></td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}
export default Telegram;