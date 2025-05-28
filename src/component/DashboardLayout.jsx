import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Main from "./DevTeam/Main";
import Header from "./Header";
import Welcome from "./Welcome";
import MainCorp from "./CorpTeam/Main";
import Loading from "./Loading";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dev");
  const [loading, setLoading] = useState(true);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 20) {
      setIsSidebarOpen(true);
    }
    if (info.offset.x < -20) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Sidebar behind */}
      <div className="absolute top-0 left-0 h-full w-full z-0">
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
        />{" "}
      </div>

        {loading && (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <Loading />
    </div>
  )}

      {/* Main content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={{
          open: { scale: 0.9, x: 300, y: 10, borderRadius: "1rem", opacity: 1 },
          closed: { scale: 1, x: 0, y: 0, borderRadius: "0rem" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 bg-white h-full overflow-auto shadow-xl"
      >
        {/* Persistent Header + Welcome */}
        <Header
          isMenuOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="px-4 md:px-24 pt-4">
          <Welcome
            activeTab={activeTab}
            isMenuOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {activeTab === "dev" ? (
          <Main setIsSidebarOpen={setIsSidebarOpen} setLoading={setLoading} />
        ) : (
          <MainCorp
            setIsSidebarOpen={setIsSidebarOpen}
            setLoading={setLoading}
          />
        )}
      </motion.div>
      
    </div>
    
  );
};

export default DashboardLayout;
