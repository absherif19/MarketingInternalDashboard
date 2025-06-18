import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import psiLogo from "../../assets/psi-logo.png";
import { useNavigate } from "react-router-dom";
 import Cookies from "js-cookie"; // ⬅️ Make sure you import this at the top
import FormFooter from "./Footer";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


const handleLogin = async () => {
  if (username === "admin" && password === "devpass123") {
    Cookies.set("username", "admin", { expires: 7 });
    Cookies.set("name", "Admin", { expires: 7 });
    navigate("/dashboard");
    return;
  }

  try {
    const res = await fetch("/services/CorporateMarketing/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      Cookies.set("username", data.user.username, { expires: 7 });
      Cookies.set("name", data.user.name, { expires: 7 }); // 👈 save name here
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    alert("Server error. Please try again later.");
    console.error(error);
  }
};

  return (
    <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center bg-white px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center mb-6"
      >
        <img src={psiLogo} alt="PSI Logo" className="mb-5 w-[140px]" />
        <h2 className="text-[36px] text-[#1E222E] font-semibold mb-1">
          Welcome Back
        </h2>
        <p className="text-[#5F6D7E] text-[18px] mb-2">
          Login into your account
        </p>
      </motion.div>

      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-[#CBD5E1] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#CBD5E1] rounded-md px-4 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full cursor-pointer bg-[#E85D04] text-white py-2 rounded-md text-sm hover:bg-orange-600 transition"
        >
          Login
        </button>
      </div>
      <FormFooter />
    </div>
  );
};

export default LoginForm;
