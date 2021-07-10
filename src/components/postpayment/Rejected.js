import { useEffect, useContext, useState } from "react"
import { ProductContext } from "../../providers/productProvider"
import { UserContext } from "../../providers/userProvider"
import UserService from "../../services/UserService"
import { CircularProgress, Paper } from "@material-ui/core"
import {makeStyles} from '@material-ui/core/styles';
import { Container } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({ 
    notificationStyle: {
        textAlign: 'left',
        padding: 10
      },
      titleMessage: {
        color: 'purple',
        fontWeight: '600',
        fontSize: 'larger'
      }
}))

const Rejected = () => {

    const classes = useStyles()

    const [loading, setLoading] = useState(true)
    const [products, removeProduct, addProduct, initProducts]  =  useContext(ProductContext)
    const [user, setUser] = useContext(UserContext)
    const SERVICE = UserService()

    const cleanCart = () => {
            localStorage.removeItem('cart')
            initProducts()
    }

    useEffect(() => {
        SERVICE.getUserAuthenticated().then((response) => {
            SERVICE.addPurchase(response.data.id, products).then(() => {
                
                setLoading(false)
                cleanCart()
            })
        })
        
    }, [])


    const Message = () => {
        return (
            <div className={classes.notificationStyle}>
              <p className={classes.titleMessage}>Lamentablemente ha ocurrido un error!</p>
    
              <p>Favor contactenos por whatsapp al 1162434990 o 
                  a través de nuestras redes sociales por cualquier consulta.</p>
    
    
            </div>
          )
    }


    return (
        <Container maxWidth="md">
            <Paper>
                {loading?<CircularProgress />:<Message />}
            </Paper>
        </Container>
    )
}


export default Rejected