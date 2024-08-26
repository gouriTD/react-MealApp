import React from 'react'
import { NavLink } from 'react-router-dom'

function MealNavigation() {
    return (

        <nav>
            <ul>
                <li>
                    <NavLink to='all' className='link'>Meals</NavLink>
                </li>
                <li>
                    <NavLink to='favMeals' className={'link'}>My Favourite Meals</NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default MealNavigation