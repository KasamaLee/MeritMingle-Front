import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../config/axios';
import { useProduct } from '../hooks/use-product';
import Modal from '../components/Modal';
import { useRef } from 'react';
import { useAuth } from '../hooks/use-auth';

export default function EditProductPage() {

	const { mainProducts, setMainProducts, fetchProduct, monkExpense, setMonkExpense, addOnProducts, setAddOnProducts } = useProduct();
	const { initialLoading, setInitialLoading } = useAuth();

	const [isOpenModal, setIsOpenModal] = useState(false)
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productDesc, setProductDesc] = useState('');
	const [fileImg, setFileImg] = useState(null);
	const [defaultImg, setDefaultImage] = useState(null);
	const [selectedProductId, setSelectedProductId] = useState(null);

	const [isUpdating, setIsUpdating] = useState(true);

	const [monkPrice, setMonkPrice] = useState(null);
	const [addOnPrice, setAddOnPrice] = useState(null)


	// console.log(addOnProducts)

	useEffect(() => {
		fetchProduct();
		setMonkPrice(monkExpense.price)
		setAddOnPrice(addOnProducts[0].price)
		// console.log(addOnProducts)
	}, [])


	const inputEl = useRef(null);

	const defaultProductData = (product) => {
		setProductName(product.name)
		setProductPrice(product.price)
		setProductDesc(product.desc || '')
		setDefaultImage(product.productImage)
		setSelectedProductId(product.id)
	}

	const deleteDefaultValue = () => {
		setProductName('')
		setProductPrice('')
		setProductDesc('')
		setDefaultImage(null)
		setFileImg(null)
	}

	const handleAddProduct = async () => {
		try {
			setInitialLoading(true)
			const newProduct = new FormData();
			newProduct.append('name', productName);
			newProduct.append('price', String(productPrice));
			newProduct.append('desc', productDesc || '');
			newProduct.append('type', 'MAIN');
			newProduct.append('productImage', fileImg);

			const response = await axios.post('/product/add', newProduct)
			// console.log(response)
			setIsOpenModal(false);
			fetchProduct()

		} catch (err) {
			console.log(err)
		} finally {
			setInitialLoading(false)
		}
	}


	const handleUpdateProduct = async (productId) => {
		try {
			setInitialLoading(true)
			const updatedProduct = new FormData();
			updatedProduct.append('name', productName);
			updatedProduct.append('price', String(productPrice));
			updatedProduct.append('desc', productDesc || '');
			// updatedProduct.append('type', 'MAIN');
			updatedProduct.append('productImage', fileImg);

			const response = await axios.patch(`/product/update/${productId}`, updatedProduct)
			// console.log(response)

			setIsOpenModal(false);
			fetchProduct()

		} catch (err) {
			console.log(err)
		} finally {
			setInitialLoading(false)
		}
	}

	const handleUpdateMonkExpense = async (monkId) => {
		try {
			const updatedMonkExpense = {
				price: monkPrice
			}

			const response = await axios.patch(`/product/update/${monkId}`, updatedMonkExpense)
			console.log(response)
			fetchProduct();

		} catch (err) {
			console.log(err)
		}
	}

	const handleUpdateAddOnPrice = async (addOnId) => {
		try {
			const updatedAddOnPrice = {
				price: addOnPrice
			}

			const response = await axios.patch(`/product/update/${addOnId}`, updatedAddOnPrice)
			console.log(response)
			fetchProduct();
		} catch (err) {
			console.log(err)
		}
	}

	const handleDeleteProduct = async (productId) => {
		try {
			const response = await axios.delete(`/product/delete/${productId}`)
			fetchProduct();
		} catch (err) {
			console.log("Error deleting product:", err)
		}
	}

	return (
		<div className='container py-20'>
			<div className='container py-10'>
				<h4>ค่าบริการนิมนต์</h4>
				<div className='relative flex gap-4 w-fit'>
					<input
						className='rounded py-2 px-6 w-80 outline-none ring ring-gray-300 focus:ring focus:ring-orange-300 hover:ring hover:ring-orange-300'
						maxLength="10"
						type="number"
						onChange={(e) => setMonkPrice(e.target.value)}
						value={monkPrice}
					/>
					<button
						className="absolute right-2 top-1 bg-orange-400 text-white rounded-3xl px-4 py-1"
						onClick={() => handleUpdateMonkExpense(monkExpense.id)}
					>
						ยืนยันการแก้ไข
					</button>
				</div>
			</div>

			<div className='container py-10'>
				<h4>ค่าสังฆทาน</h4>
				<div className='relative flex gap-4 w-fit'>
					<input
						className='rounded py-2 px-6 w-80 outline-none ring ring-gray-300 focus:ring focus:ring-orange-300 hover:ring hover:ring-orange-300'
						maxLength="10"
						type="number"
						onChange={(e) => setAddOnPrice(e.target.value)}
						value={addOnPrice}
					/>
					<button
						className="absolute right-2 top-1 bg-orange-400 text-white rounded-3xl px-4 py-1"
						onClick={() => handleUpdateAddOnPrice(addOnProducts[0].id)}
					>
						ยืนยันการแก้ไข
					</button>
				</div>
			</div>

			<div className='container py-10'>
				<h4>เพิ่มสินค้าใหม่</h4>

				<div
					className='flex justify-center bg-orange-400 text-white rounded-xl p-4 cursor-pointer relative'
					onClick={() => {
						setIsOpenModal(true)
						setIsUpdating(false)
					}}
				>
					<FontAwesomeIcon icon={faCircleXmark} size='2x' style={{ transform: 'rotate(45deg)' }} />
				</div>


			</div>

			<div className='container py-10 flex flex-col gap-4'>
				<h4>สินค้าปัจจุบัน</h4>
				{mainProducts.map((product, index) => {
					return (
						<div key={index} className="p-6 flex justify-between items-end gap-4 border-2 border-orange-400 rounded-xl w-2/3">
							<p>{product.name}</p>
							<p>{product.price}</p>
							<div>
								<button
									className="bg-gray-400 text-white rounded-3xl py-1 px-4 mr-2"
									onClick={() => handleDeleteProduct(product.id)}
								>
									ลบ
								</button>

								{/* UPDATE BUTTON */}
								<button
									className="bg-gray-400 text-white rounded-3xl py-1 px-4 mr-2"
									onClick={() => {
										setIsOpenModal(true)
										defaultProductData(product)
										setIsUpdating(true)
									}}
								>
									แก้ไข
								</button>

							</div>
						</div>
					)
				})}
			</div>

			<Modal open={isOpenModal} onCloseModal={() => {
				setIsOpenModal(!isOpenModal)
				deleteDefaultValue()
			}}>

				<div className='flex flex-col gap-4'>

					<div>
						<p>ประเภทงาน</p>
						<input
							className='mr-4 rounded py-2 px-6 w-80 outline-none ring ring-gray-300 focus:ring focus:ring-orange-300 hover:ring hover:ring-orange-300'
							placeholder='กรุณากรอกข้อมูล'
							maxLength="30"
							onChange={(e) => setProductName(e.target.value)}
							value={productName}
						/>
						<input
							className='rounded py-2 px-6 w-80 outline-none ring ring-gray-300 focus:ring focus:ring-orange-300 hover:ring hover:ring-orange-300'
							placeholder='ราคา'
							onChange={(e) => setProductPrice(e.target.value)}
							type='number'
							maxLength="10"
							value={productPrice}
						/>
					</div>

					<p>คำอธิบาย</p>
					<textarea
						className='rounded py-2 px-6 outline-none ring ring-gray-300 focus:ring focus:ring-orange-300 hover:ring hover:ring-orange-300'
						placeholder='...'
						maxLength="500"
						rows="4"
						cols="50"
						value={productDesc}
						onChange={(e) => setProductDesc(e.target.value)}
					/>
					<div className="flex flex-col gap-4">

						{
							fileImg ? (<img src={URL.createObjectURL(fileImg)} className='max-w-lg' alt="" />)
								: (defaultImg ? <img src={defaultImg} className='max-w-lg' alt="" />
									: <div className='max-w-lg h-72 bg-gray-400' />)
						}

						<button
							className="bg-orange-500 text-white rounded-3xl px-4 py-1 cursor-pointer w-fit"
							onClick={(e) => inputEl.current.click()}
						>
							<FontAwesomeIcon icon={faFileUpload} />
							<span className="ml-1">Upload Image</span>
						</button>

						<input
							type="file"
							className="hidden"
							ref={inputEl}   // {current: <input/>}
							onChange={e => {
								// console.log(e.target.files[0]) //path ของ file ที่ user เลือก
								if (e.target.files[0]) {
									setFileImg(e.target.files[0])
								}
							}}
						/>

					</div>

					{isUpdating ? (
						<button
							className="bg-orange-500 text-white rounded-3xl px-4 py-1 cursor-pointer w-fit"
							onClick={() => handleUpdateProduct(selectedProductId)}
						>
							<span className="ml-1 text-lg">Update product</span>
						</button>
					) : (
						<button
							className="bg-orange-500 text-white rounded-3xl px-4 py-1 cursor-pointer w-fit"
							onClick={() => handleAddProduct()}
						>
							<span className="ml-1 text-lg">Add new product</span>
						</button>
					)}
				</div>
			</Modal >



		</div >
	)
}
