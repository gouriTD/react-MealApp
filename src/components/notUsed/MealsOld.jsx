import React from 'react'
import { useState, useEffect, useContext } from 'react'

import MealItem from '../MealItem'
import SearchTab from '../SearchTab'
import { MealContext } from '../../store/store'
import { CONSTANTS } from '../utility/constants'

const { BASE_URL } = CONSTANTS


function Meals() {
  const [isFetchingData, setIsFecthingData] = useState(false)
  const [error, setError] = useState()
  const [searchedMeals, setSearchedMeals] = useState([])

  const ctx = useContext(MealContext)
  const { meals, setMeals } = ctx

  const updateSearchedMeals = (data) => {
    setSearchedMeals(data)
  }

  useEffect(() => {

    async function getMeals() {
      setIsFecthingData(true)
      setError(null)

      fetch(BASE_URL + 'meals')
        .then(res => {
          if (!res.ok && res.status === 404) {
            throw Error(res.status + ' data ' + res.statusText)
          }
          return res.json()
        })
        .then(data => {
          setMeals(data)
          updateSearchedMeals(data)

        })
        .catch(err => {
          console.log(err.message)
          setError({ message: err.message })
        })
        .finally(setIsFecthingData(false))
    }

    if (meals && meals.length > 0) {
      updateSearchedMeals(meals)
    } else {
      getMeals()
    }

  }, [])

  const handleSearch = (e) => {
    console.log(e.target.value)
    const filteredMeals = meals.filter(meal => JSON.stringify(meal).toLocaleLowerCase().includes(e.target.value.toLowerCase()))
    setSearchedMeals(filteredMeals)
  }
  if (isFetchingData && meals.length === 0) {
    return <p>Loading data ...</p>
  }
  return (
    <div key={'meals'} id='meals-container'>
      {error && <p id="error">{error.message}</p>}
      <SearchTab onChange={handleSearch} key={'meals'} />
      {!error &&
        <div id='meals'>
          {searchedMeals.map(meal => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              image={`${BASE_URL}${meal.image}`}
              price={meal.price}
              isFavourite={meal.isFavourite}
            />))}
        </div>
      }
    </div>

  )
}

export default Meals

// export async function mealLoader() {

//   try {
//     const response = await fetch(BASE_URL + 'meals')
//     if (!res.ok && res.status === 404) {
//       throw Error(res.status + ' data ' + res.statusText)
//     }
//     return response
//   } catch (error) {
//     throw json({ message: error.message }, { status: 500 })
//   }
// }