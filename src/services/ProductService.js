import axios from 'axios';


const SERVICE_URL = 'http://localhost:8080'

const ProductService = () => {


    const getProducts = () => {
        return axios.get(`${SERVICE_URL}/products`)
    }

    const getPageProducts = (page) => {
        return axios.get(`${SERVICE_URL}/products/page?page=${page}`)
    }

    const checkOut = (purchase) => {
        return axios.post(`${SERVICE_URL}/check-out`, {purchaseItems: purchase})
    } 

    return {
        getProducts: getProducts,
        getPageProducts: getPageProducts,
        checkOut: checkOut
    }



}


export default ProductService