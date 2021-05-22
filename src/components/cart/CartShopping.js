import { Badge, Container, Grid } from "@material-ui/core"
import useCart from '../../utils/useCart'
import CartItem from './CartItem'

import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  item: {
    paddingBottom:"20px"
  },
}))


const Cart = (props) => {
    
    const classes = useStyle()

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <h2>Tus compras</h2>
                </Grid>
                <Grid item xs={12}>
                    {props.products.length == 0? <p>Aun no tienes compras</p>: null}
                    {props.products.map((product) => {

                        return <Grid item xs={12} className={classes.item}><CartItem  item={product} /></Grid> 
                    })}
                </Grid>
            </Grid>
        </Container>
  
    )
}


export default Cart
