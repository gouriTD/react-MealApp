import { useState, useEffect, useContext } from 'react'
import {MealContext}  from '../store/store'
import { CONSTANTS } from '../utility/constants'

const { BASE_URL } = CONSTANTS
 
 const useFetchData = ()=>{
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [error, setError] = useState()
    const [searchedMeals, setSearchedMeals] = useState([])
  
    const ctx = useContext(MealContext)
    const { meals, setMeals } = ctx
  
    useEffect(() => {
  
      async function getMeals() {
        setIsFetchingData(true)
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
            setSearchedMeals(data)
  
          })
          .catch(err => {
            console.log(err.message)
            setError({ message: err.message })
          })
          .finally(()=>setIsFetchingData(false))
      }
  
      if (meals && meals.length > 0) {
        setSearchedMeals(meals)
      } else {
        getMeals()
      }
  
    }, [])

    return {
      isFetchingData,
      error,
      searchedMeals
    }
  
  }

  export default useFetchData