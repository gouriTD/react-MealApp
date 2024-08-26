import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext({
    modalProgress:'',
    showCart:()=>{},
    hideCart:()=>{},
    showCheckOut:()=>{},
    hideCheckOut:()=>{}
})

export const useModalContext = ()=>{
    const ctx = useContext(ModalContext)
    return ctx
}

function ModalProgressProvider({children}) {
    const [modalProgress,setModalProgress] = useState('')
    const showCart = ()=>{
        setModalProgress('cart')
    }

    const hideCart = ()=>{
        setModalProgress('')
    }

    const showCheckOut = ()=>{
        setModalProgress('checkout')
    }

    const hideCheckOut = ()=>{
        setModalProgress('')
    }

    const ctx = {
        modalProgress,
        showCart,
        hideCart,
        showCheckOut,
        hideCheckOut
    }

  return (
    
    <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
  )
}

export default ModalProgressProvider