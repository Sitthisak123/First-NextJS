"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react'
import { toast } from 'sonner'

function CreateAccount() {

    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const router = useRouter();

    useEffect(()=>{
        const jwt=sessionStorage.getItem('jwt');
        if(jwt)
        {
          router.push('/')
        }
    },[])

    const onCreateAccount=(e)=>{
        e.preventDefault();
        GlobalApi.registerUser(username,email,password).then(resp=>{
            console.log(resp.data.user)
            console.log(resp.data.jwt)

            sessionStorage.setItem('user',JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt',resp.data.jwt);

            toast("สมัครสมาชิกเรียบร้อยแล้ว")

            router.push('/');

        },(e)=>{
            toast("สมัครสมาชิกไม่สำเร็จ")
        })
    }

  return (

    <div  className='flex items-baseline justify-center my-10'>
        <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
           
            <div>
                <Image src='/logo.png' 
                    width={100} height={100} 
                    alt='logo'/> 
            </div>

            <h2 className='font-bold text-3xl'>สมัครสมาชิกใหม่</h2>
            <h2 className='text-gray-500'>ระบุอีเมล์และรหัสผ่านเพื่อสมัครสมาชิกใหม่</h2>

            <form onSubmit={(e)=>onCreateAccount(e)} className='w-full flex flex-col gap-5 mt-7'>
                <Input placeholder='ระบุชื่อผู้ใช้' onChange={(e)=>setUsername(e.target.value)}/>
                <Input placeholder='ระบุอีเมล์'onChange={(e)=>setEmail(e.target.value)}/>
                <Input type='password' placeholder='ระบุรหัสผ่าน' onChange={(e)=>setPassword(e.target.value)}/>
                <Button disabled={!(username&&email&&password)}>สมัครสมาชิก</Button>
                <p>กรณีเป็นสมาชิกอยู่แล้ว
                    <Link href={'/sign-in'} className='text-blue-500'>คลิ๊กเพื่อเข้าสู่ระบบ</Link>
                </p>
            </form>
     
        </div>
    </div>
  )
}

export default CreateAccount
