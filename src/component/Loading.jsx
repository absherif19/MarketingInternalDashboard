import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black space-y-8">
      <img src="/psi-logo.png" alt="PSI Logo" className="w-28" />
      <h2 className='text-2xl font-medium text-primary'>
        “We’re loading your data now — thanks for your patience, and don’t forget to smile!”
      </h2>
      <video
        className="w-[300px] mx-auto"
        autoPlay
        loop
        muted
        playsInline
        src="/loader.mp4"
      />
      <h2 className="text-2xl font-medium text-primary">Loading ...</h2>
    </div>
  )
}

export default Loading
