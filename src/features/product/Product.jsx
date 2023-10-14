import React from 'react'
import { useState } from 'react'
import ProductItem from './ProductItem';
import AddOn from './AddOn';
import axios from 'axios'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useProduct } from '../../hooks/use-product';
import { useEffect } from 'react';


export default function Product() {


	const [addOn, setAddOn] = useState(true);

	// const products = [
	//   { name: 'a' },
	//   { name: 'b' },
	//   { name: 'c' }
	// ]
	const { mainProducts, addOnProducts, monkExpense, selectedProduct, setSelectedProduct } = useProduct();


	return (
		<div className='container py-20 flex flex-col gap-8'>

			<div>
				<h1 className='text-4xl text-center'> Products </h1>
			</div>

			<div className='flex gap-16'>
				<div>
					<img className="object-cover w-full rounded-2xl " src="https://f.ptcdn.info/723/061/000/pkltx5avwSxPyzfJVDT-o.jpg" alt="hero-image" />
				</div>

				<div className="flex flex-col gap-10 w-full" >

					<div className="flex flex-col gap-4 w-full">
						<h4>select product</h4>
						{mainProducts.map((productItem, index) => {
							return <ProductItem key={index} productItem={productItem} />
						})}
					</div>

					<button className='bg-orange-300 rounded-lg p-2'>
						add to cart
					</button>

					{/* 
          <div>
            <h4>จำนวนที่ต้องการนิมนต์</h4>
            <input
              className='rounded py-2 px-6 outline-none ring ring-gray-300'
              placeholder='1-10'
            />
          </div>

          <div>
            <h4>ชุดสังฆทาน</h4>
            <div className="flex gap-4 w-full">
              <AddOn addOn={addOn} onClick={() => setAddOn(true)} name='รับ'></AddOn>
              <AddOn addOn={!addOn} onClick={() => setAddOn(false)} name='ไม่รับ'></AddOn>

            </div>

          </div>

     
          <div>
            <h4>กำหนดวัน</h4>
            <DatePicker 
            onChange={(e)=> console.log(new Date(e.$d).toLocaleDateString())} 
            />
          </div>

          <div>
            <h4>สถานที่</h4>
          </div> 
          */}


				</div>
			</div>


		</div>

	)
}
