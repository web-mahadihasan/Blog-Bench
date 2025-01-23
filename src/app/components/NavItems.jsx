"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
    const pathname = usePathname()
  return (
    <ul className='flex items-center gap-4'>
        <li className='px-2'>
            <Link href={"/"} className={`${pathname === "/" ? "font-medium text-emerald-600 text-lg" : "font-black/85 font-normal text-base"}`}>Home</Link>
        </li>
        <li className='px-2'>
            <Link href={"/profile"} className={`${pathname === "/profile" ? "font-medium text-emerald-600 text-lg" : "text-base font-black/85 font-normal"}`}>Profile</Link>
        </li>
    </ul>
  )
}

export default NavItems