import React from 'react'
import { useProduct } from '../../hooks/use-product'

export default function ProductItem({ productItem }) {

    const { selectedProduct, setSelectedProduct } = useProduct();

    return (
        <label
            className={`rounded py-2 px-6 outline-none ring ring-gray-300  hover:outline-none hover:ring hover:ring-orange-300 ${selectedProduct === productItem.name ? 'outline-none ring ring-orange-300' : ''}`}
        >
            <input
                name={productItem.name}
                onClick={() => setSelectedProduct(productItem.name)}
                className="sr-only"
                type="radio"
            />

            <div className="flex flex-col">
                <span className="text-gray-600 text-md">{productItem.name}</span>
            </div>
        </label>
    )
}
