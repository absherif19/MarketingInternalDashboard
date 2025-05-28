import React from "react";
import globe from "../../assets/icons/globe.png";
import palette from "../../assets/icons/palette.png";
import laptop from "../../assets/icons/laptop.png";
import tools from "../../assets/icons/tools.png";
import code from "../../assets/icons/code.png";
import { motion } from "framer-motion";

const Overview = ({ data, filters, setFilters }) => {
  console.log(filters);

  const countByStatus = (key, status) =>
    data.filter(
      (item) => (item[key] || "").toLowerCase() === status.toLowerCase()
    ).length;

  const totalProjects = data.length;
  const completeDesign = countByStatus("Status", "Completed");
  const inProgressDesign = countByStatus("Status", "In progress");
  const completeDev = countByStatus("Project Status", "Completed");
  const inProgressDev = countByStatus("Project Status", "In progress");

  const stats = [
    {
      label: "Count of Projects",
      value: totalProjects,
      icon: globe,
      bg: "bg-[#FFE2E5]",
      iconBg: "#FA5A7D",
      filterKey: "reset", // custom signal to reset
    },
    {
      label: "Complete Design",
      value: completeDesign,
      icon: palette,
      bg: "bg-[#FFF4DE]",
      iconBg: "#FF947A",
      filterKey: "designStatus",
      filterValue: "Completed",
    },
    {
      label: "Complete DEV",
      value: completeDev,
      icon: laptop,
      bg: "bg-[#DCFCE7]",
      iconBg: "#3CD856",
      filterKey: "projectStatus",
      filterValue: "Completed",
    },
    {
      label: "In Progress Design",
      value: inProgressDesign,
      icon: tools,
      bg: "bg-[#F3E8FF]",
      iconBg: "#A66DD4",
      filterKey: "designStatus",
      filterValue: "In progress",
    },
    {
      label: "In Progress DEV",
      value: inProgressDev,
      icon: code,
      bg: "bg-[#DBF1FF]",
      iconBg: "#3A86FF",
      filterKey: "projectStatus",
      filterValue: "In progress",
    },
  ];

const handleStatClick = (filterKey, filterValue) => {
  if (filterKey === "reset") {
    setFilters({
      designer: "All",
      developer: "All",
      designStatus: "All",
      projectStatus: "All",
      ToTeam: "All",
    });
  } else {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey] === filterValue ? "All" : filterValue,
    }));
  }
};


  return (
    <div className="bg-white border border-[#F8F9FA] px-0 md:px-8 py-0 md:py-14 rounded-3xl custom-shadow-soft flex flex-col space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
        {stats.map((stat, i) => {
          const isActive =
            (stat.filterKey === "designStatus" &&
              filters.designStatus === stat.filterValue) ||
            (stat.filterKey === "projectStatus" &&
              filters.projectStatus === stat.filterValue) ||
            (stat.filterKey === "reset" &&
              filters.designer === "All" &&
              filters.developer === "All" &&
              filters.designStatus === "All" &&
              filters.projectStatus === "All" &&
              filters.ToTeam === "All");

          // 🟢 Use the iconBg color for the active border background
          const activeBorderStyle = isActive
            ? { border: `2px solid ${stat.iconBg}` }
            : {};

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={() => handleStatClick(stat.filterKey, stat.filterValue)}
              style={activeBorderStyle}
              className={`rounded-lg p-4 ${stat.bg} flex flex-col gap-2 cursor-pointer transition-transform duration-200`}
            >
  <div
    className="w-9 h-9 p-2 rounded-full flex items-center justify-center"
    style={{ backgroundColor: stat.iconBg }}
  >
                <img
                  src={stat.icon}
                  alt="icon"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div className="text-3xl font-semibold text-primary">
                {stat.value}
              </div>
              <div className="text-base font-normal text-[#425166]">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
