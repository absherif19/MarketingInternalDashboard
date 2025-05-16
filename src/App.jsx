import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/Header";
import { fetchGoogleSheetData } from "./fetch/fetchSheet";
import Welcome from "./component/Welcome";
import Overview from "./component/Overview";
import TeamMembers from "./component/TeamMembers";
import TeamCollaborationChart from "./component/TeamCollaborationChart";
import Designers from "./component/Designers";
import Developers from "./component/Developers";
import ProjectsTable from "./component/ProjectsTable";
import Footer from "./component/footer";
import Loading from "./component/Loading";
import { motion } from "framer-motion";
function App() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ add this
  const [selectedDesigner, setSelectedDesigner] = useState("All");
  const [selectedDeveloper, setSelectedDeveloper] = useState("All");
  const [selectedDesignStatus, setSelectedDesignStatus] = useState("All");
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGoogleSheetData();
      setSheetData(data);

      // Delay hiding the loading screen by at least 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    loadData();
  }, []);

  const filteredData = sheetData.filter((item) => {
    const designerMatch =
      selectedDesigner === "All" || item["Design By"] === selectedDesigner;

    const developerMatch =
      selectedDeveloper === "All" || item["Dev Team"] === selectedDeveloper;

    const designStatusMatch =
      selectedDesignStatus === "All" ||
      (item["Status"] || "").toLowerCase() ===
        selectedDesignStatus.toLowerCase();

    const projectStatusMatch =
      selectedProjectStatus === "All" ||
      (item["Project Status"] || "").toLowerCase() ===
        selectedProjectStatus.toLowerCase();

    return (
      designerMatch && developerMatch && designStatusMatch && projectStatusMatch
    );
  });

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="px-24 pb-24 space-y-6 fade-in">
        <Welcome />
        <Overview
          data={filteredData}
          selectedDesigner={selectedDesigner}
          setSelectedDesigner={setSelectedDesigner}
          selectedDeveloper={selectedDeveloper}
          setSelectedDeveloper={setSelectedDeveloper}
          selectedDesignStatus={selectedDesignStatus}
          setSelectedDesignStatus={setSelectedDesignStatus}
          selectedProjectStatus={selectedProjectStatus}
          setSelectedProjectStatus={setSelectedProjectStatus}
        />

        <div className="w-full flex gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-1/2"
          >
            <TeamMembers />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-1/2"
          >
            <TeamCollaborationChart />
          </motion.div>
        </div>
        <div className="w-full flex gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-1/2"
          >
            <Designers data={filteredData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-1/2"
          >
            <Developers data={filteredData} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full"
        >
          <ProjectsTable data={filteredData} />
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default App;
