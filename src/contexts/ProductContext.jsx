import { createContext } from 'react'
import axios from '../config/axios';
import { useState } from 'react';
import { useEffect } from 'react';




const ProductContext = createContext();

export default function ProductContextProvider({ children }) {

    useEffect(() => {
        fetchProduct();
        // fetchCart();
    }, [])

    // Main Product ต้อง set name และ price มาตั้งแต่ตอนเลือก card หน้า home
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [mainProducts, setMainProducts] = useState([]);
    const [mainProductPrice, setMainProductPrice] = useState();
    const [mainProductDesc, setMainProductDesc] = useState('');
    const [mainProductImage, setMainProductImage] = useState();

    // array ของ addOn
    const [addOnProducts, setAddOnProducts] = useState([]);

    // monk
    const [monkExpense, setMonkExpense] = useState({});

    // carts[] Array that fetch from backend
    const [carts, setCarts] = useState([])


    const fetchCart = async () => {
        const response = await axios.get('/cart/get')
        const data = response.data.carts
        setCarts(data)
    }

    const deleteCart = async (cartId) => {
        try {
            const response = await axios.delete(`/cart/delete/${cartId}`);
            if (response.status === 200) {
                fetchCart(); // Refresh the cart list after deletion.
            }
        } catch (error) {
            console.error("Error deleting cart:", error);
        }
    };


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
                selectedProduct, setSelectedProduct,
                mainProductPrice, setMainProductPrice,
                mainProductDesc, setMainProductDesc,
                mainProductImage, setMainProductImage,
                addOnProducts, setAddOnProducts,
                createToCart,
                carts, setCarts,
                fetchProduct, fetchCart, deleteCart
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext };