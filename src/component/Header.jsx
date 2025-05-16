import React from 'react'
import psiLogo from "/psi-logo.png"; 

const Header = () => {
return (
    <div className="bg-white">
      {/* Top Logo and Department */}
      <div className="flex custom-shadow-soft items-center justify-between px-24 py-4">
        <img src={psiLogo} alt="PSI Logo" className="h-18" />
        <h1 className="text-3xl font-medium text-primary">
          Marketing Department
        </h1>
        <div className="w-16" /> {/* Empty div to balance flex space */}
      </div>
    </div>
  );
}
export default Header
