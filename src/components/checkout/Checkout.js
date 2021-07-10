import {Container, Grid, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import BillingAddress from './BillingAddress'
import ShopSummary from './ShopSummary'
import {useEffect} from "react";
import UserService from "../../services/UserService";
import {useHistory} from "react-router";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: '2%'
    },
  }));


const Checkout = () => {

    const classes = useStyles()
    const SERVICE = UserService()
    const history = useHistory()

    useEffect(() => {
        SERVICE.getUserAuthenticated().then((response) => {
            if(!response.data){
                history.push('/')
            }
        })

    }, [])

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