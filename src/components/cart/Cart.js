import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartShopping from './CartShopping'
import Drawer from '@material-ui/core/Drawer'

import useCart from '../../utils/useCart'

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



const Cart = (props) => {

    const classes = useStyle()

    const [{openCart, setOpenCart}] = useCart()
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
                    <CartShopping products={props.products} addProduct={props.addProduct} removeProduct={props.removeProduct} />
                </Drawer>
                <IconButton className={classes.cart} onClick={() => setOpenCart(true)}>
                <Badge badgeContent={props.products.length} color='error' onClick={()=>  console.log(props.products)}>
                    <ShoppingCartIcon  fontSize='large'/>
                </Badge> 
                </IconButton>
          </>
        )
    }

    return <></>
    
}


export default Cart