
import React, {useState, createContext } from 'react'


export const CartContext = createContext()

export const CartProvider = props => {
    const [openCart, setOpenCart] = useState(false) 

    return (
        <CartContext.Provider value={[openCart, setOpenCart]}>
            {props.children}
        </CartContext.Provider>

    )
}