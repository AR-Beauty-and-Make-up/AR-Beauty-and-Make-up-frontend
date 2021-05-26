import { Badge, Container, Grid } from "@material-ui/core"
import CartItem from './CartItem'

import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
  item: {
    paddingBottom:"20px"
  },
  total: {
      paddingTop: "30px" 
  }
}))


const CartShopping = (props) => {
    
    const classes = useStyle()

    const totalProducts = (products) => {
        const reducer = (acc, curValue) => acc + curValue

        if(products.length == 0) {
            return 0
        }
        return products.map(({product, quantity}) => product.price*quantity).reduce(reducer)
    }

    const [total, setTotal] =  useState(totalProducts(props.products))
    debugger
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <h2>Tus compras</h2>
                </Grid>
                <Grid item xs={12}>
                    {props.products.length == 0? <p>Aun no tienes compras</p>: null}
                    {props.products.map((product) => {

                        return (
                            <Grid item xs={12} className={classes.item}>
                                <CartItem  item={product} 
                                           addProduct={props.addProduct} 
                                           removeProduct={props.removeProduct}
                                           setTotal={setTotal}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12} className={classes.total}>
                    {props.products.length !=0 &&
                    <div>
                        <h3>Total:</h3>
                        <p>{total.toFixed(2)}</p>
                    </div>
                    }
                </Grid>
            </Grid>
            
        </Container>
  
    )
}


export default CartShopping
