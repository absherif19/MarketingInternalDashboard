import { useEffect, useState } from "react";
import Header from "./Header";
import { fetchGoogleSheetData } from "../fetch/fetchSheet";
import Welcome from "./Welcome";
import Overview from "./Overview";
import TeamMembers from "./TeamMembers";
import TeamCollaborationChart from "./TeamCollaborationChart";
import TeamCollaborationTabel from "./TeamCollaborationTabel";
import Designers from "./Designers";
import Developers from "./Developers";
import ProjectsTable from "./ProjectsTable";
import Footer from "./footer";
import Loading from "./Loading";
import { motion } from "framer-motion";

const Main = ({ setIsSidebarOpen, isMenuOpen }) => {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ add this
  const [filters, setFilters] = useState({
    designer: "All",
    developer: "All",
    designStatus: "All",
    projectStatus: "All",
    ToTeam: "All",
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGoogleSheetData();
      console.log("Fetched data:", data); // Log the fetched data
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
      filters.designer === "All" || item["Design By"] === filters.designer;

    const developerMatch =
      filters.developer === "All" || item["Dev Team"] === filters.developer;

    const designStatusMatch =
      filters.designStatus === "All" ||
      (item["Status"] || "").toLowerCase() ===
        filters.designStatus.toLowerCase();

    const projectStatusMatch =
      filters.projectStatus === "All" ||
      (item["Project Status"] || "").toLowerCase() ===
        filters.projectStatus.toLowerCase();

    const toTeamMatch =
      filters.ToTeam === "All" || item["To Team"] === filters.ToTeam;

    return (
      designerMatch &&
      developerMatch &&
      designStatusMatch &&
      projectStatusMatch &&
      toTeamMatch
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
<Header
  isMenuOpen={isMenuOpen}
  onMenuClick={() => setIsSidebarOpen(!isMenuOpen)}
  setIsSidebarOpen={setIsSidebarOpen}
/>
      <div className="p-2 md:px-24 pb-24 space-y-4 fade-in">
        <Welcome />
        <Overview
          data={filteredData}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="w-full flex-col md:flex-row flex gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-1/2"
          >
            <TeamMembers
              setFilters={setFilters}
              filters={filters}
              filteredData={filteredData}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-1/2"
          >
            {/* Chart for tablets and up */}
            <div className="hidden sm:block w-full">
              <TeamCollaborationChart
                filteredData={filteredData}
                filters={filters}
                setFilters={setFilters}
              />
            </div>

            {/* Table for mobile only */}
            <div className="block sm:hidden w-full">
              <TeamCollaborationTabel
                filteredData={filteredData}
                filters={filters}
                setFilters={setFilters}
              />{" "}
            </div>
          </motion.div>
        </div>
        <div className="w-full flex-col md:flex-row flex gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-1/2"
          >
            <Designers
              data={filteredData}
              filters={filters}
              setFilters={setFilters}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-1/2"
          >
            <Developers
              data={filteredData}
              filters={filters}
              setFilters={setFilters}
            />
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
      {/* Clear Filters Floating Button */}
      <button
        onClick={() =>
          setFilters({
            designer: "All",
            developer: "All",
            designStatus: "All",
            projectStatus: "All",
            ToTeam: "All",
          })
        }
        className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-lg text-sm font-medium transition-all"
      >
        Clear Filters
      </button>

      <Footer />
    </>
  );
};

export default Main;
