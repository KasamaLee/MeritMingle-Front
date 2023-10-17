import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";


export default function CartPage() {

  useEffect(() => {
    fetchCart();
  }, [])

  const [carts, setCarts] = useState([])

  const fetchCart = async () => {
    const response = await axios.get('http://localhost:8888/cart/get')

    const data = response.data.carts
    setCarts(data)

  }


  const price = carts.map((cart, index) => {
    const productNames = cart.CartItem.map(item => item.product.name);
    
    return cart.totalPrice + productNames + '----------'
  })


  return (
    <div className="container">
      {carts.map((cart, index) => {

        const productData = cart.CartItem.map(item => {
          const productNames = item.product.name
          const productPrice = item.totalPrice
          return productNames + productPrice
        });

        return (
          <>
            <p>{cart.totalPrice} </p>
            <p>{productData}</p>
            <p>--------------</p>
          </>
        )

      })}

      {/* <div>{price}</div> */}


    </div>
  )
}
