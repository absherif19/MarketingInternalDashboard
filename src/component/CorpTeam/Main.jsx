import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGoogleSheetData } from "../../fetch/fetchCorpData";
import Overview from "./Overview";
import TeamMembers from "./TeamMembers";
import TeamCollaborationChart from "./TeamCollaborationChart";
import TeamCollaborationTabel from "./TeamCollaborationTabel";
import Designers from "./Designers";
import ProjectsTable from "./ProjectsTable";
import Footer from "../footer";
import { motion } from "framer-motion";
import Corp from "./Corp";

const MainCorp = ({ setLoading, atBottom }) => {
  const [filters, setFilters] = useState({
    designer: "All",
    from: "All",
    Status: "All",
    ToTeam: "All",
  });

  const {
    data: sheetData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["corpSheetData"],
    queryFn: fetchGoogleSheetData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

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

  if (isError) {
    return (
      <div className="text-center text-red-600 p-6">
        ❌ Failed to load data from Google Sheets.
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
            <Corp
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
            from: "All",
            Status: "All",
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

export default MainCorp;
