import { Container, Grid } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import {useContext, useState} from 'react'
import {ProductContext} from '../../providers/productProvider'

import { LanguageContext } from '../../providers/languageProvider';

import TEXT from '../../helpers/Languages'

const useStyle = makeStyles((theme) => ({
  total: {
    textAlign:"right"
  },
  quantity: {
      textAlign: "center"
  }
}))

const CartItem = (props) => {

    const classes = useStyle()
    const [products, removeProduct, addProduct] = useContext(ProductContext)
    const [language, setLanguage] = useContext(LanguageContext)

    const [counter, setCounter] = useState(props.item.quantity)


    return (
        <Container>
            <Grid container>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>{props.item.product.productName}</h2>
                        </Grid>
                        <Grid item xs={6}>
                            {TEXT[language].cartitem.price + props.item.product.price.toFixed(2)}
                        </Grid>
                        <Grid item xs={6} className={classes.total}>
                            {TEXT[language].cartitem.subtotal + (props.item.product.price * counter).toFixed(2)}
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid container>
                                 <Grid item xs={4}>
                                    <AddIcon  onClick={() => 
                                        {   
                                            setCounter(prevCounter => prevCounter + 1)
                                            addProduct(props.item.product)
                                            props.setTotal(prevTotal => prevTotal + props.item.product.price)
                                        }}/>
                                </Grid>
                                <Grid item xs={4} className={classes.quantity}>
                                    {counter}
                                </Grid>
                                <Grid item xs={4} className={classes.total}>
                                    <RemoveIcon onClick={() => 
                                        {   
                                            setCounter(prevCounter => prevCounter - 1)
                                            removeProduct(props.item.product)
                                            props.setTotal(prevTotal => prevTotal - props.item.product.price)
                                        }}
                                    />
                                </Grid>
                                </Grid>
                            </Paper>
                        </Grid>


                    </Grid>
                    
                </Grid>
                <Grid item xs={4}>
                    <img src={props.item.product.photo} height={"120px"} alt={"Producto"} />
                </Grid>
            </Grid>
        </Container>
    )
}


export default CartItem