import axios from 'axios';


const SERVICE_URL = 'http://localhost:8080'

const ProductService = () => {


    const getProducts = () => {
        return axios.get(`${SERVICE_URL}/products`)
    }

    const getPageProducts = (page) => {
        return axios.get(`${SERVICE_URL}/products/page?page=${page}`)
    }

    return {
        getProducts: getProducts,
        getPageProducts: getPageProducts
    }



}


export default ProductService