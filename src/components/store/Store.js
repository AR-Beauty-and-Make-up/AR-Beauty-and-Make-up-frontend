import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import ProductService from '../../services/ProductService';
import Product from './Product'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    item: {
        paddingBottom: '10px',
    },
    pagination: {
        position: 'fixed',
        paddingTop: '20px',
        paddingBottom: '10px',
        bottom: 0
    },
    paginationParent: {
        display: 'flex',
        justifyContent: 'center',
    }
  }));

const Store = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState(1);
    const SERVICE = ProductService()
    
    useEffect(() => {paginated(1, true)}, [])


    const Products = () => {
        return products.map((prod, index) => <Grid className={classes.item} item key={index}><Product prod={prod}/></Grid> )
    }

    const paginated = (pageNumber, setPage) => {
        SERVICE.getPageProducts(pageNumber - 1).then((response) => 
        {   
            console.log(document.getElementById("pag").clientWidth)
            if(setPage) {
                setPages(response.data.totalPages)
            }
            setProducts(response.data.content)})
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
            <div className={classes.paginationParent}>
                <Pagination 
                id="pag"
                className={classes.pagination} count={10} 
                onChange={(event, page) => paginated(page, false)}
                size="large"
                count={pages}
                />
            </div>
        </div>
    )
}


export default Store