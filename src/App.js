
import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import SearchBar from './component/SearchBar';
import ErrorPage from './component/ErrorPage';
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱 실행 : 현재 위치 기반 날씨 정보
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태 정보
// 3. 5개의 버튼(현재위치 1 / 다른 도시 4)
// 4. 도시 버튼을 클릭하면 해당 도시의 날씨 정보가 나온다.
// 5. 현재 위치 버튼 클릭 시 현재 위치의 날씨 정보가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너

// 검색기능도 있으면 좋을듯
function App() {

  const cities = ['Paris', 'New York', 'Tokyo', 'Seoul', 'Hong Kong', 'Amsterdam', 'Canberra']
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiError, setAPIError] = useState("");

  const [city, setCity] = useState('')

  const [searchValue, setSearchValue] = useState('')

  const [errorNum, setErrorNum] = useState('')

  // 내 현재 위치 찾기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    });
  }

  // 로딩 직후 초기 화면
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0a07842a0bb24bdd9500ea70c6b4236e`
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setErrorNum('')
      setLoading(false)
    }
    catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }

  // 지역 버튼 클릭 시 화면
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0a07842a0bb24bdd9500ea70c6b4236e`
      let response = await fetch(url);
      let data = await response.json();
      if (data.cod === "400" || city === 'error400') {
        setErrorNum('400')
        setLoading(false)

      }
      else if (data.cod === "404") {
        setErrorNum('404')
        setLoading(false)
      }
      else {
        setErrorNum('')
        setWeather(data);
        setLoading(false)
      }
    }
    catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (city === '' || city === 'current') {
      setLoading(true);
      getCurrentLocation();
    }
    else {
      setLoading(true);
      getWeatherByCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city])



  return (
    <div>
      {loading
        ? (
          <div className='loaing-bg'>
            <ClipLoader color='#999' loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        )
        : !apiError ?
        (
          <div className='bg'>
            <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} setWeather={setWeather} setErrorNum={setErrorNum} setLoading={setLoading} setCity={setCity} />
            {errorNum !== '' ? <ErrorPage errorNum={errorNum} /> : <WeatherBox weather={weather} />}
            {/* <WeatherBox weather={weather} /> */}
            <WeatherButton cities={cities} setCity={setCity} setErrorNum={setErrorNum} city={city} />
          </div>
        )
        : (
          apiError
        )
      }

    </div>
  );
}

export default App;

//
// try-catch
// 활성화된 버튼 색상