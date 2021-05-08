import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import TurnService from '../../services/TurnService';
import Product from './Product'



const Store = () => {
    
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        TurnService().getProducts().then((response) => {
            setProducts(response.data)
        })
    }, [])


    const Products = () => {
        return [...products,...products].map((prod, index) => <Grid item key={index}><Product prod={prod}/></Grid> )
    }

    return(
        <Grid container justify="center" spacing={3}>
            <Products />
        </Grid>
    )
}


export default Store