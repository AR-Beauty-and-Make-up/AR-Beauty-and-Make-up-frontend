import {useState, useEffect} from "react";


const useCart = () => {
    const [openCart, setOpenCart] = useState(false);
    const [products, setProducts] = useState([]);

    const removeProduct = (item) => {
        let newProducts = [...products]
        let index = newProducts.indexOf(item)

        if (index > -1) {
            newProducts.splice(index, 1);
        }

        setProducts(newProducts)

    }

    const addProduct = (item) => {
        const exists = products.filter((product, quantity) => product.id == item.id)
        if(exists) {
            
        }
        
    }

    return [{openCart, setOpenCart}, {products, removeProduct, addProduct}]
}

export default useCart