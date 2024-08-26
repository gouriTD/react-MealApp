import React, { useContext } from 'react'
import mealLogo from '../assets/logo.jpg'
import { MealContext } from '../store/store'
import { useAuthContext } from '../store/auth'
import MealNavigation from './MealNavigation'
import { useModalContext } from '../store/modalProgress'

function Header() {
  const ctx = useContext(MealContext)
  const { showCart } = useModalContext()

  const { logout } = useAuthContext()

  const handleCartClick = () => {
    showCart()
  }

  const handleLogout = () => {
    logout()
  }

  const cartItemsNumber = ctx.cartItems.reduce((acc, currItem) => acc + currItem.quantity, 0)
  return (
    <>
      <header id='main-header'>
        <div id='title'>
          <img src={mealLogo} alt="meal logo" />
          <h1> The Foodies</h1>
        </div>
        <MealNavigation />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className='text-button' onClick={handleCartClick}>Cart ({cartItemsNumber})</button>
          <button className='button' onClick={handleLogout}>Logout</button>
        </div>

      </header>
    </>
  )
}

export default Header