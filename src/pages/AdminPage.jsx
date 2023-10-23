
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
		console.log(orders)
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
		<div className='container flex flex-col gap-4 py-20'>
			<h1 className="text-4xl text-center">Order</h1>

			<div className='overflow-x-auto'>
				<table className="w-[100vw]">
					<thead>
						<tr >
							<th className='bg-orange-200  border-2 border-gray-400'>payment id</th>
							<th className='bg-orange-200  border-2 border-gray-400'>รายการ</th>
							<th className='bg-orange-200  border-2 border-gray-400'>ชื่อ</th>
							<th className='bg-orange-200  border-2 border-gray-400'>นามสกุล</th>
							<th className='bg-orange-200  border-2 border-gray-400'>อีเมลล์</th>
							<th className='bg-orange-200  border-2 border-gray-400'>โทรศัพท์</th>
							<th className='bg-orange-200  border-2 border-gray-400'>สังฆทาน</th>
							<th className='bg-orange-200  border-2 border-gray-400'>จำนวนนินมต์</th>
							<th className='bg-orange-200  border-2 border-gray-400'>สถานที่จัดงาน</th>
							<th className='bg-orange-200  border-2 border-gray-400'>วันจัดงาน</th>

							<th className='bg-orange-200  border-2 border-gray-400'>ราคา</th>
							<th className='bg-orange-200  border-2 border-gray-400'>สลิป</th>
							<th className='bg-orange-200  border-2 border-gray-400'>สถานะการชำระเงิน</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((eachColumn, index) => {
							return (
								<tr key={index}>
									<td className="border-2 border-gray-400">{eachColumn.paymentId}</td>
									<td className="border-2 border-gray-400">{eachColumn.main}</td>
									<td className="border-2 border-gray-400">{eachColumn.firstName}</td>
									<td className="border-2 border-gray-400">{eachColumn.lastName}</td>
									<td className="border-2 border-gray-400">{eachColumn.email}</td>
									<td className="border-2 border-gray-400">{eachColumn.mobile}</td>
									<td className="border-2 border-gray-400">{eachColumn.addOn}</td>
									<td className="border-2 border-gray-400">{eachColumn.monkAmount}</td>
									{/* <td className="border-2 border-gray-400">{eachColumn.location}</td> */}
									<td className="border-2 border-gray-400">
										<button
											className="bg-orange-400 text-white text-sm rounded-3xl px-2 py-1"
											onClick={() => {
												setIsOpenModal(true)
												setLocation(eachColumn.location)
											}}
										>
											ดูแผนที่
										</button>
									</td>
									

									<td className="border-2 border-gray-400">{eachColumn.eventDate}</td>
									<td className="border-2 border-gray-400">{eachColumn.totalPrice}</td>
									<td className="border-2 border-gray-400 image-container">
										<a href={eachColumn.slipURL} target='_blank' className='relative'>
											<FontAwesomeIcon icon={faMagnifyingGlassPlus} color='#FDBA74' size='xl' className='absolute top-1/3 left-1/3' />
											<img src={eachColumn.slipURL} className='w-24' />
										</a>
									</td>

									<td className="border-2 border-gray-400 ">
										<div className='flex flex-col items-center gap-1'>
											{eachColumn.status ? 'จ่ายเงินแล้ว' : 'รอการตรวจสอบ'}

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
					<div className='flex flex-col gap-4'>
						<Map location={location} viewMode={true} />
					</div>
				</Modal>

			</div>
		</div>
	)
}


