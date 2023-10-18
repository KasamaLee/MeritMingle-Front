import { useState } from "react"
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/use-auth"
import { useProduct } from "../hooks/use-product";

export default function HomePage() {


    const { isOpen, setIsOpen } = useAuth();

    const { mainProducts, mainProductPrice, setMainProductPrice, selectedProduct, setSelectedProduct } = useProduct();


    // console.log(mainProducts)

    return (
        <>
            {/* ---- HERO SECTION ---- */}
            <div className=" bg-gray-200 ">
                <div className="container flex justify-between py-6">

                    <div className="flex flex-col items-start justify-center max-w-md gap-6">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl text-gray-600">งานบุญ งานบวช ขึ้นบ้านใหม่ เสริมสิริมงคล</h1>
                            <p className="text-lg"> ให้ MeritMingle ช่วยดูแลวันสำคัญของคุณ</p>
                        </div>

                        <Link to='/product'>
                            <button className="cta-button shadow-md  hover:shadow-lg">นิมนต์ now</button>
                        </Link>

                    </div>
                    <img className="object-cover w-2/5 rounded-2xl " src="https://f.ptcdn.info/723/061/000/pkltx5avwSxPyzfJVDT-o.jpg" alt="hero-image" />
                </div>
            </div>

            {/* ---- PRODUCT SECTION ---- */}
            <div className="container py-16 grid grid-cols-2 gap-4">

                {mainProducts.map((productItem, index) => {
                    return (
                        <Link
                            to='/product'
                            key={index}
                            onClick={() => {
                                setSelectedProduct(productItem.name)
                                localStorage.setItem('selectedProductName', productItem.name);
                                setMainProductPrice(productItem.price)
                            }}>
                            <div className="bg-gray-300 flex justify-center items-center p-10 hover:shadow-lg">
                                {productItem.name}
                            </div>
                        </Link>
                    )
                })}


            </div >


        </>
    )
}
