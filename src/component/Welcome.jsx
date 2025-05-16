import React from 'react'
import profileImg from '/JamilIsmail.png'; // Replace with your image path

const Welcome = () => {
  return (
    <div className="flex items-center justify-between py-4">
      {/* Left side: profile + name/title */}
      <div className="flex items-center gap-4">
        <img
          src={profileImg}
          alt="Jamil Ismail"
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-xl font-medium text-primary">
            Jamil Ismail
          </h2>
          <p className="text-lg text-secondary font-normal">
            Marketing Operation Manger
          </p>
        </div>
      </div>

      {/* Right side: toggle buttons */}
      <div className="flex gap-2">
        <button className="bg-[#2960CE] cursor-pointer text-white w-[200px] py-2.5 rounded-md text-sm font-medium">
         UI UX / Development Team
        </button>
        <button className="border cursor-not-allowed border-[#2960CE] text-[#2960CE] w-[220px] py-2.5 rounded-md text-sm font-medium">
          Marketing Team
        </button>
      </div>
    </div>
  );
}

export default Welcome
