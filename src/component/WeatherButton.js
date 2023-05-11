
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherButton = ({ cities, setCity, setWeather, setErrorNum }) => {


  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0a07842a0bb24bdd9500ea70c6b4236e`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  const setStatus = (item) => {
    setCity(item);
    setErrorNum("")
  }


  return (
    <div className='button-box'>
      <Button variant="warning" className='current-location' onClick={() => { getCurrentLocation() }}>here!</Button>{' '}

      {
        cities.map((item, index) => (
          <Button variant="warning" key={index}
            onClick={() => { setStatus(item) } }>
            {item}
          </Button>
        ))
      }
    </div>
  )
}

export default WeatherButton