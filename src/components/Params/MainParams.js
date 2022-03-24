const MainParams = ({currDate, term}) => {
  return(
    <div className='container'>
      <p align="left" style={{padding:"10px 10px"}}>Дата (UTC): {currDate} Срок: {term}</p>  
    </div>
  );
}
export default MainParams;