import React from 'react'
import { useProduct } from '../../hooks/use-product'
import { useEffect } from 'react';

export default function ProductItem({ productItem, addToCart, error }) {

    const { selectedProduct, setSelectedProduct, mainProductPrice, setMainProductPrice, mainProductDesc, setMainProductDesc, mainProductImage, setMainProductImage } = useProduct();

    return (
        <label
            className={`rounded py-2 px-6 outline-none ring ring-gray-300  hover:outline-none hover:ring hover:ring-orange-300 ${selectedProduct === productItem.name ? 'outline-none ring ring-orange-300' : ''}`}
        >
            <input
                onClick={() => {
                    setSelectedProduct(productItem.name)
                    setMainProductImage(productItem.productImage)
                    setMainProductPrice(productItem.price)
                    setMainProductDesc(productItem.desc)
                    addToCart(productItem);
                    console.log(productItem.desc)
                }}
                className="sr-only"
                type="radio"
            />
            {/* {console.log(selectedProduct)}
            {console.log(mainProductPrice)} */}

            <div className="flex flex-col">
                <span className="text-gray-600 text-md">{productItem.name}</span>
            </div>
            {error.productId && <InputErrorMessage message={error.productId} />}

        </label>
    )
}
