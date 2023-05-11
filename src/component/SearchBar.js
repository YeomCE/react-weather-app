import React from 'react'
import { FaSearch } from "react-icons/fa";


const SearchBar = ({ setSearchValue, searchValue, setCity }) => {

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

    const weatherSearch =()=>{
        if(searchValue === ''){
            setCity("error400")
        }
        else{
            setCity(searchValue);
        }
    }

    return (
        <div className='search-bar'>
            <input placeholder='Please enter the correct city name.' value={searchValue} spellCheck="false"
                onChange={onChangeSearch}
                onClick={() => { inputCursor() }}
                onKeyDown={(e) => activeEnter(e)} />
            <button className='search-button' onClick={() => { weatherSearch() }}><FaSearch /></button>
        </div>
    )
}

export default SearchBar