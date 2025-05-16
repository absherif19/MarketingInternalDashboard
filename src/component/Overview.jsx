import React, { useEffect, useMemo, useRef, useState } from "react";
import globe from "../assets/icons/globe.png";
import palette from "../assets/icons/palette.png";
import laptop from "../assets/icons/laptop.png";
import tools from "../assets/icons/tools.png";
import code from "../assets/icons/code.png";
import { motion } from "framer-motion";

const Overview = ({
  data,
  selectedDesigner,
  setSelectedDesigner,
  selectedDeveloper,
  setSelectedDeveloper,
  selectedDesignStatus,
  setSelectedDesignStatus,
  selectedProjectStatus,
  setSelectedProjectStatus,
}) => {
  const filterContainerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const filterElement = filterContainerRef.current;
    if (!filterElement) return;

    const defaultTop = filterElement.offsetTop;
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY + 15 >= defaultTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const uniqueDesigners = useMemo(() => {
    const set = new Set();
    data.forEach((item) => {
      if (item["Design By"]) set.add(item["Design By"]);
    });
    return Array.from(set);
  }, [data]);

  const uniqueDevelopers = useMemo(() => {
    const set = new Set();
    data.forEach((item) => {
      if (item["Dev Team"]) set.add(item["Dev Team"]);
    });
    return Array.from(set);
  }, [data]);

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
      iconBg: "bg-[#FA5A7D]",
    },
    {
      label: "Complete Design",
      value: completeDesign,
      icon: palette,
      bg: "bg-[#FFF4DE]",
      iconBg: "bg-[#FF947A]",
    },
    {
      label: "Complete DEV",
      value: completeDev,
      icon: laptop,
      bg: "bg-[#DCFCE7]",
      iconBg: "bg-[#3CD856]",
    },
    {
      label: "In Progress Design",
      value: inProgressDesign,
      icon: tools,
      bg: "bg-[#F3E8FF]",
      iconBg: "bg-[#A66DD4]",
    },
    {
      label: "In Progress DEV",
      value: inProgressDev,
      icon: code,
      bg: "bg-[#DBF1FF]",
      iconBg: "bg-[#3A86FF]",
    },
  ];

  return (
    <div className="bg-white border border-[#F8F9FA] px-8 py-14 rounded-3xl custom-shadow-soft flex flex-col  space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-primary">Overview</h2>
        {/* Sticky Filters */}
        <div
          ref={filterContainerRef}
          className={`z-50 ${
            isSticky
              ? "fixed top-0 right-0 w-full bg-white/70 backdrop-blur-2xl px-32 py-4"
              : ""
          }`}
        >
          <div className=" justify-between mx-auto flex gap-4 text-[#9D9D9D] text-sm">
            {/* Left side (only when sticky) */}
            {isSticky && (
              <div className="text-primary font-medium">
                {/* Add whatever you want here */}
                Filters
              </div>
            )}
            <div className="flex gap-12 justify-end w-full">
              {/* Group 1: Designer + Design Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>Designer</span>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={selectedDesigner}
                    onChange={(e) => setSelectedDesigner(e.target.value)}
                  >
                    <option>All</option>
                    {uniqueDesigners.map((designer, idx) => (
                      <option key={idx}>{designer}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span>Design Status</span>
                  <select
                    className="border rounded px-2 py-1 text-sm"
  value={selectedDesignStatus}
  onChange={(e) => setSelectedDesignStatus(e.target.value)}
                  >
                    <option>All</option>
                    <option>Completed</option>
                    <option>In progress</option>
                    <option>Not started</option>
                    <option>Cancelled</option>
                    <option>Blocked</option>
                  </select>
                </div>
              </div>

              {/* Group 2: Developer + Project Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>Developer</span>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={selectedDeveloper}
                    onChange={(e) => setSelectedDeveloper(e.target.value)}
                  >
                    <option>All</option>
                    {uniqueDevelopers.map((developer, idx) => (
                      <option key={idx}>{developer}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span>Project Status</span>
                  <select
                    className="border rounded px-2 py-1 text-sm"
  value={selectedProjectStatus}
  onChange={(e) => setSelectedProjectStatus(e.target.value)}
                  >
                    <option>All</option>
                    <option>Completed</option>
                    <option>In progress</option>
                    <option>Not started</option>
                    <option>Cancelled</option>
                    <option>Blocked</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`rounded-lg p-4 ${stat.bg} flex flex-col gap-2`}
          >
            <div
              className={`w-9 h-9 p-2 rounded-full ${stat.iconBg} flex items-center justify-center`}
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
        ))}
      </div>
    </div>
  );
};

export default Overview;
