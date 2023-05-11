import React from 'react'

const SearchBar = ({ setSearchValue, searchValue, setWeather }) => {

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
        setWeather(data);
    }

    return (
        <div className='search-bar'>
            <input placeholder='Please enter the correct area name. If you fail, please reload.' value={searchValue} spellCheck="false"
                onChange={onChangeSearch}
                onClick={() => { inputCursor() }}
                onKeyDown={(e) => activeEnter(e)} />
            <button className='search-button' onClick={() => { weatherSearch(searchValue) }}>검색</button>
        </div>
    )
}

export default SearchBar