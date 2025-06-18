import { motion } from "framer-motion";
import psiLogo from "../assets/whitelogo.svg";
import { FaLaptopCode, FaPalette } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("username"); // remove any other cookies like token if needed
    Cookies.remove("name"); // remove any other cookies like token if needed
    navigate("/");
  };
  const name = Cookies.get("name");

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0 }}
      className="fixed top-0 left-0 h-full w-full text-white z-20 px-6 py-10"
      style={{
        background: "linear-gradient(192deg, #000 36.49%, #3D43B8 93.69%)",
      }}
    >
      <div className="w-[70%] h-full justify-between flex flex-col items-start">
        <div>
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <img src={psiLogo} alt="PSI Logo" className="h-18" />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex flex-col space-y-2">
              <h3 className="font-normal text-lg">Hi,{name}</h3>
            </div>
          </div>

          <hr className="border-white/30 mb-10" />

          {/* Navigation Items */}
          <div className="space-y-6">
            <div
              onClick={() => {
                setActiveTab("dev");
              }}
              className="flex  items-center gap-3  cursor-pointer hover:text-[#E35F27]"
            >
              <FaLaptopCode className="text-xl" />
              <span className="font-medium text-sm">
                UIUX & Development Team
              </span>
            </div>

            <div
              onClick={() => {
                setActiveTab("corp");
              }}
              className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#E35F27]"
            >
              <FaPalette className="text-xl"/>
              <span>Corporate Team</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className=" flex items-center gap-3 text-sm cursor-pointer hover:text-red-400"
        >
          <FiLogOut className="text-xl"/>
          <span>Log out</span>
        </div>

        {/* Footer */}
        <div className="flex flex-col space-y-2 text-xs text-white/70">
          <p>Powered by UIUX & Development Team - Marketing Team</p>
          <p>© 2025 PSI. All rights reserved.</p>
        </div>
      </div>
    </motion.div>
  );
};
export default Sidebar;
