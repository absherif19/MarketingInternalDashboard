import React from 'react'
import psilogo from '../assets/psi-logo.png'
import loader from '../assets/loader.mp4'

const Loading = () => {
  return (
    <div className="flex p-4 md:p-0 flex-col items-center justify-center h-screen text-black space-y-8">
      <img src={psilogo} alt="PSI Logo" className="w-28" />
      <h2 className='text-base md:text-2xl font-medium text-primary'>
        “We’re loading your data now — thanks for your patience, and don’t forget to smile!”
      </h2>
      <video
        className="w-[150px] md:w-[200px] mx-auto"
        autoPlay
        loop
        muted
        playsInline
        src={loader}
      />
      <h2 className="text-2xl font-medium text-primary">Loading ...</h2>
    </div>
  )
}

export default Loading
