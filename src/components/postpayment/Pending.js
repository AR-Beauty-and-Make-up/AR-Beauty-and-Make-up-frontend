import { useEffect, useContext, useState } from "react"
import { ProductContext } from "../../providers/productProvider"
import { UserContext } from "../../providers/userProvider"
import UserService from "../../services/UserService"
import { CircularProgress } from "@material-ui/core"
import {makeStyles} from '@material-ui/core/styles';
import { Container, Paper } from "@material-ui/core"

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

const Pending = () => {

    const classes = useStyles()

    const [loading, setLoading] = useState(true)
    const [products, removeProduct, addProduct, initProducts]  =  useContext(ProductContext)
    const [user, setUser] = useContext(UserContext)

    const cleanCart = () => {
            localStorage.removeItem('cart')
            initProducts()
    }

    useEffect(() => {
        setLoading(false)
        cleanCart()        
    }, [])


    const Message = () => {
        return (
            <div className={classes.notificationStyle}>
              <p className={classes.titleMessage}>Gracias por confiar en nosotros!</p>
    
              <p>Una vez hayamos registrado tu pago. Enviaremos un mail con tu factura a la dirección de correo: {user?.email}</p>
    
              <p>Favor contactenos por whatsapp al 1162434990 o 
                  a través de nuestras redes sociales ante cualquier consulta.</p>
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


export default Pending