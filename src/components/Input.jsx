import React from 'react'

function Input({ title, type, name, placeholder='', defaultVal=''}) {
    return (
        <div className='input'>
            <label>{title}:</label>
            <input type={type} name={name} id={name} placeholder={placeholder} defaultValue={defaultVal}required/>
        </div>
    )
}

export default Input