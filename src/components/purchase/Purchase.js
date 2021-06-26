
import { useEffect, useContext, useState } from "react"
import UserService from "../../services/UserService"
import { UserContext } from "../../providers/userProvider"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Grid } from "@material-ui/core";
import moment from "moment-timezone";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //overflow: 'scroll'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));



const Purchase = () => {

    const SERVICE =  UserService()
    const [user, setUser] = useContext(UserContext)
    const [purchases, setPurchases] = useState([])
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const sortPurchases = (purchaseA, purchaseB) => {
      return purchaseB.id - purchaseA.id 
    }

    const total = (purchase) => {
      const reducer = (acc, curValue) => acc + curValue

      return purchase.purchaseItems.map((item) => item.product.price * item.quantity).reduce(reducer)
    }
    
    useEffect(() => {
        SERVICE.getPurchases(user.id).then((response) => {
            const purchases = response.data.sort(sortPurchases)
            setPurchases(purchases)
        })
    }, [])

    const NoPurchase = () => {
        return (
            <div>
                Aun no hay compras realizadas
            </div>
        )
    }

    const AccordionElement = (props) => {
      return (
        <Grid Container style={{display: 'flex', alignItems: 'flex-end'}}>
          <Grid item xs={3}>
            <img src={props.item.product.photo} height={"150px"} alt={"Producto"} />
          </Grid>
          <Grid item xs={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
          <Typography>
                {props.item.product.productName +' x ' +props.item.quantity}
          </Typography>
          </Grid>
          <Grid item xs={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Typography>
                {'Precio: ' + props.item.product.price * props.item.quantity}
          </Typography>
          </Grid>
        </Grid>
      )
    }

    const ListOfPurchases = () => {
        return (
            <Container>  
            <div className={classes.root}>
                {   
                    purchases.map((purchase, index) => {
                        return(
                            <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                
                                <Typography className={classes.heading}>Compra realizada:</Typography>
                                <Typography className={classes.secondaryHeading}>{moment(purchase.date).tz( "America/Argentina/Buenos_Aires").format("DD-MM-YYYY")}</Typography>
                                <Typography className={classes.heading}>Total:</Typography>
                                <Typography className={classes.secondaryHeading}>{total(purchase)}</Typography>
                                
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container>
                                {purchase.purchaseItems.map((item) => <AccordionElement item={item} />)}
                                </Container>   
                            </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
            </Container>
        )
    }


    return(
        <div>
            {!purchases&&<NoPurchase />}
            {!!purchases&&<ListOfPurchases />}
        </div>
    )
}


export default Purchase