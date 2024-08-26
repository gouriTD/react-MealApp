import { useEffect, useState } from "react";
import { createContext } from "react";

const CARTITEMS_TAG = 'cartItems'

export const MealContext = createContext({
    meals:[],
    cartItems:[],
    clearCart:()=>{},
    addCartItem:()=>{},
    removeCartItem:()=>{},
    setMeals:(meal)=>{},
    toggleFavourites:()=>{}
})

export default function MealContextProvider({children}){

    const [cartItems,setCartItems] = useState(JSON.parse(localStorage.getItem(CARTITEMS_TAG)) || [])
    const [meals,setMeals] = useState([])
   
    useEffect(()=>{
        // store cart items to localstorage
        storeCartItemsToLocalStorage()

    },[cartItems])

    useEffect(()=>{
        // store cart items to localstorage
        console.log(meals.length,meals)

    },[meals])

    const addCartItem = (item)=>{
        const itemIndex = cartItems.findIndex(cartitem=>cartitem.id === item.id)
        console.log(itemIndex)
        if(itemIndex >= 0){
            setCartItems(prevItems=>prevItems.map((previtem,index)=>{
                console.log(previtem)
                if(index === itemIndex ){
                    // console.log(previtem.quantity + 1)
                    // console.log({...previtem,quantity: previtem.quantity + 1})
                    return {...previtem,quantity: previtem.quantity + 1}
                }else{
                    return previtem
                }
            }))
        }else{
            setCartItems(prevItems=>[...prevItems,item])
        }
        
    }

    const removeCartItem =(itemId)=>{
        const cartitemIndex = cartItems.findIndex(item=>item.id === itemId)
        const cartitem = cartItems[cartitemIndex]
        if(cartitem.quantity === 1){
            setCartItems(prevItems=>prevItems.filter(item=>item.id!==itemId))
        }else{
            const updatedCartItems = [...cartItems]
            updatedCartItems[cartitemIndex].quantity -= 1
            setCartItems(updatedCartItems)
        }
    }

    const clearCart = ()=>{
        setCartItems([])
    }

    const toggleFavourites = (itemId)=>{
        const index = meals.findIndex(meal=>meal.id === itemId)
        
        setMeals(prevMeals=>{
            const updatedMeal = [...prevMeals]
            updatedMeal[index].isFavourite = !updatedMeal[index].isFavourite
            return updatedMeal
        })
    }

    const storeCartItemsToLocalStorage = ()=>{
        localStorage.setItem(CARTITEMS_TAG ,JSON.stringify(cartItems))
    }

    const contextVal = {
        cartItems,
        addCartItem,
        removeCartItem,
        meals,
        setMeals,
        clearCart,
        toggleFavourites
    }
    return (
        <MealContext.Provider value={contextVal}>
            {children}
        </MealContext.Provider>
    )
}