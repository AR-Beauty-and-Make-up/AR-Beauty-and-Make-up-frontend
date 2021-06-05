import { Badge, Container, Grid } from "@material-ui/core"
import CartItem from './CartItem'

import { makeStyles } from '@material-ui/core/styles';
import {useContext, useState} from 'react'
import {ProductContext} from '../../providers/productProvider'

import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'

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
    const [products, removeProduct, addProduct] = useContext(ProductContext)
    const [language, setLanguage] = useContext(LanguageContext)
    
    
    const totalProducts = (products) => {
        debugger
        const reducer = (acc, curValue) => acc + curValue

        if(products.length == 0) {
            return 0
        }
        return products.map(({product, quantity}) => product.price*quantity).reduce(reducer)
    }

    const [total, setTotal] =  useState(totalProducts(products))

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <h2>{TEXT[language].cartshopping.header}</h2>
                </Grid>
                <Grid item xs={12}>
                    {products.length == 0? <p>{TEXT[language].cartshopping.body}</p>: null}
                    {products.map((product) => {

                        return (
                            <Grid item xs={12} className={classes.item}>
                                <CartItem  item={product} 
                                           setTotal={setTotal}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12} className={classes.total}>
                    {products.length !=0 &&
                    <div>
                        <h3>{TEXT[language].cartshopping.footer}</h3>
                        <p>{total.toFixed(2)}</p>
                    </div>
                    }
                </Grid>
            </Grid>
            
        </Container>
  
    )
}


export default CartShopping
