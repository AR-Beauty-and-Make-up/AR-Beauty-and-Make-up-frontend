import {useContext, useState} from 'react'
import {ProductContext} from '../../providers/productProvider'
import {CartContext} from '../../providers/cartProvider'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CartShopping from './CartShopping'
import Drawer from '@material-ui/core/Drawer'
import { useLocation } from 'react-router-dom'


const Cart = () => {

    const [products, removeProduct, addProduct] = useContext(ProductContext)
    const [openCart, setOpenCart] = useContext(CartContext)
    const {pathname} = useLocation()

    
    const validLoation = (path) => {
        const excludedLocations = [
            "/login",
            "/sign-up",
            "/scheduler"
        ]

        return !excludedLocations.includes(path)
    }

    if( validLoation(pathname)) {
        return (
            <>
                <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
                    <CartShopping />
                </Drawer>
                <IconButton onClick={() => setOpenCart(true)}>
                <Badge badgeContent={products.length} color='error'>
                    <ShoppingCartOutlinedIcon  fontSize='large'/>
                </Badge> 
                </IconButton>
          </>
        )
    }

    return <></>
    
}


export default Cart