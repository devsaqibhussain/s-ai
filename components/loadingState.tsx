import React from 'react'
import Image from 'next/image'

const LoadingState = () => {
  return (
    <div className=' flex flex-col justify-center items-center'>
        <div className='relative h-10 w-10 animate-spin'>
            <Image
                src={"/logo.jpg"}
                alt = "loading indicator"
                fill
                className=' rounded-full'
            />
        </div>
        <p className=' animate-pulse'>S-AI is thinking...</p>

    </div>
  )
}

export default LoadingState