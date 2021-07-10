import {Button, Grid} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Paper from '@material-ui/core/Paper';

import {makeStyles} from '@material-ui/core/styles';
import {useContext} from 'react'
import {ProductContext} from '../../providers/productProvider'

import './cartItem.scss';

const useStyle = makeStyles((theme) => ({
  item: {
      backgroundColor: "#f4f1f1",
      border: "2px solid #1a1616"
  },
  quantity: {
      textAlign: "center"
  },
  textElements: {
    display: "flex",
    alignItems: "flex-end"
  },
  prices: {
    fontSize: "14px"
  }
}))

const CartItem = (props) => {

    const classes = useStyle()
    const [products, removeProduct, addProduct, initProducts] = useContext(ProductContext)
    const counter = props.item.quantity

    return (
       
        <Grid className={classes.item} container spacing={2}>

            <Grid className="photoContainer" item xs={5}>
                <img src={props.item.product.photo}  alt={"Producto"} />
            </Grid>

            <Grid item xs={7} className={classes.textElements}>
                <Grid container >
                    <Grid item xs={12}>
                        <h5>{props.item.product.productName}</h5>
                    </Grid>
                    <Grid data-testid={props.item.product.id + "product-price"} item xs={6}>
                        <Grid container className={classes.prices}>
                        <p>
                            <b>
                            Precio: 
                            </b>
                            <span>{(props.item.product.price.toFixed(2))}</span>
                        </p>
                        </Grid>
                    </Grid>
                    <Grid data-testid={props.item.product.id + "subtotal"} item xs={6}>
                        <Grid container className={classes.prices}>
                        <p>
                            <b>
                                Subtotal: 
                            </b>
                            <span>{(props.item.product.price * counter).toFixed(2)}</span>
                        </p>
                        </Grid>
                    </Grid>
                    <Grid  item xs={12} >
                        <Paper className="paper" square elevation={0}>
                            <Grid container>
                                <Grid item xs={4}>
                                <Button data-testid={props.item.product.id + "add-unit-button"} onClick={() => {   
                                        addProduct(props.item.product)
                                        props.setTotal(prevTotal => prevTotal + props.item.product.price)
                                    }}>
                                    <AddIcon/>
                                </Button>
                                
                            </Grid>
                            <Grid data-testid={props.item.product.id + "quantity"} item xs={4} className={classes.quantity}>
                                {counter}
                            </Grid>
                            <Grid  item xs={4} className={classes.total}>
                                <Button data-testid={props.item.product.id + "minus-unit-button"} onClick={() => {
                                        removeProduct(props.item.product)
                                        props.setTotal(prevTotal => prevTotal - props.item.product.price)
                                    }}>
                                    <RemoveIcon />
                                </Button>
                            </Grid>
                            </Grid>
                        </Paper>
                    </Grid>


                </Grid>
                
            </Grid>
            
        </Grid>
    )
}


export default CartItem