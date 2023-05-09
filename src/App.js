
import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. 앱 실행 : 현재 위치 기반 날씨 정보
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태 정보
// 3. 5개의 버튼(현재위치 1 / 다른 도시 4)
// 4. 도시 버튼을 클릭하면 해당 도시의 날씨 정보가 나온다.
// 5. 현재 위치 버튼 클릭 시 현재 위치의 날씨 정보가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너

// 검색기능도 있으면 좋을듯
function App() {

  const [weather, setWeather] = useState(null)
  const cities = ['paris', 'new york', 'tokyo', 'seoul', 'Hong Kong', 'Gemeente Amsterdam', 'Canberra']


  const [city, setCity] = useState('')


  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0a07842a0bb24bdd9500ea70c6b4236e`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0a07842a0bb24bdd9500ea70c6b4236e`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  useEffect(() => {
    if(city ===''){
      getCurrentLocation();
    }
    else{
      getWeatherByCity();
    }
  }, [city])



  return (
    <div>
      <div className='bg'>
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} setWeather={setWeather}/>
      </div>
    </div>
  );
}

export default App;
