import { Container, Grid } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

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

    return (
        <Container>
            <Grid container>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>{props.item.productName}</h2>
                        </Grid>
                        <Grid item xs={6}>
                            {"Precio:" + props.item.price}
                        </Grid>
                        <Grid item xs={6} className={classes.total}>
                            {"Total:" + props.item.price}
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Grid container>
                                 <Grid item xs={4}>
                                    <AddIcon />
                                </Grid>
                                <Grid item xs={4} className={classes.quantity}>
                                    1
                                </Grid>
                                <Grid item xs={4} className={classes.total}>
                                    <RemoveIcon />
                                </Grid>
                                </Grid>
                            </Paper>
                        </Grid>


                    </Grid>
                    
                </Grid>
                <Grid item xs={4}>
                    <img src={props.item.photo} height={"120px"} alt={"Producto"} />
                </Grid>
            </Grid>
        </Container>
    )
}


export default CartItem