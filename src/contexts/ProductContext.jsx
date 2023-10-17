import { createContext } from 'react'
import axios from '../config/axios';
import { useState } from 'react';
import { useEffect } from 'react';




const ProductContext = createContext();

export default function ProductContextProvider({ children }) {

    useEffect(() => {
        fetchProduct();
    }, [])

    const [mainProducts, setMainProducts] = useState([]);

    const [addOnProducts, setAddOnProducts] = useState([]);

    // monk
    const [monkExpense, setMonkExpense] = useState({});

    // cartItem
    const [cartItem, setCartItem] = useState([])



    const createToCart = async (input) => {

        // cartItem = []
        // cartItem.push({},{})

        // const data = {
        //     totalPrice: totalPrice,
        //     userId: 2,
        //     lat: clicked.lat,
        //     lng: clicked.lng,
        //     eventDate: eventDate,
        //     cartItem: [
        //         {
        //             amount: 1,
        //             productId: 1,
        //             totalPrice: 12000
        //         },
        //         {
        //             amount: 5,
        //             productId: 4,
        //             totalPrice: 5000
        //         }
        //     ]
        // }

        const response = await axios.post('/cart/add', input)
        console.log(response.data);


        // const cart = 
    }


    const fetchProduct = async () => {
        const response = await axios.get('/product/get', {})

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
        <ProductContext.Provider
            value={{
                mainProducts,
                monkExpense,


                addOnProducts, setAddOnProducts,

                cartItem, setCartItem, createToCart
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext };