import React from 'react'
import Input from './Input'
import { useAuthContext } from '../store/auth'

const DEFAULT_LOGIN = {
    email: 'test@test.com',
    password: 111111
}


function Login() {

    const {login} = useAuthContext()

    const submitHandler = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const formDataObj = Object.fromEntries(formData.entries())
        login(formDataObj)
    }
  return (
    <div id='login-container'>
        <h2>The Foodies</h2>
        <div className='login-card'>
            <h1>SignIn</h1>
            <form action="#" onSubmit={submitHandler}>
                <Input title='Email' name='email' type='email' placeholder='Enter email' defaultVal={DEFAULT_LOGIN.email}/>
                <Input title='Password' name='password' type='password' placeholder='Enter Password' defaultVal={DEFAULT_LOGIN.password}/>
                <button>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login