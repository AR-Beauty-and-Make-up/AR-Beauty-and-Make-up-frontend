
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
import { Container } from "@material-ui/core";
import moment from "moment-timezone";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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


function ControlledAccordions() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
      <div className={classes.root}>
        
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>
              You are currently not an owner
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Advanced settings</Typography>
            <Typography className={classes.secondaryHeading}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
              vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
              vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }


const Purchase = () => {

    const SERVICE =  UserService()
    const [user, setUser] = useContext(UserContext)
    const [purchases, setPurchases] = useState([])
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    useEffect(() => {
        SERVICE.getPurchases(user.id).then((response) => {
            setPurchases(response.data)
        })
    }, [])

    const NoPurchase = () => {
        return (
            <div>
                Aun no hay compras realizadas
            </div>
        )
    }

    const ListOfPurchases = () => {
        return (
            <Container>  
            <div className={classes.root}>
                {
                    purchases.map((purchase, index) => {
                        debugger
                        return(
                            <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                
                                <Typography className={classes.heading}>Compra realizada:</Typography>
                                <Typography className={classes.secondaryHeading}>{moment(purchase.purchaseDate).tz( "America/Argentina/Buenos_Aires").format("DD-MM-YYYY")}</Typography>
                                
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container>
                                <Typography>
                                    {purchase.items.map((item) => {
                                        return (
                                            <div style={{display: 'flex', justifyContent: "space-around"}}>
                                                <div>
                                                    {item.product.productName}
                                                </div>
                                                <div>
                                                    {item.quantity}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Typography>
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