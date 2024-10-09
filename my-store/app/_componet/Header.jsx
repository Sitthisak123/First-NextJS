import { Button } from '@/components/ui/button'
import { CircleUserRoundIcon, LayoutGrid, Search, ShoppingBag, ShoppingBasket, UserRoundIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import CartItemList from './CartItemList'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


function Header() {

  const [categorylist, setCategoryList] = useState([]);
  const isLogin = sessionStorage.getItem('jwt') ? true : false
  const router = useRouter();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const jwt = sessionStorage.getItem('jwt');
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    getCategoryList();
  }, [])

  useEffect(() => {
    getCartItems();
  }, [updateCart])

  const getCartItems = async () => {
    if (jwt) {
      const cartItemList = await GlobalApi.getCartItem(user.id, jwt);
      setTotalCartItem(cartItemList?.length)
      setCartItemList(cartItemList);
    }
  }

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data)
    })
  }

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  }

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then(resp => {
      toast('ลบสินค้าออกจากตะกร้าแล้ว');
      getCartItems();
    })
  }

  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount
    });
    setSubTotal(total.toFixed(2))
  }, [cartItemList])

  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-2' >
        <Image src='/logo.png' alt='logo' width={50} height={50} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200'><LayoutGrid className='h-5 w-5' />ประเภทสินค้า</h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>เลือกประเภทอาหาร</DropdownMenuLabel>
              <DropdownMenuLabel 
              className='flex gap-4 items-center cursor-pointer hover:scale-110 transition-all ease-in-out' 
              onClick={() => router.push('/')} 
              >
                หน้าหลัก
                </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {categorylist.map((category, index) => (
              <Link key={index} href={'/products-category/' + category.attributes.name}>
                <DropdownMenuItem className='flex gap-4 items-center cursor-pointer hover:scale-110 transition-all ease-in-out '>
                  <Image src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    category?.attributes?.icon?.data[0]?.attributes?.url}
                    unoptimized={true} alt="alt" width={30} height={30} key={index} />
                  <h2 className='text-lg'>{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className='flex gap-5 items-center'>


        <Sheet>
          <SheetTrigger>
            <h2 className='flex gap-2 items-center text-lg'>
              <ShoppingBasket className='h-7 w-7' />
              <span className='bg-primary text-white px-2 rounded-full' >
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">ตะกร้าสินค้า</SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className='absolute w-[90%] bottom-6 flex flex-col'>
                <h2 className='text-lg font-bold flex justify-between'>ราคารวม
                  <span>{subtotal} บาท </span></h2>
                <Button
                  disabled={cartItemList.length == 0}
                  onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}>ชำระเงิน</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? <Link href={'/sign-in'}>
          <Button>Login</Button>
        </Link>
          :
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRoundIcon className='h-12 w-12 p-2 rounded-full bg-green-100 text-primary' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>ข้อมูลผู้ใช้</DropdownMenuItem>
              <DropdownMenuItem>รายการสั่งซื้อ</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSignOut()}  >ออกจากระบบ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  )
}

export default Header