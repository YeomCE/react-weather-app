import React from 'react'
import { FaSearch } from "react-icons/fa";


const SearchBar = ({ setSearchValue, searchValue, setWeather, setErrorNum }) => {

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value);
    }
    const inputCursor = () => {
        setSearchValue('')
    }
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            weatherSearch(searchValue)
        }
    }

    const weatherSearch = async (searchValue) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0a07842a0bb24bdd9500ea70c6b4236e`
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        if(data.cod === "400"){
            // alert("Please enter a city name.")
            setErrorNum('400')
            
        }
        else if(data.cod === "404"){
            // alert("You have entered a wrong city name. Please enter the correct city name.")
            setErrorNum('404')
        }
        else{
            setErrorNum('')
            setWeather(data);
            console.log("!!")
        }

        
    }

    return (
        <div className='search-bar'>
            <input placeholder='Please enter the correct city name.' value={searchValue} spellCheck="false"
                onChange={onChangeSearch}
                onClick={() => { inputCursor() }}
                onKeyDown={(e) => activeEnter(e)} />
            <button className='search-button' onClick={() => { weatherSearch(searchValue) }}><FaSearch /></button>
        </div>
    )
}

export default SearchBar