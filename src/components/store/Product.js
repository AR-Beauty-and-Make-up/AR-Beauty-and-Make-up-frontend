import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {useContext} from 'react'
import {ProductContext} from '../../providers/productProvider'

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 300,
      minHeight: 300,
      padding: theme.spacing(2),
      
    },
    media: {
      height: 200,
      width: 300
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    icon: {
      paddingLeft: '5px'
    }
  }));

const Product = (props) => {
    const classes = useStyles();
    const [products, removeProduct, addProduct] = useContext(ProductContext)

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                src={props.prod.photo}
                component="img"
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h7" component="div">
                    {props.prod.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.prod.price + "$"}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container justify="center" spacing={1}>
                    <Button size="medium"  onClick={() => {
                      addProduct(props.prod)
                      
                      }}>
                    Agregar al carrito
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    )
}



export default Product