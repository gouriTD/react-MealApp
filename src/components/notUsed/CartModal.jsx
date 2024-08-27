import React,{useContext,forwardRef,useImperativeHandle, useState} from 'react'
import { MealContext } from '../../store/store'
import { useRef } from 'react'
import { createPortal } from 'react-dom';
import CartSummary from '../CartSummary';
import CheckOutForm from '../CheckOutForm';
import { json } from 'react-router-dom';
import { CONSTANTS } from '../utility/constants'

const { BASE_URL } = CONSTANTS

const CartModal = forwardRef(function CartModal(props,ref) {

    const ctx = useContext(MealContext)
    const dialogRef = useRef()
    console.log(ctx.cartItems)

    const [isCheckout,setIsCheckout] = useState(false)

    useImperativeHandle(ref,()=>{
        return (
            {
                open(){
                    dialogRef.current.showModal()
                },
                close(){
                    dialogRef.current.close()
                }
            }
        )
    })

    const handleClear = ()=>{
        ctx.clearCart()
        dialogRef.current.close()
    }

    const handleCheckOut = ()=>{
        setIsCheckout(true)
    }

    const getTotal = ()=>{
        return ctx.cartItems.reduce((acc, curr) => { return acc + curr.quantity * curr.price }, 0)
    }

    const handleOrderPlacement =async(formdata)=> {
        console.log(formdata)
       
        const orderData = {
            order:{
                customer:formdata,
                items:ctx.cartItems
            }
        }

        console.log(orderData)
        // Send data to backend .
        try {
            const config = {
                method: 'post',
                body: JSON.stringify(orderData),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response = await fetch(BASE_URL + 'orders',config)
            if(!response.ok){
                throw Error('Error in sending orders')
            }else{
                const resData = await response.json()
                if(resData.status >= 200 & resData.status < 300){
                    // fetch order data created.
                    const response = await fetch(BASE_URL + 'orders')
                    const orders = await response.json()
                    console.log(orders)
                }
                handleClear()
            }
            
        } catch (error) {
            console.log(error.message)
            throw json({message:error.message},{status:500})
        }
        
        
        
    }

    const handleClose =()=>{
        setIsCheckout(false)
    }
  return createPortal(
    <dialog ref={dialogRef} className='modal'>
        {ctx.cartItems.length === 0 && <>
            <h2>OOPS !!! Looks like no item in your cart</h2>
            <form method="dialog">
                <button className='button'> Close</button>
            </form>
        </>}
        {!isCheckout && ctx.cartItems && ctx.cartItems.length > 0 && 
        <CartSummary cartItems={ctx.cartItems} handleClear={handleClear} onCheckout={handleCheckOut}/>
        }
        {
            isCheckout && <CheckOutForm total={getTotal()} handleOrderPlacement={handleOrderPlacement} onClose={handleClose} ref={ref}/>
        }
    </dialog>,document.getElementById('modal')
  )
})

export default CartModal