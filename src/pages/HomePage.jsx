import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/use-auth"
import { useProduct } from "../hooks/use-product";


export default function HomePage() {

    const { mainProducts, mainProductPrice, setMainProductPrice, selectedProduct, setSelectedProduct } = useProduct();

    console.log(mainProducts)


    return (
        <>π
            {/* ---- HERO SECTION ---- */}
            <div className=" bg-gray-200 ">
                <div className="container flex justify-between py-12">

                    <div className="flex flex-col items-start justify-center max-w-md gap-6">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-4xl text-gray-600">งานบุญ งานบวช ขึ้นบ้านใหม่ เสริมสิริมงคล</h1>
                            <p className="text-lg"> ให้ MeritMingle ช่วยดูแลวันสำคัญของคุณ</p>
                        </div>

                        <Link to='/product'>
                            <button className="cta-button shadow-md  hover:shadow-lg">นิมนต์ now</button>
                        </Link>
                    </div>
                    <img className="object-cover w-2/5 h-64 rounded-2xl " src="https://f.ptcdn.info/723/061/000/pkltx5avwSxPyzfJVDT-o.jpg" alt="hero-image" />
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
                                // localStorage.setItem('selectedProductName', productItem.name);
                            }}>
                            <div className="bg-gray-300 flex justify-center items-center hover:shadow-xl h-64 rounded-xl overflow-hidden relative">
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
