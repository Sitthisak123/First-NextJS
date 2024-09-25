"use client"
import { Button } from '@/components/ui/button'
import { CircleUserRoundIcon, LayoutGrid, Search, ShoppingBag, ShoppingBasket, UserRoundIcon } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import React, { useEffect, useState, useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import CartItemList from './CartitemList'
import { UpdateCartContext } from '../_context/UpdateCartContext'

function Header() {
  const pathName = usePathname();
  const router = useRouter();

  const currentCategory = pathName.split('/').pop();
  const [isLogin, setIsLogin] = useState(false);
  const [cetCategoryList, setCategoryLise] = useState([]);
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const jwt = sessionStorage.getItem('jwt');

  const user = JSON.parse(sessionStorage.getItem('user'));
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  useEffect(() => {
    getCategoryList();
    setIsLogin(sessionStorage.getItem('jwt') ? true : false);
  }, [isLogin, pathName])

  useEffect(() => {
    getCartItems();
  }, [updateCart])

  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount
    });
    setSubTotal(total.toFixed(2))
  }, [cartItemList])


  const getCartItems = async () => {
    if (jwt) {
      const cartItemList = await GlobalApi.getCartItem(user.id, jwt);
      setTotalCartItem(cartItemList?.length)
      setCartItemList(cartItemList);
    }
  }

  const getCategoryList = () => {
    GlobalApi.getCategory().then(response => {
      setCategoryLise(response.data.data)
    })
  }

  const onSignOut = () => {
    sessionStorage.clear();
    setIsLogin(() => false);
    router.push('/sign-in');
  }

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then(resp => {
      toast('ลบสินค้าออกจากตะกร้าแล้ว');
      getCartItems();
    })
  }



  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-2'>
        <Image src='/logo.png' alt='logo' width={50} height={50} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>

            <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10'><LayoutGrid className='h-5 w-5' />ประเภทสินค้า</h2>

          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>เลือกประเภทอาหาร</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`../..`}>
              <DropdownMenuItem className="hover:scale-110 ease-in-out">
                <div
                  width={30}
                  height={30} />

                <h2>แนะนำ</h2>
              </DropdownMenuItem>
            </Link>

            {cetCategoryList.map((category, index) => (
              <Link href={`/products-category/${category?.attributes?.name}`}>
                <DropdownMenuItem className="hover:scale-110 ease-in-out">
                  <Image src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    category?.attributes?.icon?.data[0]?.attributes?.url}
                    unoptimized={true}
                    atl='icon'
                    width={30}
                    height={30} />

                  <h2>{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>

            ))}

          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex gap-5 items-center'>
        <ModeToggle />
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
        {
          isLogin ?
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
            :
            <Link href={'/sign-in'}>
              <Button>Login</Button>
            </Link>
        }
      </div>
    </div>
  )
}

export default Header

function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
