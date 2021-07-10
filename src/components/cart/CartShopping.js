import {Button, Container, Grid} from "@material-ui/core"
import CartItem from './CartItem'

import {makeStyles} from '@material-ui/core/styles';
import {useContext, useState} from 'react'
import {ProductContext} from '../../providers/productProvider'
import {useHistory} from "react-router-dom";
import {CartContext} from '../../providers/cartProvider'
import {UserContext} from "../../providers/userProvider";


const useStyle = makeStyles((theme) => ({
  item: {
    paddingBottom: "20px"
  },
  total: {
    paddingTop: "30px"
  },
  button: {
    backgroundColor: "#f3d5d7",
    '&:hover': {
      backgroundColor: "#f3d5d7"
    }

  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  price: {
    display: 'flex',
    alignItems: 'baseline',
    textAlign: 'left'
  },
  divButton: {
    paddingRight: 30,
  }
}))


const CartShopping = (props) => {


  const classes = useStyle()
  const [products, removeProduct, addProduct, initProducts] = useContext(ProductContext)
  const [openCart, setOpenCart] = useContext(CartContext)
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()

  const totalProducts = (products) => {

    const reducer = (acc, curValue) => acc + curValue

    if (products.length == 0) {
      return 0
    }
    return products.map(({product, quantity}) => product.price * quantity).reduce(reducer)
  }

  const goToCheckout = () => {
    if (!!user) {
      history.push('/check-out')
    }else{
      history.push('/login')
    }
  }

  const [total, setTotal] = useState(totalProducts(products))

  return (
    <Container maxWidth='xs'>
      <Grid container>
        <Grid item xs={12}>
          <h2>Tus compras</h2>
        </Grid>
        <Grid item xs={12}>
          {products.length == 0 ? <p data-testid="Empty Cart">Aun no tienes compras</p> : null}
          {products.map((product) => {

            return (
              <Grid item xs={12} className={classes.item}>
                <CartItem item={product}
                          setTotal={setTotal}
                />
              </Grid>
            )
          })}
        </Grid>
        <Grid item xs={12} className={classes.total}>
          {products.length != 0 &&
          <div className={classes.footer}>
            <div className={classes.price}>
              <h3>Total:</h3>
              <p data-testid="total" aria-label="Total price">{total.toFixed(2)}</p>
            </div>
            <div className={classes.divButton}>
              <Button className={classes.button} variant="contained" onClick={() => {
                goToCheckout()
                setOpenCart(false)
              }}>
                Proceder al pago
              </Button>
            </div>
          </div>
          }
        </Grid>
      </Grid>

    </Container>

  )
}


export default CartShopping
