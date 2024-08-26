import React from 'react'

function ModalActionButtons({WrapperElement,children,...props}) {
  return (
    <WrapperElement {...props}>
        {children}
    </WrapperElement>
  )
}

export default ModalActionButtons
