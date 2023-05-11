const WeatherButton = ({ cities, setCity, setErrorNum, city}) => {

  const setStatus = (item) => {
    setCity(item);
    setErrorNum("")
  }


  return (
    <div className='button-box'>
      <button className={`${city === 'current' ? 'current-location on' : 'current-location'}`} onClick={() => { setCity('current') }}>here!</button>{' '}
      {
        cities.map((item, index) => (
          // {city == item ? <></> : <></>}
          <button key={index} className={`${city === item ? 'on' : ''}`}
            onClick={() => { setStatus(item) } }>
            {item}
          </button>
        ))
      }
    </div>
  )
}

export default WeatherButton