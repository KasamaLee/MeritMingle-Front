import React from 'react'
import { useState } from 'react'
import ProductItem from './ProductItem';
import AddOn from './AddOn';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Map from './Map';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useProduct } from '../../hooks/use-product';
import { useAuth } from '../../hooks/use-auth';
import { useEffect } from 'react';


export default function Product() {

	// Navigate
	const navigate = useNavigate();

	useEffect(() => {
		const savedProductName = localStorage.getItem('selectedProductName');
		if (savedProductName) {
			setSelectedProduct(savedProductName);
		}
	}, []);



	const [addOn, setAddOn] = useState(false);
	const [addOnPrice, setAddOnPrice] = useState(0)

	const [monkAmount, setMonkAmount] = useState();

	// date
	const [eventDate, setEventDate] = useState();

	// map
	const [searchLocation, setSearchLocation] = useState(null);
	const [mapClicked, setMapClicked] = useState(null);

	// totalPrice
	const [totalPrice, setTotalPrice] = useState(0);


	const {
		mainProducts,
		selectedProduct, setSelectedProduct,
		mainProductPrice, setMainProductPrice,
		monkExpense,
		addOnProducts, setAddOnProducts,
		cartItem, setCartItem, createToCart
	} = useProduct();


	const calPrice = () => {
		let sumPrice = (mainProductPrice + (monkExpense.price * monkAmount) + (addOnPrice * monkAmount));
		return sumPrice;
	}

	const { authUser, isOpen, setIsOpen } = useAuth();

	const addToCart = (item, amount = 1) => {

		let newCartItem = [...cartItem];

		switch (item.type) {
			case 'MAIN':
				newCartItem = newCartItem.filter(el => el.type !== 'MAIN');
				break;
			case 'MONK':
				newCartItem = newCartItem.filter(el => el.type !== 'MONK');

				let foundAddOn = newCartItem.find(el => el.type === 'ADD_ON');
				if (foundAddOn) {
					const newAddOn = {
						id: foundAddOn.id,
						totalPrice: (foundAddOn.totalPrice / foundAddOn.amount) * amount,
						amount
					}

					foundAddOn = newAddOn
				}
				break;
			case 'ADD_ON':
				newCartItem = newCartItem.filter(el => el.ProductId !== item.id)
				break;
		}

		newCartItem.push({
			productId: item.id,
			amount: +amount,
			totalPrice: item.price * amount,
			type: item.type
		})
		setCartItem(newCartItem);
	}


	const handleAddToCart = async () => {

		if (!authUser) {
			setIsOpen(true);

		}
		const reqBody = {
			totalPrice: calPrice(),
			lat: mapClicked.lat,
			lng: mapClicked.lng,
			eventDate: eventDate,
			cartItem: cartItem,
		}

		await createToCart(reqBody);
		navigate('/cart')

	}

	// console.log(cartItem)
	console.log(selectedProduct)

	return (
		<>

			<div className='container pt-20 pb-60 flex flex-col gap-8'>

				<div>
					<h1 className='text-4xl text-center'> Products </h1>
				</div>

				<div className='flex gap-16 items-stretch justify-stretch'>

					<div>
						<img className="object-cover w-full rounded-2xl " src="https://f.ptcdn.info/723/061/000/pkltx5avwSxPyzfJVDT-o.jpg" alt="hero-image" />
					</div>

					{/* ---- RIGHT SECTION ---- */}
					<div className="flex flex-col gap-10 w-full" >

						{/* ---- SELECT PRODUCT ---- */}
						<div className="flex flex-col gap-4 w-full">
							<h4>select product</h4>
							{mainProducts.map((productItem, index) => {
								// console.log(productItem)
								return (
									<ProductItem
										key={index}
										productItem={productItem}
										addToCart={addToCart}
									/>
								)
							})}
						</div>
						{/* {console.log(cartItem)} */}


						{/* ---- จำนวนที่ต้องการนิมนต์ ---- */}
						<div>
							<h4>จำนวนที่ต้องการนิมนต์</h4>
							<input
								className='rounded py-2 px-6 outline-none ring ring-gray-300 focus:ring focus:ring-orange-300 hover:ring hover:ring-orange-300'
								placeholder='1-10'
								value={monkAmount}
								onChange={(e) => {
									setMonkAmount(+e.target.value)
									addToCart(monkExpense, +e.target.value)
								}}
							/>
							{/* {console.log(monkExpense)} */}
						</div>


						{/* ---- สังฆทาน ---- */}
						<div >
							{addOnProducts.map((addOnItem, index) => {
								return (
									<div key={uuidv4()}>
										<h4>{addOnItem.name}</h4>
										<div className="flex gap-4 w-full">
											<AddOn
												addOn={!addOn}
												onClick={() => {
													setAddOn(false)
													setAddOnPrice(0)
													const filtered = cartItem.filter((item) => item.ProductId !== addOnItem.id)
													setCartItem(filtered)
												}}
												name='ไม่รับ'
											/>

											<AddOn
												addOn={addOn}
												onClick={() => {
													setAddOn(true)
													setAddOnPrice(addOnItem.price)
													addToCart(addOnItem, monkAmount)
												}}
												name='รับ'
											/>

											{/* {console.log(addOnItem)} */}
											{/* {console.log(monkAmount)} */}
										</div>
									</div>

								)
							})}
						</div>

						{/* ---- DATE PICKER ---- */}
						<div>
							<h4>กำหนดวัน</h4>
							<DatePicker
								// onChange={(e) => setDate(new Date(e.$d).toLocaleString())}
								onChange={(e) => setEventDate(new Date(e.$d).toISOString())}
							/>

						</div>

						{/* ---- GOOGLE MAP ---- */}
						<div>
							<h4>สถานที่</h4>
							<Map
								searchLocation={searchLocation}
								setSearchLocation={setSearchLocation}
								mapClicked={mapClicked}
								setMapClicked={setMapClicked}
							/>
						</div>

					</div>
				</div>

			</div>


			<div className='flex justify-between items-center bg-orange-400 w-full fixed bottom-0 p-4 z-10'>
				<p className='text-lg'>
					{`สินค้า: ${selectedProduct} , ราคา: ${mainProductPrice}`}<br />
					{`นิมนต์: ${monkAmount} รูป , ราคารูปละ ${monkExpense.price}`}<br />
					{`ค่านินมต์: ${monkExpense.price * monkAmount}`}<br />
					{`${addOnPrice}`} <br />
					{`date: ${eventDate}`}  <br />

					{/* {console.log(clicked)} */}
					{`total price : ${calPrice()}`}

				</p>

				{/* ---- BUTTON : ADD TO CART ---- */}
				<button
					className='bg-orange-200 rounded-lg p-2'
					onClick={handleAddToCart}
				>
					add to cart
				</button>
			</div>

		</>
	)
}


