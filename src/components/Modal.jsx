import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function Modal({children,open}) {

    const dialogRef = useRef()

    // With every open prop value we chcek if it is true , only if it's true we show the modal else we close it.
    useEffect(()=>{
      console.log(open)
      const modal = dialogRef.current
        if(open){
          modal.showModal()
        }

        return ()=>{modal?.close()}
    },[open])
  return createPortal(
    <dialog className='modal' ref={dialogRef}>
      <div style={{display:'flex',flexDirection:'column'}}>
        {children}
      </div>
        
    </dialog>
    ,document.getElementById('modal')
  )
}

export default Modal