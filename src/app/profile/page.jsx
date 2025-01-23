import { getKindeServerSession, isLoading } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'
import { redirect } from "next/navigation"
import profile from "../../assets/hacker.png"
import Image from 'next/image'
import Loading from '../blog/[id]/loading'

const Profile = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  // const defaultImage = "../../assets/hacker.png"
  if(isLoading) return <Loading/>
  
  if (!user) {
    redirect('/api/auth/login?post_login_redirect_url=/profile')
  }

  return (
    <div className='w-full min-h-full'>
      <div className='max-w-3xl mx-auto md:flex items-center gap-8 border blog-details min-h-[30vh] my-24 p-6 lg:p-10 rounded-md' 
        style={{
          background:
            "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",
        }}
      >
        <div className='md:border-r-2 border-gray-300 px-6 h-full'>
          { 
            user?.picture ? <img src={user?.picture } alt={`Image of ${user?.family_name}`} width={120} height={120} className='w-24 h-24 rounded-md' /> :  
            <Image src={profile} alt={`Image of ${user?.family_name}`} width={120} height={120} className='w-24 h-24 rounded-md hidden md:block' />  
          }
          
        </div>

        <div>
          <h3 className='text-3xl font-semibold text-black/75 text-center my-4'>Welcome to your profile! </h3>
            <p className='flex items-center gap-4 text-xl text-gray-600'>
              <span>Name:</span>
              <span>{user.given_name} {user.family_name}</span>
            </p>
            <p className='flex items-center gap-4 text-xl text-gray-600 my-2'>
              <span>Name:</span>
              <span>{user.email}</span>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
