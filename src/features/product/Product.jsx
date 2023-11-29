import React from 'react'
import { useState } from 'react'
import ProductItem from './ProductItem';
import AddOn from './AddOn';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom'

import Map from './Map';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useProduct } from '../../hooks/use-product';
import { useAuth } from '../../hooks/use-auth';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Joi from 'joi';
import InputErrorMessage from '../auth/RegisterErrorMessage';


const productSchema = Joi.object({
	selectedProduct: Joi.required().not(null),
	monkAmount: Joi.number().integer().min(1).max(20).required(),
	eventDate: Joi.date().required(),
	selectLocation: Joi.object().required(),
});


export default function Product() {

	// Navigate
	const navigate = useNavigate();

	const { id } = useParams();

	const { authUser, isOpen, setIsOpen } = useAuth();

	const {
		mainProducts,
		selectedProduct, setSelectedProduct,
		mainProductPrice, setMainProductPrice,
		mainProductImage, setMainProductImage,
		monkExpense,
		addOnProducts, setAddOnProducts,
		mainProductDesc, setMainProductDesc,
		createToCart
	} = useProduct();

	const [monkAmount, setMonkAmount] = useState('');

	//  add on
	const [addOn, setAddOn] = useState(false);

	//  ราคาของ addOn * monkAmount
	const [addOnPrice, setAddOnPrice] = useState(0)

	// cartItem
	const [cartItem, setCartItem] = useState([])

	// date
	const [eventDate, setEventDate] = useState('');

	// map
	const [searchLocation, setSearchLocation] = useState(null);
	const [mapClicked, setMapClicked] = useState(null);

	// totalPrice
	const [totalPrice, setTotalPrice] = useState(0);

	const [error, setError] = useState({})

	useEffect(() => {
		if (id) {
			fetchCartById(id);
		}
		if (selectedProduct) {
			const defaultProduct = mainProducts.find(item => item.name === selectedProduct)
			addToCart(defaultProduct)
		}
	}, []);



	const fetchCartById = async (id) => {
		const response = await axios.get(`/cart/get/${id}`)
		const selectedCart = response.data.cart;
		console.log(selectedCart)

		setSearchLocation({ lat: selectedCart.location.lat, lng: selectedCart.location.lng })
		// { lat: e.latLng.lat(), lng: e.latLng.lng() };

		const resultArr = []
		selectedCart.CartItem.map((item) => {

			switch (item.product.type) {
				case "MAIN":
					setSelectedProduct(item.product.name)
					setMainProductPrice(item.product.price)
					break;
				case "MONK":
					setMonkAmount(item.amount)
					break;
				case "ADD_ON":
					setAddOn(true)
					setAddOnPrice(item.product.price)
					break
			}
			resultArr.push({
				productId: item.product.id,
				amount: +item.amount,
				totalPrice: item.product.price * item.amount,
				type: item.product.type
			})
		})

		setCartItem(resultArr)
		setEventDate(selectedCart.eventDate)
	}

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
		try {
			if (!authUser) {
				setIsOpen(true);
			}

			const validationResult = productSchema.validate({
				selectedProduct: selectedProduct,
				monkAmount: monkAmount,
				eventDate: eventDate,
				selectLocation: searchLocation || mapClicked,
			}, { abortEarly: false });



			// ถ้า validationResult.error มีค่าให้ setError()
			if (validationResult.error) {
				const validationError = validationResult.error.details.reduce((acc, elem) => {
					const { message, path } = elem;
					acc[path[0]] = message;
					return acc;
				}, {});
				console.log(validationError)
				return setError(validationError);
			}
			setError({});

			const reqBody = {
				totalPrice: calPrice(),
				lat: mapClicked?.lat || searchLocation?.lat,
				lng: mapClicked?.lng || searchLocation?.lng,
				eventDate: eventDate,
				cartItem: cartItem,
			}

			if (id) {
				const response = await axios.patch(`/cart/update/${id}`, reqBody);
			} else {
				await createToCart(reqBody);
			}
			setCartItem([])
			navigate('/cart')

		} catch (err) {
			console.log(err)
		}

	}

	const calPrice = () => {
		return (mainProductPrice + (monkExpense.price * monkAmount) + (addOnPrice * monkAmount));
	}

	const RenderDescription = ( text ) => {
		// console.log(text)
		const lines = text.split('\n');
		return (
			<div>
				{lines.map((line, index) => (
					<div key={index}>{line}</div>
				))}
			</div>
		);
	}

	return (
		<>
			<div className='container pt-20 pb-40 flex flex-col gap-8'>

				<div>
					<h1 className='text-4xl text-center'> Products </h1>
				</div>

				<div className='flex gap-16 w-full justify-stretch'>

					<div className='w-1/2'>
						<img className="object-cover rounded-xl h-64 " src={mainProductImage} alt="hero-image" />
						<div className='text-gray-500 py-4 text-sm'>
							{RenderDescription(mainProductDesc)}
						</div>
					</div>

					{/* ---- RIGHT SECTION ---- */}
					<div className="flex flex-col gap-10 w-1/2" >

						{/* ---- SELECT PRODUCT ---- */}
						<div className="flex flex-col gap-4 w-full">
							<h4>งานที่ท่านต้องการจัด</h4>
							{mainProducts.map((productItem, index) => {
								// console.log(productItem)
								return (
									<ProductItem
										value={selectedProduct}
										key={index}
										productItem={productItem}
										addToCart={addToCart}
										error={error}
									/>
								)
							})}
							{error.selectedProduct && <InputErrorMessage message='กรุณาเลือกประเภทงานที่ต้องการ' />}
						</div>
						{/* {console.log(cartItem)} */}


						{/* ---- จำนวนที่ต้องการนิมนต์ ---- */}
						<div className="flex flex-col gap-2 w-full">
							<h4>จำนวนพระที่ต้องการนิมนต์</h4>
							<input
								className='rounded py-2 px-6 outline-none ring ring-gray-300 focus:ring focus:ring-orange-300 hover:ring hover:ring-orange-300'
								placeholder='1-20'
								value={monkAmount}
								maxLength="2"
								min="1"
								max="20"
								onChange={(e) => {
									setMonkAmount(+e.target.value)
									addToCart(monkExpense, +e.target.value)
								}}
							/>
							{error.monkAmount && <InputErrorMessage message={'นิมนต์ได้ 1-20 รูป'} />}
						</div>


						{/* ---- สังฆทาน ---- */}
						<div >
							{addOnProducts.map((addOnItem, index) => {
								return (
									<div key={uuidv4()} className="flex flex-col gap-2 w-full">
										<h4>{addOnItem.name}</h4>
										<div className="flex gap-4 w-full">
											<AddOn
												addOn={!addOn}
												onClick={() => {
													setAddOn(false)
													setAddOnPrice(0)
													const filtered = cartItem.filter((item) => item.productId !== addOnItem.id)
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
						<div className="flex flex-col w-fit gap-2">
							<h4>กำหนดวันจัดงาน</h4>
							<DatePicker
								minDate={dayjs()}
								maxDate={dayjs().add(90, 'day')}
								value={dayjs(eventDate)}
								// onChange={(e) => setDate(new Date(e.$d).toLocaleString())}
								onChange={(e) => {
									setEventDate(e.$d)
								}}
							/>
							{error.eventDate && <InputErrorMessage message='กรุณาเลือกวันที่ต้องการจัดงาน' />}
						</div>

						{/* ---- GOOGLE MAP ---- */}
						<div>
							<h4>สถานที่จัดงาน</h4>
							<Map
								searchLocation={searchLocation}
								setSearchLocation={setSearchLocation}
								mapClicked={mapClicked}
								setMapClicked={setMapClicked}
							/>
							{error.selectLocation && <InputErrorMessage message='กรุณาเลือกสถานที่จัดงาน' />}
						</div>

					</div>
				</div>

			</div>


			<div className='bg-orange-400 w-full fixed bottom-0 p-4 z-10'>
				<div className='container flex justify-between items-center'>

					<p className='text-lg'>

						{/* {`สินค้า: ${selectedProduct} , ราคา: ${mainProductPrice}`}<br />
						{`นิมนต์: ${monkAmount} รูป , ราคารูปละ ${monkExpense.price}`}<br />
						{`ค่านินมต์: ${monkExpense.price * monkAmount}`}<br />
						{`${addOnPrice}`} <br />
						{`date: ${eventDate}`}  <br /> */}

						{calPrice() ? (`total price : ${calPrice()}`) : (`total price : 0`)}
					</p>

					{/* ---- BUTTON : ADD TO CART ---- */}
					<button
						className='bg-orange-200 rounded-lg p-2'
						onClick={handleAddToCart}
					>
						{id ? ('update cart') : ('add to cart')}

					</button>
				</div>
			</div>

		</>
	)
}


