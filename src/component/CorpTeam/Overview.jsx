import React from "react";
import complete from "../../assets/icons/complete.png";
import progress from "../../assets/icons/progress.png";
import canceled from "../../assets/icons/canceled.png";
import blocked from "../../assets/icons/blocked.png";
import palette from "../../assets/icons/palette.png";
import { motion } from "framer-motion";

const Overview = ({ data, filters, setFilters }) => {
  const countByStatus = (status) =>
    data.filter(
      (item) => (item["Status"] || "").toLowerCase() === status.toLowerCase()
    ).length;

  const totalTasks = data.length;
  const completedTasks = countByStatus("Completed");
  const inProgressTasks = countByStatus("In progress");
  const blockedTasks = countByStatus("Blocked");
  const canceledTasks = countByStatus("Canceled");

  const stats = [
    {
      label: "Count of Projects",
      value: totalTasks,
      icon: palette,
      bg: "bg-[#FFE2E5]",
      iconBg: "#FA5A7D",
      filterKey: "reset", // custom signal to reset
    },
    {
      label: "Complete Design",
      value: completedTasks,
      icon: complete,
      bg: "bg-[#DCFCE7]",
      iconBg: "#3CD856",
      filterKey: "Status",
      filterValue: "Completed",
    },
    {
      label: "In Progress Design",
      value: inProgressTasks,
      icon: progress,
      bg: "bg-[#FFF4DE]",
      iconBg: "#FF947A",
      filterKey: "Status",
      filterValue: "In progress",
    },
        {
      label: "Canceled Design",
      value: canceledTasks,
      icon: canceled,
      bg: "bg-[#D7EFFF]",
      iconBg: "#0095FF",
      filterKey: "Status",
      filterValue: "Canceled",
    },
    {
      label: "Blocked Design",
      value: blockedTasks,
      icon: blocked,
      bg: "bg-[#FFE2E5]",
      iconBg: "#FA5A7D",
      filterKey: "Status",
      filterValue: "Blocked",
    }

  ];

  const handleStatClick = (filterKey, filterValue) => {
    if (filterKey === "reset") {
      setFilters({
    designer: "All",
    from: "All",
    Status: "All",
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
            (stat.filterKey === "Status" &&
              filters.Status === stat.filterValue) ||
            (stat.filterKey === "reset" &&
              filters.designer === "All" &&
              filters.Status === "All" &&
              filters.ToTeam === "All");

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
