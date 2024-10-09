"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import moment from 'moment';
import MyOrderItem from '@/app/_componet/MyOrderItem';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  
function MyOrder() {

    const jwt=sessionStorage.getItem('jwt');
    const user=JSON.parse(sessionStorage.getItem('user'));
    const router=useRouter();
    const [orderList,setOrderList]=useState([]);
   
    useEffect(()=>{
        if(!jwt)
        {
            router.replace('/');
        };

        getMyOrder();

    },[]);

    const getMyOrder=async()=>{
        const orderList_=await GlobalApi.getMyOrder(user.id,jwt);
        setOrderList(orderList_)
    }

  return (
    <div w-full>
    <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>รายการสั่งซื้อ</h2>
      <div className='py-8 mx-7 md:mx-20 '>
          <h2 className='text-3xl font-bold text-primary'>ประวัติการสั่งซื้อ</h2>
         <div className='mt-10'>

        {orderList.map((item,index)=>(
          <Collapsible key={index}>
          <CollapsibleTrigger className='w-6/12'>
              <div className='border p-2 bg-slate-100 flex gap-24'>
                  <h2><span className='font-bold mr-2'>วันที่:</span>{moment(item?.createdAt).format('DD/MMM/yyy')}</h2>
                  <h2><span className='font-bold mr-2'>ราคารวมภาษีและค่าจัดส่ง : </span> {item?.totalOrderAmount} บาท / 
                  <span className='font-bold mr-2'></span>{item?.status}</h2>
              </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
             {item.orderItemList.map((order,index_)=>(
              <MyOrderItem orderItem={order} key={index_} />
             ))}
          </CollapsibleContent>
          </Collapsible>
        ))}
         
          </div>
      </div>
</div>
  )
}

export default MyOrder

