import {useState, useEffect} from "react";


const useCart = () => {
    const [openCart, setOpenCart] = useState(false);
    const [products, setProducts] = useState([]);

    const removeProduct = (item) => {
        debugger
        
        const selected = products.filter(({product, quantity}) => product.id == item.id)
        if(selected.length > 0) {

            if (selected[0].quantity === 1) {
                let newProducts = products.filter(({product, quantity}) => product.id != item.id)

                setProducts(newProducts)
            }
            else {
                selected[0].quantity -= 1
            }  
            
        }
    }

    const addProduct = (item) => {
        
        const selected = products.filter(({product, quantity}) => product.id == item.id)
        if(selected.length > 0) {
            debugger
            selected[0].quantity += 1  
            
        }
        else {
            setProducts(prevProducts => [...prevProducts, {product:item, quantity: 1}])
        }
        
    }

    return [{openCart, setOpenCart}, {products, removeProduct, addProduct}]
}

export default useCart