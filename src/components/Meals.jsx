import React from 'react'
import MealItem from './MealItem'
import SearchableList from './SearchableList'
import useFetchData from '../utility/useFetchData'
import { CONSTANTS } from '../utility/constants'

const { BASE_URL } = CONSTANTS



function Meals() {
  const {isFetchingData,searchedMeals,error} = useFetchData()

  if (isFetchingData && searchedMeals.length === 0) {
    return <p id='info'>Loading data ...</p>
  }
  console.log(isFetchingData)
  return (
    <div id='meals-container'>
      {error && <p id="error">{error.message}</p>}
      {!error && searchedMeals?.length > 0 && <SearchableList items={searchedMeals}>
        {(searchedMeals)=>
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
        </SearchableList>
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