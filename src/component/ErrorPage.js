import React from 'react'

const ErrorPage = ({errorNum}) => {
  return (
    <div className='weather-box error400-box'>
      {errorNum ==='400' 
      ? <h2>Please enter a city name.</h2>
      : <h2>You have entered a wrong city name.<br/><br/>Please enter the correct city name.</h2>}
    </div>
  )
}

export default ErrorPage