
import React, { createContext } from 'react'
import useProduct from "../utils/useProduct"

export const ProductContext = createContext()

export const ProductProvider = props => {

    return (
        <ProductContext.Provider value={useProduct()}>
            {props.children}
        </ProductContext.Provider>

    )
}