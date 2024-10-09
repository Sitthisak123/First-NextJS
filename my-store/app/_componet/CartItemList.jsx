import { TrashIcon } from 'lucide-react';
import React from 'react';

function CartItemList({ cartItemList, onDeleteItem }) {
  // ตรวจสอบว่า cartItemList เป็น Array
  if (!Array.isArray(cartItemList)) {
    console.error('cartItemList is not an array:', cartItemList);
    return null; // หรือแสดงข้อความว่าไม่มีสินค้า
  }

  return (
    <div>
      <div className='h-[500px] overflow-auto'>
        {cartItemList.map((cart, index) => (
          <div key={cart.id} className='flex justify-between items-center p-2 mb-5'>
            <div className='flex gap-6 items-center'>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.image}`}
                width={90}
                height={90}
                alt={cart.name}
                className='border p-2'
              />

              <div>
                <h2 className='font-bold'>{cart.name}</h2>
                <h2>จำนวน: {cart.quantity}</h2>
                <h2 className='text-lg font-bold'>{cart.amount} บาท</h2>
              </div>
            </div>
            <TrashIcon
              className='cursor-pointer'
              onClick={() => onDeleteItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;