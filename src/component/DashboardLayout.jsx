import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Main from "./Main";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDragEnd = (_, info) => {
    // Swipe right to open
    if (info.offset.x > 20) {
      setIsSidebarOpen(true);
    }
    // Swipe left to close
    if (info.offset.x < -20) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Sidebar behind */}
      <div className="absolute top-0 left-0 h-full w-full z-0">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content with drag */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={{
          open: { scale: 0.9, x: 300, y: 10, borderRadius: "1rem", opacity: 1 },
          closed: { scale: 1, x: 0, y: 0, borderRadius: "0rem" }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 bg-white h-full overflow-auto shadow-xl"
      >
        <Main isMenuOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
