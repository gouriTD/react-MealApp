import React, { useState } from 'react'
import SearchTab from './SearchTab'

function SearchableList({items,children}) {
    const [searchedMeals,setSearchedMeals] = useState(items || [])
    const handleSearch = (e) => {
        console.log(e.target.value)
        const filteredMeals = items.filter(meal => JSON.stringify(meal).toLocaleLowerCase().includes(e.target.value.toLowerCase()))
        setSearchedMeals(filteredMeals)
      }
      // console.log(searchedMeals,children)
  return (
    <>
        <SearchTab onChange={handleSearch}/>
        {
            children(searchedMeals)
        }
    </>
    
    
  )
}

export default SearchableList