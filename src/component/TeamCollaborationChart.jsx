import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const data = [
  { name: "BD Team", value: 12, color: "#14B8A6" },
  { name: "HR Team", value: 22, color: "#2563EB" },
  { name: "Mr Said", value: 12, color: "#A78BFA" },
  { name: "CRM TTeam", value: 12, color: "#E07FAF" },
  { name: "L&D Team", value: 7, color: "#FACC15" },
  { name: "None", value: 7, color: "#F59E0B" },
];

const TeamCollaborationChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const total = data.reduce((sum, item) => sum + item.value, 0);

    chart.setOption({
      tooltip: {
        trigger: "item",
      },
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
            label: {
              width: 100, // adjust based on your layout
              fontWeight: 400,
              color: "#1E1E4B",
            },
            value: {
              align: "right",
              width: 40,
              fontWeight: 600,
              color: "#1E1E4B",
            },
          },
        },
        formatter: function (name) {
          const item = data.find((d) => d.name === name);
          return `{label|${name}}  {value|${item?.value}}`;
        },
      },

      series: [
        {
          name: "Teams",
          type: "pie",
          radius: ["55%", "80%"],
          center: ["25%", "50%"], // ✅ center donut
          label: { show: false },
          labelLine: { show: false },
          data: data.map((item) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: item.color,
              borderColor: "#fff", // Gap color
              borderWidth: 2, // Gap size (adjust to 1 or 2)
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
              text: `{title|Total Projects}\n\n{value|43}`,
              textAlign: "center",
              rich: {
                title: {
                  fontSize: 14,
                  fontWeight: "normal",
                  fill: "#737373",
                },
                value: {
                  fontSize: 32,
                  fontWeight: 600,
                  fill: "#0A0A0A",
                },
              },
            },
          },
        ],
      },
    });

    return () => chart.dispose();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl custom-shadow-soft border border-[#F8F9FA]">
      <h3 className="text-xl font-medium text-primary mb-3">
        Teams Collaborations
      </h3>
      <div className="w-full h-[400px]" ref={chartRef} />
    </div>
  );
};

export default TeamCollaborationChart;
