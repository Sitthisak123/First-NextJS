"use client"
import { Button } from '@/components/ui/button'
import { LayoutGrid, ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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

function Header() {
  const [cetCategoryList, setCategoryLise] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory().then(response => {
      setCategoryLise(response.data.data)
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
        <h2 className='flex gap-2 items-center text-lg'><ShoppingBag />0</h2>
        <Button>Login</Button>
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
