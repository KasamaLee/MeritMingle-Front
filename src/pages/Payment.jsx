import { useState } from "react"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardForm from "../features/payment/creditCardForm";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faQrcode, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/use-product";
import { useEffect } from "react";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-auth";


export default function Payment() {

    const stripePromise = loadStripe('pk_test_51O2AMAI47xWQxVGV0k99tPraKxItkbJFMTM62NF3usuyiwNFePFcAYZnb6MZjguJk8FYxZzzmqyY4pW7FBXAtl6K00fCGDlTNi');

    const [isOpenQr, setIsOpenQr] = useState(false);
    const [isOpenCredit, setIsOpenCredit] = useState(false);
    const [file, setFile] = useState(null);

    const { id } = useParams();
    const { carts, setCarts } = useProduct();
    const { initialLoading, setInitialLoading } = useAuth();
    // console.log(carts)

    useEffect(() => {
        fetchCartToCreateOrder(id);
    }, [])

    // Navigate
    const navigate = useNavigate();

    const fetchCartToCreateOrder = () => {
        let selectCart;
        if (id === 'all') {
            selectCart = carts;
        } else {
            selectCart = carts.filter((cart) => cart.id === +id)
        }
        setCarts(selectCart)
    }

    const handlePayment = async () => {
        try {
            setInitialLoading(true)
            const reqBody = new FormData()

            reqBody.append('type', 'QR_CODE')
            reqBody.append('slipImage', file)
            reqBody.append('carts', JSON.stringify(carts))

            // console.log(reqBody)
            const response = await axios.post('/order/add', reqBody)
            console.log(response.data.order)
            navigate('/order')
        } catch (err) {
            console.log(err)
        } finally {
            // if (initialLoading)  <Loading />
            setInitialLoading(false);
        }

        // delete cart ที่ตอนนี้สร้างเป็น order แล้ว
    }


    // if (file) console.log(URL.createObjectURL(file)); // blob : <img file path>
    const inputEl = useRef(null);


    return (
        <Elements stripe={stripePromise}>
            <div className="container p-20">

                <h1 className="text-4xl text-center">Payment</h1>

                <div className="container flex justify-center gap-10 p-10">
                    <div className="flex flex-col items-center gap-10 w-1/2">
                        <div
                            className="bg-gray-300 p-10 rounded-xl"
                            onClick={() => setIsOpenQr(!isOpenQr)}
                        >
                            <FontAwesomeIcon icon={faQrcode} size='2xl' />
                            <span className="ml-2">
                                QR Code
                            </span>
                        </div>

                        {isOpenQr && (
                            <div className="flex flex-col items-center gap-4">
                                {file ? (<img src={URL.createObjectURL(file)} alt="" />) : (<img src="https://www.researchgate.net/publication/330015992/figure/fig3/AS:709929996394496@1546271909478/Prototype-Demo-QR-code.ppm" />)}

                                <button
                                    className="bg-orange-500 text-white rounded-3xl px-4 py-1 cursor-pointer"
                                    onClick={() => inputEl.current.click()}
                                >
                                    <FontAwesomeIcon icon={faFileUpload} />
                                    <span className="ml-1">Upload Slip</span>
                                </button>

                                <input
                                    type="file"
                                    className="hidden"
                                    ref={inputEl}   // {current: <input/>}
                                    onChange={e => {
                                        // console.log(e.target.files[0]) //path ของ file ที่ user เลือก
                                        if (e.target.files[0]) {
                                            setFile(e.target.files[0])
                                        }
                                    }}
                                />
                                <div className="flex justify-center">
                                    {/* children คือ {src} ทั้งก้อน  */}
                                    {(src, onClick) => (
                                        <div onClick={onClick}>
                                            <Avatar className='h-40' src={src} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-10 w-1/2">
                        <div className="bg-gray-300 p-10 rounded-xl"
                            onClick={() => setIsOpenCredit(!isOpenCredit)}>
                            <FontAwesomeIcon icon={faCreditCard} size='xl' />
                            <span className="ml-2">
                                Credit Card
                            </span>
                        </div>

                        {isOpenCredit && (
                            <div>
                                <CreditCardForm />
                            </div>
                        )}
                    </div>

                </div>
            </div>


            <div className=' bg-orange-400 w-full fixed bottom-0 p-4 z-10'>
                <div className="container flex justify-center items-center">
                    <p className='text-lg'></p>

                    {/* ---- BUTTON : ADD TO CART ---- */}
                    <button
                        className='bg-orange-200 rounded-lg p-2'
                        onClick={() => {
                            handlePayment()
                        }}
                    >
                        ยืนยันการชำระเงิน
                    </button>
                </div>
            </div>
        </Elements>
    )
}
