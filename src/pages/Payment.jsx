import { useState } from "react"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardForm from "../features/payment/creditCardForm";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faQrcode, faCreditCard } from '@fortawesome/free-solid-svg-icons';




export default function Payment() {

    const stripePromise = loadStripe('pk_test_51O2AMAI47xWQxVGV0k99tPraKxItkbJFMTM62NF3usuyiwNFePFcAYZnb6MZjguJk8FYxZzzmqyY4pW7FBXAtl6K00fCGDlTNi');

    const [isOpenQr, setIsOpenQr] = useState(false);
    const [isOpenCredit, setIsOpenCredit] = useState(false);


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
                                <img src="https://www.researchgate.net/publication/330015992/figure/fig3/AS:709929996394496@1546271909478/Prototype-Demo-QR-code.ppm" />
                                <button className="bg-orange-500 text-white rounded-3xl px-4 py-1">
                                    <FontAwesomeIcon icon={faFileUpload} />
                                    <span className="ml-1">Upload Slip</span>
                                </button>
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
