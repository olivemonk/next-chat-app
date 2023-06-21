import React from 'react'
import Image from 'next/image';

const Loader = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full justify-center items-center flex'>
        <Image src='/loader.svg' 
        width={100} height={100}
        alt='Loading...' />
    </div>
  )
}

export default Loader