"use client"
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function SignIn() {

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/')
    }
  }, [])

  const onSignIn = () => {
    GlobalApi.signIn(email, password).then(resp => {

      console.log(resp.data.user)
      console.log(resp.data.jwt)
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);
      toast("เข้าสู่ระบบเรียบร้อยแล้ว")
      router.push('/');

    }, (e) => {
      toast("เกิดข้อผิดพลาดไม่สามารถเข้าสู่ระบบได้")
    })

  }

  return (
    <div className='flex items-baseline justify-center my-10'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>

        <div>
          <Image src='/logo.png'
            width={100} height={100}
            alt='logo' />
        </div>

        <h2 className='font-bold text-3xl'>เข้าสู่ระบบ</h2>
        <h2 className='text-gray-500'>ระบุอีเมล์และรหัสผ่านเพื่อเข้าสู่ระบบ</h2>

        <div className='w-full flex flex-col gap-5 mt-7'>

          <Input placeholder='ระบุอีเมล์' onChange={(e) => setEmail(e.target.value)} />
          <Input type='password' placeholder='ระบุรหัสผ่าน' onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={() => onSignIn()} disabled={!(email || password)}>เข้าสู่ระบบ</Button>
          <p>กรณีไม่เป็นสมาชิก
            <Link href={'/create-account'} className='text-blue-500'>คลิ๊กเพื่อเข้าสมัครสมาชิก</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default SignIn