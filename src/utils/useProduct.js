import {useState, useEffect} from "react";


const useCart = () => {
    const [products, setProducts] = useState(() =>  JSON.parse(localStorage.getItem('cart')) || [])


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(products))
      }, [products])

    const removeProduct = (item) => {
        
        const [selected] = products.filter(({product, quantity}) => product.id == item.id)

        if (selected.quantity === 1) {
            const newProducts = products.filter(({product, quantity}) => product.id != item.id)
            setProducts(newProducts)
        }
        else {
            setProducts(subtractQuantity(products, item))
        }  
            
        
    }

    const subtractQuantity = (prods, item) => {
        const newProds = [...prods]

        newProds.forEach((prod) => {
            if(prod.product.id === item.id) {
                prod.quantity -= 1
            }
        })
        return newProds
    }

    const addQuantity = (prods, item) => {

        const newProds = [...prods]

        newProds.forEach((prod) => {
            if(prod.product.id === item.id) {
                prod.quantity += 1
            }
        })
        return newProds
        
    }   

    const addProduct = (item) => {
        
        const selected = products.filter(({product, quantity}) => product.id == item.id)
        if(selected.length > 0) {
            setProducts(addQuantity(products, item))
        }
        else {
            setProducts(prevProducts => [...prevProducts, {product:item, quantity: 1}])
        }
        
    }

    const initProducts = () => {
        setProducts([])
    }

    return [products, removeProduct, addProduct, initProducts]
}

export default useCart