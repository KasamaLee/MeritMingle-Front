import { useEffect } from "react";
import axios from '../config/axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { useProduct } from "../hooks/use-product";



export default function CartPage() {

	const { carts, setCarts, deleteCart } = useProduct();


	// Navigate
	const navigate = useNavigate();


	let sum = 0;
	const sumPrice = (totalPrice) => {
		sum += totalPrice;
		return sum;
	}


	return (
		<>
			<div className="container flex flex-col gap-4 p-20 items-center justify-between">
				<h1 className="text-4xl text-center">Cart</h1>

				{carts.map((cart) => {
					// ราคารวมของแต่ละ cart
					sumPrice(cart.totalPrice);

					cart.CartItem.sort((a, b) => {
						if (a.product.type === 'MAIN') return -1
						if (a.product.type === 'MONK' && b.product.type !== 'MAIN') {
							return -1
						} else {
							return 1
						}
					})

					// CartItem: [{..}, {..}, {..}]
					const cartData = cart.CartItem.map(eachCartItem => {
						const productNames = eachCartItem.product.name

						let productAmount;
						if (eachCartItem.product.type === "MONK") {
							productAmount = eachCartItem.amount;
						}
						const productPrice = eachCartItem.totalPrice

						return productAmount ? (
							<p key={uuidv4()}>{`${productNames} ${productAmount} รูป : ${productPrice}`}</p>
						) : (
							<p key={uuidv4()}>{`${productNames} : ${productPrice}`}</p>
						)
					});

					return (
						<div
							key={uuidv4()}
							className="p-6 flex justify-between items-end gap-4 border-2 border-orange-400 rounded-xl w-2/3"
						>
							{/* {console.log(cart)} */}
							<div>
								{cartData}
								<p className="text-gray-400 mt-3">วันจัดงาน : {cart.eventDate.split('T')[0]}</p>
							</div>

							<div className="flex flex-col justify-between">
								<p className="text-lg text-right">รวม : {cart.totalPrice} </p>
								<div>
									<button
										className="bg-gray-400 text-white rounded-3xl py-1 px-4 mr-2"
										onClick={() => deleteCart(cart.id)}
									>
										ลบ
									</button>

									<button
										className="bg-gray-400 text-white rounded-3xl py-1 px-4 mr-2"
										onClick={() => {
											// selectedCartById(cart.id)
											// console.log(cartId)
											navigate(`update/${cart.id}`)
										}}
									>
										แก้ไข
									</button>

									<button
										className="bg-orange-400 text-white rounded-3xl py-1 px-4"
										onClick={() => {
											// selectedCartById(cart.id)
											navigate(`/payment/${cart.id}`)
										}}>
										ชำระเงิน
									</button>
								</div>
							</div>

						</div>
					)
				})}
			</div >

			<div className=' bg-orange-400 w-full fixed bottom-0 p-4 z-10'>
				<div className="container flex justify-between items-center">
					<p className='text-lg'>ยอดรวมทั้งหมด : {sum}</p>

					{/* ---- BUTTON : ADD TO CART ---- */}
					<button
						className='bg-orange-200 rounded-lg p-2'
						onClick={() => {
							navigate(`/payment/all`)
						}}
					>
						ชำระทุกรายการ
					</button>
				</div>
			</div>

		</>
	)
}
