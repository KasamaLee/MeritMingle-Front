import { useState } from 'react'
import axios from '../config/axios'
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'


export default function OrderPage() {

    useEffect(() => {
        fetchOrder();
    }, [])

    const [orders, setOrders] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState();

    // Navigate
    const navigate = useNavigate();

    const fetchOrder = async () => {
        const response = await axios.get('/order/get')
        setOrders(response.data.orders)
    }

    let sum = 0;
    const sumPrice = (totalPrice) => {
        sum += totalPrice;
        return sum;
    }

    let currentStatus;
    const addStatus = (status) => {
        // currentStatus += status;
        if (status) {
            currentStatus = 'ชำระเงินแล้ว'
        } else {
            currentStatus = 'กำลังรอการตรวจสอบ';
        }
    }

    return (
        <div className="container flex flex-col gap-4 p-20 items-center justify-between">

            <h1 className="text-4xl text-center">Payment history</h1>

            {orders.map((order) => {

                // Payment
                sumPrice(order.totalPrice);
                addStatus(order.payment.status);

                // OrderItem[]
                const orderItemData = order.OrderItem.map(item => {
                    // console.log(item)
                    const productNames = item.product.name

                    let productAmount;
                    if (item.product.type === "MONK") {
                        productAmount = item.amount;
                    }
                    const productPrice = item.totalPrice

                    return productAmount ? (
                        <p>{`${productNames} ${productAmount} รูป : ${productPrice}`}</p>
                    ) : (
                        <p>{`${productNames} : ${productPrice}`}</p>
                    )
                });

                return (
                    <div key={uuidv4()}
                        className="p-6 flex justify-between items-end gap-4 border-2 border-orange-400 rounded-xl w-2/3"
                    >
                        <div>
                            {orderItemData}
                            <p className="text-gray-400 mt-3">วันจัดงาน : {order.eventDate.split('T')[0]}</p>
                        </div>

                        <div className="flex flex-col justify-between">
                            <p className="text-lg text-right">รวม : {order.totalPrice} </p>
                            <p className="text-lg text-right">สถานะการชำระเงิน : {currentStatus} </p>
                        </div>

                    </div>
                )
            })}


        </div>
    )
}
