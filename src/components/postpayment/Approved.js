import { useEffect, useContext, useState } from "react"
import { ProductContext } from "../../providers/productProvider"
import { UserContext } from "../../providers/userProvider"
import UserService from "../../services/UserService"
import { CircularProgress } from "@material-ui/core"

const Approved = () => {

    const [loading, setLoading] = useState(true)
    const [products, removeProduct, addProduct, initProducts]  =  useContext(ProductContext)
    const [user, setUser] = useContext(UserContext)
    const SERVICE = UserService()

    const cleanCart = () => {
            localStorage.removeItem('cart')
            initProducts()
    }

    useEffect(() => {

        let params = new URLSearchParams(document.location.search.substring(1));
        let status = params.get("collection_status")

        if(status === 'approved'){
            SERVICE.addPurchase(user.id, products).then(() => {

                setLoading(false)
                cleanCart()
            })
        }
        


    }, [])


    const GratefullMessage = () => {
        return(
        <div>
            <h4><b>{user.fullname}</b>, gracias por tu compra</h4>
            <h6>
                Volver a la pagina principal. <a href="/">Aqui</a>
            </h6>
        </div>
        )
    }

    return (
        <div>
            {loading && <CircularProgress />}
            {!loading && <GratefullMessage />}
        </div>
    )
}


export default Approved