import React from 'react'
import CartItem from './CartItem'
import ModalActionButtons from './ModalActionButtons'
import { currencyFormater } from '../utility/currencyConverter'

function CartSummary({ cartItems, onClear, onCheckout, onClose }) {
    const getTotal = ()=>{
        return cartItems.reduce((acc, curr) => { return acc + curr.quantity * curr.price }, 0)
    }
    return (
        <>
            <h2 id='title'>Your Selected Items</h2>
            <ol>
                {cartItems.map(item => {
                    console.log(item)
                    return (
                    <CartItem 
                    key={item.id} 
                    id={item.id} 
                    title={item.name} 
                    price={item.price} 
                    quantity={item.quantity} 
                    />)
                }
                )}
            </ol>
            <h2>Total : {currencyFormater.format(getTotal())}</h2>
            <ModalActionButtons WrapperElement='div' className='modal-actions'>
                <button className='text-button' onClick={onClose}>Close</button>
                <button className='button' onClick={onCheckout}> Checkout</button>
                <button style={{ marginLeft: '0.4rem' }} onClick={onClear}>Clear Cart</button>
            </ModalActionButtons>
        </>
    )
}

export default CartSummary