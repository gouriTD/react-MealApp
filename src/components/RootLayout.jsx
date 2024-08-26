import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import CheckoutModal from './CheckoutModal'
import CartModal from './CartModal'

function RootLayout() {

  return (
    <>
     <Header />
     <Outlet/>
     <CartModal/>
     <CheckoutModal/>
    </>
  )
}

export default RootLayout
