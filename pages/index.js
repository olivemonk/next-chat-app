import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import LeftNav from '@/components/LeftNav'


const Home = () => {

  const { signOut, currentUser, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if(!isLoading && !currentUser){
      // not logged in
      router.push('/login');
    }
  },[currentUser, isLoading])


  return !currentUser ? <Loader /> :  (
    // <div>
    //   <button onClick={signOut}>sign out</button>
    // </div>
    <div className='bg-c1 flex h-[100vh]'>
        <div className='flex w-full shrink-0'>
          <LeftNav />
            <div className='flex bg-c2 grow '>
              <div>sidebar</div>
              <div>chat</div>
            </div>
        </div>
    </div>
  )
}

export default Home