"use client"
import { UserButton, UserProfile } from '@clerk/nextjs'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import MyOrders from './_components/MyOrders'

function User() {
  return (
    <div className='flex justify-center items-center mt-24'>
        <UserProfile>
            <UserButton.UserProfilePage
            label="Mes commandes"
            labelIcon={<ShoppingBag className='' />}
            url="my-orders"
        >
           <MyOrders/>
        </UserButton.UserProfilePage>
        
        </UserProfile>
    </div>
  )
}

export default User