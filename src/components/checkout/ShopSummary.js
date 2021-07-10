import {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {ProductContext} from '../../providers/productProvider'

const useStyles = makeStyles((theme) => ({ 
    paper: {
        width: '30vw',
        height: '50vh',
        overflow: 'scroll'
    },
    divPaper: {
        display: 'flex',
        justifyContent: 'center',
        padding: 70
    }
  }))


const ShopSummary = () => {

    const classes = useStyles()
    const [products, removeProduct, addProduct] = useContext(ProductContext)

    return (
        <div className={classes.divPaper}>
            <Paper className={classes.paper}>
                <List className={classes.root}>
                    {products.map((prod) => {
                        return(
                            <div>
                                <ListItem>
                                    <ListItemText primary={prod.product.productName+" x "+prod.quantity} 
                                                  secondary={"Subtotal: "+prod.product.price * prod.quantity} />
                                </ListItem>
                                <Divider component="li" variant='middle' />
                            </div>
                        )
                    })}
                </List>
            </Paper>
        </div>
        )
}


export default ShopSummary