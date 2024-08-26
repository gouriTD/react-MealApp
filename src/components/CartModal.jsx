import React, { useContext } from 'react'
import Modal from './Modal'
import CartSummary from './CartSummary'
import { useModalContext } from '../store/modalProgress'
import { MealContext } from '../store/store'

// This is used to show the Cart items selected.
function CartModal() {

    const{ showCheckOut,hideCart,modalProgress} = useModalContext()
    const ctx = useContext(MealContext)

    const handleClear = ()=>{
        ctx.clearCart()
        hideCart()
    }

    console.log(modalProgress)
    
  return (
    <Modal key={'cart'} open={modalProgress === 'cart'} onClose={modalProgress === 'cart' ? hideCart:null} >
        {ctx.cartItems.length === 0 && <>
            <h2>OOPS !!! Looks like no item in your cart</h2>
            <button className='button' onClick={hideCart}> Close</button>
            
        </>}
        { ctx.cartItems && ctx.cartItems.length > 0 && 
        <CartSummary 
            cartItems={ctx.cartItems} 
            onClear={handleClear} 
            onCheckout={showCheckOut} 
            onClose={hideCart}
        />
        }
    </Modal>
  )
}

export default CartModal