import {Container, Grid} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Paper from '@material-ui/core/Paper';

import {makeStyles} from '@material-ui/core/styles';
import {useContext, useState} from 'react'
import {ProductContext} from '../../providers/productProvider'

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
    const [products, removeProduct, addProduct, initProducts] = useContext(ProductContext)
    const [counter, setCounter] = useState(props.item.quantity)


    return (
        <Container maxWidth='xs'>
            <Grid container>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>{props.item.product.productName}</h2>
                        </Grid>
                        <Grid data-testid={props.item.product.id + "product-price"} item xs={6}>
                            {"Precio:" + props.item.product.price.toFixed(2)}
                        </Grid>
                        <Grid data-testid={props.item.product.id + "subtotal"} item xs={6} className={classes.total}>
                            {"Subtotal:" + (props.item.product.price * counter).toFixed(2)}
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid container>
                                 <Grid item xs={4}>
                                    <AddIcon data-testid={props.item.product.id + "add-unit-button"} onClick={() =>
                                        {   
                                            setCounter(prevCounter => prevCounter + 1)
                                            addProduct(props.item.product)
                                            props.setTotal(prevTotal => prevTotal + props.item.product.price)
                                        }}/>
                                </Grid>
                                <Grid data-testid={props.item.product.id + "quantity"} item xs={4} className={classes.quantity}>
                                    {counter}
                                </Grid>
                                <Grid item xs={4} className={classes.total}>
                                    <RemoveIcon data-testid={props.item.product.id + "minus-unit-button"} onClick={() =>
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
                    <img src={props.item.product.photo} height={"150px"} alt={"Producto"} />
                </Grid>
            </Grid>
        </Container>
    )
}


export default CartItem