import React, { useEffect } from 'react'
import Input from './Input'
import ModalActionButtons from './ModalActionButtons'
import { currencyFormater } from '../utility/currencyConverter'

function CheckOutForm({total,handleOrderPlacement,onClose,error,setError}) {

  useEffect(()=>{
    console.log('Checkout Form mounting')
    return()=>{
      console.log('CheckoutForm unMounting')
      // if(formRef.current){
      //   formRef.current.reset()
      // }
    }
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    // Removing error display on resending the request.
    setError()
    const formData = new FormData(e.target)
    const formDataObj = Object.fromEntries(formData.entries())
    handleOrderPlacement(formDataObj)
  }
  return (
    <>
    <h2 id='title'>CheckOut</h2>
    <p>Total Amount : {currencyFormater.format(total)}</p>
    <form action="#" id='input-form' onSubmit={handleSubmit} >
        <Input title='Full Name' type='text' name='name' id='fname'/>
        <Input title='E-mail Address' type='email' name='email' id='email'/>
        <Input title='Street' type='text' name='street' id='street'/>
        <div className='postal'>
            <Input title='Postal Code' type='number' name='postal-code' id='pincode'/>
            <Input title='City' type='text' name='city' id='city'/>
        </div>
        <ModalActionButtons WrapperElement='div' className='modal-actions'>
                <button type="button" className='text-button' onClick={onClose}>Close</button>
                <button className='button'> Place Order</button>
        </ModalActionButtons>
    </form>
    {error && <p id='error'>{error}</p>}
    </>
  )
}

export default CheckOutForm