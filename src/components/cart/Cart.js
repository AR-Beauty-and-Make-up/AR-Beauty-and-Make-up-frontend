import {useContext, useState} from 'react'
import {ProductContext} from '../../providers/productProvider'

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartShopping from './CartShopping'
import Drawer from '@material-ui/core/Drawer'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    cart: {
      position: "fixed",
      zIndex: 100,
      right: "20px",
      top: "70px",
    },
  }))



const Cart = () => {

    const classes = useStyle()
    const [products, removeProduct, addProduct] = useContext(ProductContext)
    const [openCart, setOpenCart] = useState(false)
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
                <IconButton className={classes.cart} onClick={() => setOpenCart(true)}>
                <Badge badgeContent={products.length} color='error' onClick={()=>  console.log(products)}>
                    <ShoppingCartIcon  fontSize='large'/>
                </Badge> 
                </IconButton>
          </>
        )
    }

    return <></>
    
}


export default Cart