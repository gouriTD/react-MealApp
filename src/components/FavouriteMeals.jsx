import React, { useContext } from 'react'
import { MealContext } from '../store/store'
import SearchableList from './SearchableList'
import MealItem from './MealItem'
import { CONSTANTS } from '../utility/constants'

const { BASE_URL } = CONSTANTS

function FavouriteMeals() {
    const ctx = useContext(MealContext)
    const { meals } = ctx

    const favMeals = meals.filter(meal => meal.isFavourite) || []

    return (
        <SearchableList items={favMeals}>
            {(favMeals) =>
                <div id='meals'>
                    {favMeals.map(meal => (
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
    )
}

export default FavouriteMeals