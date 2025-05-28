import React from 'react';
import profileImg from '../assets/JamilIsmail.png';
import burger from "../assets/icons/Menu.png";

const Welcome = ({ isMenuOpen, setIsSidebarOpen, activeTab }) => {
  const toggleMenu = () => setIsSidebarOpen(!isMenuOpen);

  return (
    <div className="flex justify-between items-center w-full pt-4 px-4 md:px-10">
      {/* Left side: Hamburger + Label */}
      <div className="flex items-center gap-4">
        <img
          src={burger}
          alt="Toggle Menu"
          className="w-5 cursor-pointer"
          onClick={toggleMenu}
        />
<h2 className="text-sm md:text-2xl font-medium text-primary">
  {activeTab === "dev"
    ? "UIUX & Development Team"
    : "Corporate Team"}
</h2>

      </div>

      {/* Right side: Profile */}
      <div className="flex items-center gap-4">
        <img
          src={profileImg}
          alt="Jamil Ismail"
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-base md:text-xl font-medium text-primary">
            Jamil Ismail
          </h2>
          <p className="text-base md:text-lg text-secondary font-normal">
            Corporate Marketing Manager
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
