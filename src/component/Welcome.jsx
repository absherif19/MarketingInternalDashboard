import React from 'react'
import profileImg from '../assets/JamilIsmail.png'; // Replace with your image path

const Welcome = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 items-center justify-between py-4">
      {/* Left side: profile + name/title */}
      <div className="flex items-center gap-8">
        <img
          src={profileImg}
          alt="Jamil Ismail"
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-base md:text-lg font-medium text-primary">
            Jamil Ismail
          </h2>
          <p className="text-base md:text-lg text-secondary font-normal">
            Corporate Marketing Manager
          </p>
        </div>
      </div>

      {/* Right side: toggle buttons */}
      <div className="flex flex-row gap-2">
        <button className="bg-[#2960CE] cursor-pointer text-white w-[160px] md:w-[220px] py-2.5 rounded-md px-1  md:text-sm text-xs font-medium">
         UI UX / Development Team
        </button>
        <button className="border cursor-not-allowed border-[#2960CE] text-[#2960CE]  w-[160px] md:w-[220px] py-2.5 px-1 rounded-md md:text-sm text-xs font-medium">
          Marketing Team
        </button>
      </div>
    </div>
  );
}

export default Welcome
