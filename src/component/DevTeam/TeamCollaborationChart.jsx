import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const TeamCollaborationChart = ({ filteredData, setFilters }) => {
 const chartRef = useRef(null);

useEffect(() => {
  if (!chartRef.current) return;

  const chart = echarts.init(chartRef.current);

const knownTeams = ["PSI", "BD", "HR", "Mr Said", "CRM", "L&D", "Internal"];
const teamCounts = {};
const othersSet = new Set(); // <-- collect "Others"

filteredData.forEach((item) => {
  const team = item["To Team"] || "None";
  const teamKey = knownTeams.includes(team) ? team : "Others";

  if (teamKey === "Others") {
    othersSet.add(team); // <-- collect unknown team name
  }

  teamCounts[teamKey] = (teamCounts[teamKey] || 0) + 1;
});

// Print others in the console
console.log("Teams grouped under 'Others':", [...othersSet]);



  // ✅ Colors for known + Others
  const teamColors = {
    "PSI": "#E35F27",
    "BD": "#14B8A6",
    "HR": "#2563EB",
    "Mr Said": "#A78BFA",
    "CRM": "#E07FAF",
    "L&D": "#FACC15",
    "Internal": "#FBBF24",
    "Others": "#9CA3AF", // gray or any color you like
  };

  // ✅ Final chart data
  const chartData = Object.entries(teamCounts).map(([name, value]) => ({
    name,
    value,
    color: teamColors[name] || "#9CA3AF",
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  chart.setOption({
    tooltip: { trigger: "item" },
    legend: {
      show: true,
      orient: "vertical",
      right: 30,
      top: "center",
      align: "left",
      itemGap: 20,
      textStyle: {
        fontSize: 18,
        rich: {
          label: { width: 100, fontWeight: 400, color: "#1E1E4B" },
          value: { align: "right", width: 40, fontWeight: 600, color: "#1E1E4B" },
        },
      },
      formatter: (name) => {
        const item = chartData.find((d) => d.name === name);
        return `{label|${name}}  {value|${item?.value}}`;
      },
    },
    series: [
      {
        name: "Teams",
        type: "pie",
        radius: ["55%", "80%"],
        center: ["25%", "50%"],
        label: { show: false },
        labelLine: { show: false },
        data: chartData.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color,
            borderColor: "#fff",
            borderWidth: 2,
          },
        })),
      },
    ],
    graphic: {
      elements: [
        {
          type: "text",
          left: "19%",
          top: "44%",
          style: {
            text: `{title|Total Projects}\n\n{value|${total}}`,
            textAlign: "center",
            rich: {
              title: { fontSize: 14, fontWeight: "normal", fill: "#737373" },
              value: { fontSize: 32, fontWeight: 600, fill: "#0A0A0A" },
            },
          },
        },
      ],
    },
  });

chart.on("click", function (params) {
  const team = params.name;

  if (team === "Others") {
    const othersArray = [...othersSet];
    setFilters((prev) => ({
      ...prev,
      ToTeam: prev.ToTeam === "Others" ? "All" : othersArray,
    }));
    return;
  }

  setFilters((prev) => ({
    ...prev,
    ToTeam: prev.ToTeam === team ? "All" : team,
  }));
});




  return () => {
    chart.dispose();
  };
}, [filteredData, setFilters]);

  return (
    <div className="bg-white p-6 rounded-2xl custom-shadow-soft border border-[#F8F9FA]">
      <h3 className="text-xl font-medium text-primary mb-3">Teams Collaborations</h3>
      <div className="w-full h-[400px]" ref={chartRef} />
    </div>
  );
};

export default TeamCollaborationChart;
