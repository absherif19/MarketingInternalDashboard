import React from 'react'
import psiLogo from "../assets/psi-logo.png"; 

const Header = () => {
return (
    <div className="bg-white">
      {/* Top Logo and Department */}
      <div className="flex custom-shadow-soft items-center justify-between p-4 md:px-24 py-4">
        <img src={psiLogo} alt="PSI Logo" className="h-18" />
        <p className="text-base md:text-3xl font-medium text-primary">
          Corporate Marketing Department
        </p>
        <div className="w-16 hidden md:block" />
      </div>
    </div>
  );
}
export default Header
