import {Container, Grid, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import BillingAddress from './BillingAddress'
import ShopSummary from './ShopSummary'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: '2%'
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