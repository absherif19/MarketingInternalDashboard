import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGoogleSheetData } from "../../fetch/fetchSheet";
import Header from "../Header";
import Welcome from "../Welcome";
import Overview from "./Overview";
import TeamMembers from "./TeamMembers";
import TeamCollaborationChart from "./TeamCollaborationChart";
import TeamCollaborationTabel from "./TeamCollaborationTabel";
import Designers from "./Designers";
import Developers from "./Developers";
import ProjectsTable from "./ProjectsTable";
import Footer from "../footer";
import Loading from "../Loading";
import { motion } from "framer-motion";

const Main = ({ setLoading, atBottom }) => {

  const [filters, setFilters] = useState({
    designer: "All",
    developer: "All",
    designStatus: "All",
    projectStatus: "All",
    ToTeam: "All",
  });


  const {
    data: sheetData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projectSheetData"],
    queryFn: fetchGoogleSheetData,
    staleTime: 1000 * 60 * 5, // 5 mins
    cacheTime: 1000 * 60 * 10, // 10 mins
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
  



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
      filters.ToTeam === "All" ||
      (Array.isArray(filters.ToTeam)
        ? filters.ToTeam.includes(item["To Team"])
        : item["To Team"] === filters.ToTeam);

    return (
      designerMatch &&
      developerMatch &&
      designStatusMatch &&
      projectStatusMatch &&
      toTeamMatch
    );
  });

  if (isError) {
    return (
      <div className="text-center text-red-600 p-6">
        ❌ Error loading project data.
      </div>
    );
  }

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
            <div className="hidden sm:block w-full">
              <TeamCollaborationChart
                filteredData={filteredData}
                filters={filters}
                setFilters={setFilters}
              />
            </div>

            <div className="block sm:hidden w-full">
              <TeamCollaborationTabel
                filteredData={filteredData}
                filters={filters}
                setFilters={setFilters}
              />
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
  className={`fixed right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-md shadow-lg text-sm font-medium transition-all duration-300 ${
    atBottom ? "bottom-16" : "bottom-6"
  }`}
>
  Clear Filters
</button>

      <Footer />
    </>
  );
};

export default Main;
