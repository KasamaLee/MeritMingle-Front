import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/use-auth"
import { useProduct } from "../hooks/use-product";
import heroImage from "../assets/images/heroImage.jpeg"
import Lottie from 'react-lottie';
import animationRobot from '../assets/robot.json';


export default function HomePage() {

    const { mainProducts, mainProductPrice, setMainProductPrice, selectedProduct, setSelectedProduct, mainProductImage, setMainProductImage } = useProduct();

    console.log(mainProducts)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationRobot,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <>
            {/* ---- HERO SECTION ---- */}
            <div className=" bg-gray-100 ">
                <div className="container flex justify-between pt-24 pb-12">

                    <div className="flex flex-col items-start justify-center max-w-md gap-6">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl text-gray-600">งานบุญ งานบวช ขึ้นบ้านใหม่ เสริมสิริมงคล</h1>
                            <p className="text-lg"> ให้ MeritMingle ช่วยดูแลวันสำคัญของคุณ</p>
                        </div>

                        <Link to='/product'>
                            <button className="cta-button shadow-md hover:opacity-60 cursor-pointer">นิมนต์ now</button>
                        </Link>
                    </div>
                    <div className='w-1/2 relative'>
                        <img className="object-cover h-64 w-full rounded-2xl " src={heroImage} alt="hero-image" />
                        <div className='absolute -bottom-14 right-[20%]'>
                            <Lottie options={defaultOptions} width={280} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- PRODUCT SECTION ---- */}
            <div className="container py-16 grid grid-cols-2 gap-8">
                {mainProducts.map((productItem, index) => {
                    return (
                        <Link
                            to='/product'
                            key={index}
                            onClick={() => {
                                setSelectedProduct(productItem.name)
                                setMainProductPrice(productItem.price)
                                setMainProductImage(productItem.productImage)
                                // localStorage.setItem('selectedProductName', productItem.name);
                            }}>
                            <div className="bg-gray-300 flex justify-center items-center cursor-pointer h-64 rounded-xl overflow-hidden relative transform transition duration-100 ease-in-out  hover:-translate-y-2 hover:shadow-2xl">
                                <h4 className='absolute text-white text-2xl z-10 bottom-6'>{productItem.name}</h4>
                                <img src={productItem.productImage} className='w-full h-full object-cover' alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-1/3 top-2/3"></div>
                            </div>

                        </Link>
                    )
                })}
            </div >


        </>
    )
}
