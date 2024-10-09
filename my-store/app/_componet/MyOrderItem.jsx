import React from 'react'
import Image from 'next/image'

function MyOrderItem({orderItem}) {
  console.log(orderItem);
  return (
    <div className='w-[60%]'>
    
    <div className='grid grid-cols-5  mt-3 items-center'>
        <Image src={ process.env.NEXT_PUBLIC_BACKEND_BASE_URL+orderItem.product.data.attributes.images.data[0].attributes.url}
            width={80}
            height={80}
            alt='image'
            className='bg-gray-100 p-5 rounded-md border'/>
        <div className='col-span-2'>
            <h2>{orderItem.product.data.attributes.name}</h2>
            <h2>ราคา : {orderItem.product.data.attributes.mrp} บาท</h2>
        </div>
        <h2 className=''>จำนวน :{orderItem.quantity}</h2>
        </div>
        <hr className='mt-3 w-[70%]'></hr>
    </div>
  )
}

export default MyOrderItem