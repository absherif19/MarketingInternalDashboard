import React, { useState } from "react";

import psiLogo from "../assets/psi-logo.png";
import backicon from "../assets/icons/backButton.png";
import Menu from "../assets/icons/Menu.png";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logout from "../assets/icons/logout.png";
const Header = ({ onMenuClick, isMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("username"); // Remove other cookies if needed
    navigate("/"); // Redirect to login
  };

  const name = Cookies.get("name");

  return (
    <div className="bg-white">
      {/* Top Logo and Department */}
      <div className="flex custom-shadow-soft items-center justify-between p-4 md:px-24 py-4">
        {/* Burger Icon (only visible on mobile) */}
        <div className="block md:hidden mr-4">
          {isMenuOpen ? (
            <img
              src={backicon}
              alt="Back"
              onClick={onMenuClick}
              className="w-10 h-10 cursor-pointer opacity-100"
            />
          ) : (
            <img
              src={Menu}
              alt="Menu"
              onClick={onMenuClick}
              className="w-6 h-6 cursor-pointer opacity-100"
            />
          )}
        </div>

        {/* Logo */}
        <img src={psiLogo} alt="PSI Logo" className="md:h-18 h-10" />

        {/* Department Title */}
        <p className="text-base md:text-3xl font-medium text-primary text-center flex-1 md:flex-none">
          Corporate Marketing Department
        </p>

        {/* Empty div for spacing on desktop */}
        <div className="relative hidden md:block">
          {/* Greeting & Toggle */}
          <div
            className="flex items-center gap-1 text-[#1E222E] text-base font-medium cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Hi,</span>
            <span className="ml-1">{name}</span>
            <FiChevronDown
              className={`text-sm mt-[2px] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute w-full min-w-[150px] right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-center px-6 py-3 text-sm text-red-500 hover:bg-gray-100"
              >
                <img src={logout} alt="Menu" className="inline mr-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
