import React from 'react'

const WeatherBox = ({ weather }) => {

  return (
    <div className='weather-box'>
      <p className='location'>{weather ? weather.name === 'Seolman' ? 'Busan' : weather.name : ''}</p>
      <p className='temperature'>Temp</p>
      <h2 className='temperature-result'>{Math.floor(weather?.main.temp)}°</h2>
      <p className='humidity'>humidity</p>
      <h2 className='humidity-result'>{weather?.main.humidity}%</h2>
      <h3 className='weather'>{weather?.weather[0].description}</h3>
    </div>

  )
}
export default WeatherBox