import { createContext } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductContext = createContext();

export default function ProductContextProvider({ children }) {


    useEffect(() => {
        fetchProduct();
    }, [])

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [mainProducts, setMainProducts] = useState([]);
    const [addOnProducts, setAddOnProducts] = useState([]);
    const [monkExpense, setMonkExpense] = useState({})

    const addToCart = async () => {
        const response = await axios.post('http//localhost:8888/product')
    }


    const fetchProduct = async () => {
        const response = await axios.get('http://localhost:8888/product/get')

        const allProducts = response.data.products

        const filterAddOn = []

        const filterMain = allProducts.filter((item) => {
            if (item.type === 'MAIN') {
                return true
            } else if (item.type === 'ADD_ON') {
                filterAddOn.push(item);
                return false
            } else if (item.type === 'MONK') {
                setMonkExpense(item);
                return false
            }
        })
        setMainProducts(filterMain);
        setAddOnProducts(filterAddOn);
    }


    return (
        <ProductContext.Provider value={{ mainProducts, addOnProducts, monkExpense, selectedProduct, setSelectedProduct }}>{children}</ProductContext.Provider>
    )
}

export { ProductContext };