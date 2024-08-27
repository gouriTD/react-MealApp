import React, { useContext, useEffect, useState } from 'react'
import { useModalContext } from '../store/modalProgress'
import CheckOutForm from './CheckOutForm'
import Modal from './Modal'
import {MealContext} from '../store/store'
import { json } from 'react-router-dom'
import { getData, sendPostData } from '../utility/networkHelper'
import { CONSTANTS } from '../utility/constants'

const { BASE_URL } = CONSTANTS

function CheckoutModal() {
    const[orderPlaced,setOrderPlaced] = useState(null)
    const [orderError,setOrderError] = useState(null)
    const { modalProgress,hideCheckOut} = useModalContext()
    const ctx = useContext( MealContext )
    

    const handleClear = ()=>{
     ctx.clearCart()
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
            console.log('sending data to backend')
            const response = await sendPostData(BASE_URL + 'orders',orderData)
            if(response.message.includes('created')){
                const orderData = await getData(BASE_URL + 'orders')
                console.log(orderData)
                setOrderPlaced(orderData[orderData.length - 1])
                handleClear()
            }
            
        } catch (error) {
            console.log(error.message)
            // throw json({message:error.message},{status:500})
            setOrderError('Error while placing order')
        }
    }

    const handleClose = ()=>{
        if(orderPlaced){
            setOrderPlaced(null)
        }
        hideCheckOut()
    }

    const getTotal = ()=>{
        return ctx.cartItems.reduce((acc, curr) => { return acc + curr.quantity * curr.price }, 0)
    }

    console.log(orderPlaced)
  return (
    <Modal key={'checkout'} open={modalProgress === 'checkout'} onClose={ modalProgress === 'checkout' ? handleClose : null}>
        {orderPlaced  && <>
            <h2>Order Placed Successfully !!!</h2>
            <p style={{textAlign:'center',fontWeight:700}}>{`Name: ${orderPlaced.customer.name}, Email: ${orderPlaced.customer.email}`}</p>
            <ul>
                {orderPlaced.items.map(item=><li key={item.id}>{JSON.stringify(item)}</li>
                    )}
            </ul>
            
            <button className='button' onClick={handleClose}>Close</button>
        </>}
        {!orderPlaced && <CheckOutForm total={getTotal()} handleOrderPlacement={handleOrderPlacement} onClose={handleClose} error={orderError} setError={()=>setOrderError(null)}/>}
        
    </Modal>
  )
}

export default CheckoutModal