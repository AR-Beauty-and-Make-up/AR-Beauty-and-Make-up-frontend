import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import TurnService from '../../services/TurnService';
import Product from './Product'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    item: {
        paddingBottom: '10px',
    }
  }));

const Store = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        TurnService().getProducts().then((response) => {
            setProducts(response.data)
        })
    }, [])


    const Products = () => {
        return [...products,...products,...products,...products].map((prod, index) => <Grid className={classes.item} item key={index}><Product prod={prod}/></Grid> )
    }

    return(
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                >
                <Products />
            </Grid>
        </div>
    )
}


export default Store