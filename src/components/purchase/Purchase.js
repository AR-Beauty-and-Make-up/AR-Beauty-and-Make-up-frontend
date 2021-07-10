import React, {useContext, useEffect, useState} from "react"
import UserService from "../../services/UserService"
import {UserContext} from "../../providers/userProvider"
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Container, Grid} from "@material-ui/core";
import moment from "moment-timezone";
import './purchase.scss'
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '5% 0%'
    //overflow: 'scroll'
  },
  title: {
    textAlign: 'start',
    fontSize: 'larger',
    fontWeight: '500',
    padding: '0% 17%',
  },
  accordion: {
    display: 'flex',
    alignItems: 'center'
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

  const SERVICE = UserService()
  const history = useHistory()
  const [user, setUser] = useContext(UserContext)
  const [purchases, setPurchases] = useState([])
  const [expanded, setExpanded] = useState(false)
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
    SERVICE.getUserAuthenticated().then((response) => {
      if(!!response.data){
        SERVICE.getPurchases(response.data.id).then((response) => {
          const purchases = response.data.sort(sortPurchases)
          setPurchases(purchases)
        })
      }else{
        history.push('/')
      }

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
      <Grid Container className={classes.accordion}>
        <Grid item xs={6} className="photoContainerPurchase">
          <img src={props.item.product.photo} alt={"Producto"}/>
        </Grid>
        <Grid item xs={6} className={classes.accordion}>
          <Grid Container>
            <Grid item xs={12} className={classes.accordion}>
              <Typography>
                {props.item.product.productName + ' x ' + props.item.quantity}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.accordion}>
              <Typography>
                {'Precio unitario: ' + props.item.product.price.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.accordion}>
              <Typography>
                {'Subtotal: ' + (props.item.product.price * props.item.quantity).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    )
  }

  const ListOfPurchases = () => {
    return (
      <div>
        <div className={classes.title}>Mis Compras</div>
        <Container maxWidth="md">
          <div className={classes.root}>
            {
              purchases.map((purchase, index) => {
                return (
                  <Accordion expanded={expanded === index}
                             onChange={handleChange(index)}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon/>}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >

                      <Typography className={classes.heading}>Fecha de compra :</Typography>
                      <Typography
                        className={classes.secondaryHeading}>{moment(purchase.date).tz("America/Argentina/Buenos_Aires").format("DD-MM-YYYY")}</Typography>
                      <Typography className={classes.heading}>Total:</Typography>
                      <Typography className={classes.secondaryHeading}>{total(purchase).toFixed(2)}</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                      <Container>
                        {purchase.purchaseItems.map((item) => <AccordionElement item={item}/>)}
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                )
              })
            }
          </div>
        </Container>
      </div>
    )
  }


  return (
    <div>
      {!purchases && <NoPurchase/>}
      {!!purchases && <ListOfPurchases/>}
    </div>
  )
}


export default Purchase