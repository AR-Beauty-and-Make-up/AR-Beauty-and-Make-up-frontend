import React, {createContext, useEffect, useState} from 'react'
import UserService from '../services/UserService';

export const UserContext = createContext()

export const UserProvider = props => {
    
    const [user, setUser] =  useState();

    useEffect(() => {
        
        UserService().getUserAuthenticated().then((response) => {setUser(response.data)})

    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>

    )
}