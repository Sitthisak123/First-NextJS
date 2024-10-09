"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowBigRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function CheckOut() {

  const user=JSON.parse(sessionStorage.getItem('user'));
  const jwt=sessionStorage.getItem('jwt');
  const [totalCartItem,setTotalCartItem]=useState(0);
  const [cartItemList,setCartItemList]=useState([]);
  const [totalAmount,setTotalAmount]=useState(0);
  const [subtotal,setSubTotal]=useState(0);

  const [username,setUsername]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  const [zip,setZip]=useState();
  const [address,setAddress]=useState();

  useEffect(()=>{

    if(!jwt)
      {
        router.push('/sign-in')
      }

    getCartItems();
  },[])

  const getCartItems=async()=>{
    if(jwt)
    {
      const cartItemList = await GlobalApi.getCartItem(user.id,jwt);
      setTotalCartItem(cartItemList?.length)
      setCartItemList(cartItemList);
    }
  }

  useEffect(()=>{
    let total=0;
    cartItemList.forEach(element => {
        total=total+element.amount
    });
    setTotalAmount((total+(total*0.07)+100).toFixed(2));
    setSubTotal(total.toFixed(2))
  },[cartItemList])

/** 
const calculateTotalAmount=()=>{
  const totalAmount=subtotal*0.07+100;
  
  return totalAmount.toFixed(2)
}
*/
  return (
  <div>
    <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>ชำระเงิน</h2>
        <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
          <div className='md:col-span-2 mx-20'>
              <h2>กรอกข้อมูลการชำระเงิน</h2>
                <div className='grid grid-cols-2 gap-10 mt-3'>
                  <Input placeholder='ชื่อ' onChange={(e)=>setUsername(e.target.value)}/>
                  <Input placeholder='อีเมล์'onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='grid grid-cols-2 gap-10 mt-3'>
                    <Input placeholder='เบอร์โทรศัพท์'onChange={(e)=>setPhone(e.target.value)}/>
                    <Input placeholder='รหัสไปรษณีย์'onChange={(e)=>setZip(e.target.value)}/>
                </div>
                <div className=' mt-3'>
                    <Input placeholder='ที่อยู่'onChange={(e)=>setAddress(e.target.value)} />
                </div>
          </div>
          <div className='mx-10 border'>
            <h2 className='p-3 bg-gray-200 font-bold text-center'>จำนวนสินค้าในตะกร้า({totalCartItem})</h2>
            <div className='p-4 flex flex-col gap-4'>
                <h2 className='font-bold flex justify-between'>ราคารวม : <span>{subtotal}</span></h2>
                  <hr></hr>
                <h2 className='flex justify-between'>ค่าจัดส่ง : <span>100.00 บาท</span></h2>
                <h2 className='flex justify-between'>ภาษีมูลค่าเพิ่ม (7%) : <span>{(subtotal*0.07).toFixed(2)} บาท</span></h2>
                  <hr></hr>
                <h2 className='font-bold flex justify-between'>ราคาสุทธิ : <span>{totalAmount} บาท</span></h2>
                <Button><ArrowBigRight/></Button>
            </div>
          </div>
        </div>
  </div>
  )
}

export default CheckOut
