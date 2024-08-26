import React, { useCallback, useState, useContext } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext({
    user:{},
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}
})

export function useAuthContext(){
    const ctx =  useContext(AuthContext)
    return ctx
}

function AuthContextProvider({children}) {

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [user,setUser] = useState(null)

    const loginHandler = (user)=>{
        console.log(user)
        setIsLoggedIn(true)
        setUser(user)
    }

    const logoutHandler = ()=>{
        setIsLoggedIn(false)
    }

    const ctx = {
        isLoggedIn,
        login : loginHandler,
        logout : logoutHandler,
        user
        
    }
  return (
    <AuthContext.Provider value={ctx} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider