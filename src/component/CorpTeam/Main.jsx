import { useEffect, useState } from "react";
import { fetchGoogleSheetData } from "../../fetch/fetchCorpData";
import Overview from "./Overview";
import TeamMembers from "./TeamMembers";
import TeamCollaborationChart from "./TeamCollaborationChart";
import TeamCollaborationTabel from "./TeamCollaborationTabel";
import Designers from "./Designers";
import ProjectsTable from "./ProjectsTable";
import Footer from "../footer";
import Loading from "../Loading";
import { motion } from "framer-motion";

const MainCorp = ({setLoading}) => {
  const [sheetData, setSheetData] = useState([]);
  const [filters, setFilters] = useState({
    designer: "All",
    from: "All",
    Status: "All",
    ToTeam: "All",
  });

  console.log("Filters:", filters); // Log the initial filters state
  useEffect(() => {

    const loadData = async () => {
                    setLoading(true);

      const data = await fetchGoogleSheetData();
      console.log("Fetched data:", data); // Log the fetched data
      setSheetData(data);

      // Delay hiding the loading screen by at least 3 seconds
        setLoading(false);

    };

    loadData();
  }, []);

const filteredData = sheetData.filter((item) => {
  const employeeMatch =
    filters.designer === "All" ||
    item["employee"]?.toLowerCase() === filters.designer.toLowerCase();

  const fromMatch =
    filters.from === "All" ||
    item["From"]?.toLowerCase() === filters.from.toLowerCase();

  const statusMatch =
    filters.Status === "All" ||
    (item["Status"] || "").toLowerCase() === filters.Status.toLowerCase();

  const toTeamMatch =
    filters.ToTeam === "All" || item["To Team"] === filters.ToTeam;

  return employeeMatch && fromMatch && statusMatch && toTeamMatch;
});


console.log("Filtered Data:", filteredData); // Log the filtered data



  return (
    <>

      <div className="p-2 md:px-24 pb-24 space-y-4 fade-in">

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
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full"
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
    from: "All",
    Status: "All",
    ToTeam: "All",
          })
        }
        className="fixed bottom-14 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-lg text-sm font-medium transition-all"
      >
        Clear Filters
      </button>

      <Footer />
    </>
  );
};

export default MainCorp;
