
import { useEffect } from 'react';
import { useState } from 'react'
import axios from '../config/axios'
import { ToggleSwitch, Tooltip } from 'flowbite-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import Map from '../features/product/Map';
import Modal from '../components/Modal';


export default function AdminPage() {

	const [orders, setOrders] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [location, setLocation] = useState({});



	useEffect(() => {
		fetchOrder();
		// console.log(orders)
	}, [])

	const fetchOrder = async () => {
		const response = await axios.get('/order/get')
		setOrders(response.data.orders)
		orderMapping(response.data.orders)
	}

	let sum = 0;
	const sumPrice = (totalPrice) => {
		sum += totalPrice;
		return sum;
	}

	let currentStatus;
	const addStatus = (status) => {
		if (status) {
			currentStatus = 'ชำระเงินแล้ว'
		} else {
			currentStatus = 'กำลังรอการตรวจสอบ';
		}
	}

	const handlePaymentStatus = async (updatedPaymentId, status) => {
		const response = await axios.patch('/order/updatePaymentStatus', { updatedPaymentId, status })
		console.log(response)
	}

	const orderMapping = (orders) => {
		const result = orders.map(order => {
			// "OrderItem": [...]
			const addOn = order.OrderItem.find(item => item.product.type === 'ADD_ON')
			const monk = order.OrderItem.find(item => item.product.type === 'MONK')
			const main = order.OrderItem.find(item => item.product.type === 'MAIN')

			// console.log(order)

			return {
				id: order.id,
				totalPrice: order.totalPrice,
				firstName: order.user.firstName,
				lastName: order.user.lastName,
				email: order.user.email,
				mobile: order.user.mobile,
				paymentId: order.paymentId,
				status: order.payment.status,
				slipURL: order.payment.slipURL,
				addOn: addOn ? 'รับ' : 'ไม่รับ',
				monkAmount: monk.amount,
				main: main.product.name,
				location: {
					lat: order.location.lat,
					lng: order.location.lng
				},
				eventDate: order.eventDate.split('T')[0]
			}
		})
		setTableData(result);
	}

	const toggleStatus = (paymentId) => {

		const newTableData = tableData.map(eachRecord => {
			if (eachRecord.paymentId === paymentId) {
				return {
					...eachRecord,
					status: !eachRecord.status
				}
			} else {
				return eachRecord
			}
		})
		setTableData(newTableData)
	}

	// console.log(tableData)


	return (
		<div className='flex flex-col items-center gap-4 py-20'>
			<h1 className="text-4xl text-center">Order</h1>

			<div className='overflow-x-auto'>
				<table className="min-w-[1400px]">
					<thead>
						<tr >
							<th className='bg-orange-200 py-6 text-orange-800'>payment id</th>
							<th className='bg-orange-200 py-6 text-orange-800'>รายการ</th>
							<th className='bg-orange-200 py-6 text-orange-800'>ชื่อ</th>
							<th className='bg-orange-200 py-6 text-orange-800'>นามสกุล</th>
							<th className='bg-orange-200 py-6 text-orange-800'>e-mail</th>
							<th className='bg-orange-200 py-6 text-orange-800'>โทรศัพท์</th>
							<th className='bg-orange-200 py-6 text-orange-800'>สังฆทาน</th>
							<th className='bg-orange-200 py-6 text-orange-800'>นินมต์ (รูป)</th>
							<th className='bg-orange-200 py-6 text-orange-800'>สถานที่</th>
							<th className='bg-orange-200 py-6 text-orange-800'>กำหนดการ</th>
							<th className='bg-orange-200 py-6 text-orange-800'>ราคา</th>
							<th className='bg-orange-200 py-6 text-orange-800'>slip</th>
							<th className='bg-orange-200 py-6 text-orange-800'>status</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((eachColumn, index) => {
							return (
								<tr key={index} className='text-center text-gray-600'>
									<td className="border-b border-gray-300">{eachColumn.paymentId}</td>
									<td className="border-b border-gray-300">{eachColumn.main}</td>
									<td className="border-b border-gray-300">{eachColumn.firstName}</td>
									<td className="border-b border-gray-300">{eachColumn.lastName}</td>
									<td className="border-b border-gray-300">{eachColumn.email}</td>
									<td className="border-b border-gray-300">{eachColumn.mobile}</td>
									<td className="border-b border-gray-300">{eachColumn.addOn}</td>
									<td className="border-b border-gray-300">{eachColumn.monkAmount}</td>
									{/* <td className="border-2 border-gray-400">{eachColumn.location}</td> */}
									<td className="border-b border-gray-300">
										<button
											className="bg-orange-400 text-white text-sm rounded-full px-3 py-2"
											onClick={() => {
												setIsOpenModal(true)
												setLocation(eachColumn.location)
											}}
										>
											ดูแผนที่
										</button>
									</td>


									<td className="border-b border-gray-300">{eachColumn.eventDate}</td>
									<td className="border-b border-gray-300">{eachColumn.totalPrice}</td>
									<td className="border-b border-gray-300 py-4">
										<a href={eachColumn.slipURL} target='_blank' className='relative'>
											<FontAwesomeIcon icon={faMagnifyingGlassPlus} color='#FDBA74' size='xl' className='absolute top-1/3 -left-2' />
											<img src={eachColumn.slipURL} className='mx-auto border w-24 h-24 object-cover' />
										</a>
									</td>

									<td className="border-b border-gray-300 ">
										<div className='flex flex-col items-center gap-1'>
											{eachColumn.status ? (
												<div className='bg-green-200 rounded-md px-2 text-green-800'>จ่ายเงินแล้ว</div>
											) : (
												<div className='bg-red-200 rounded-md px-2 text-red-800'>รอการตรวจสอบ</div>
											)}

											<div className="flex max-w-md flex-col gap-4" id="toggle">
												<ToggleSwitch checked={eachColumn.status} onChange={() => {
													if (!eachColumn.status) {
														toggleStatus(eachColumn.paymentId)
														handlePaymentStatus(eachColumn.paymentId, true)
													} else {
														handlePaymentStatus(eachColumn.paymentId, false)
														toggleStatus(eachColumn.paymentId)
													}
												}}
												/>
											</div>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>

				<Modal
					open={isOpenModal}
					onCloseModal={() => {
						setIsOpenModal(!isOpenModal)
					}}>
					<div className='w-[900px]'>
						<Map location={location} viewMode={true} />
					</div>
				</Modal>

			</div>
		</div>
	)
}


