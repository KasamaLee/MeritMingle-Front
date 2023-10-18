import { useState } from "react"
import CreditCardForm from "../features/payment/creditCardForm";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';



export default function Payment() {

    const [isOpenQr, setIsOpenQr] = useState(false);
    const [isOpenCredit, setIsOpenCredit] = useState(false);


    return (
        <div className="container p-20">

            <h1 className="text-4xl text-center">Payment</h1>


            <div className="container flex justify-center gap-10 p-10">
                <div className="flex flex-col items-center gap-10">
                    <div
                        className="bg-gray-300 p-10 rounded-xl"
                        onClick={() => setIsOpenQr(!isOpenQr)}
                    >
                        QR Code
                    </div>

                    {isOpenQr && (
                        <div>
                            <img src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-10">
                    <div className="bg-gray-300 p-10 rounded-xl"
                        onClick={() => setIsOpenCredit(!isOpenCredit)}>Credit Card</div>

                    {isOpenCredit && (
                        <div>
                            {/* <CreditCardForm /> */}
                        </div>
                    )}
                </div>

            </div>


        </div>
    )
}
