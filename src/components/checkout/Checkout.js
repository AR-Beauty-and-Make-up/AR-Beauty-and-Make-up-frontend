
import {Paper, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import BillingAddress from './BillingAddress'
import ShopSummary from './ShopSummary'
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: '80vh'
    },
  }));


const Checkout = () => {

    const classes = useStyles()

    return (
        <Container maxWidth="xl">
            <Paper className={classes.paper} elevation={10}>
                <Grid container>
                    <Grid item xs={6}>
                        <BillingAddress />
                    </Grid>
                    <Grid item xs={6}>
                        <ShopSummary />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}


export default Checkout