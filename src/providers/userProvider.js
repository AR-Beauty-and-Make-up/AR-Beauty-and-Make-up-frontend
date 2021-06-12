
import React, { useEffect, useState, createContext } from 'react'
export const UserContext = createContext()

export const UserProvider = props => {
    
    const [user, setUser] =  useState(() => JSON.parse(localStorage.getItem('user')))

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>

    )
}