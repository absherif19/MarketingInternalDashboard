import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Developers = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const chart = echarts.init(chartRef.current);

    // Get unique developers
    const developersSet = new Set();
data.forEach((item) => {
  const dev = item["Dev Team"];
  if (dev && dev.toLowerCase() !== "no need") {
    developersSet.add(dev);
  }
});

    const developers = Array.from(developersSet);

    const statuses = ["Completed", "In Progress", "Not Started", "Canceled"];
    const formattedData = {
      Completed: [],
      "In Progress": [],
      "Not Started": [],
      Canceled: [],
    };

    statuses.forEach((status) => {
      developers.forEach((developer) => {
        const count = data.filter(
          (item) =>
            item["Dev Team"] === developer &&
            (item["Project Status"] || "").toLowerCase() === status.toLowerCase()
        ).length;
formattedData[status].push(count === 0 ? 0.2 : count);
      });
    });

    const colors = {
      Completed: '#00E096',
      'In Progress': '#FFA800',
      'Not Started': '#884DFF',
      Canceled: '#979797',
    };

    const series = statuses.map((status) => ({
      name: status,
      type: 'bar',
      barWidth: 18,
      data: formattedData[status],
      itemStyle: {
        color: colors[status],
        borderRadius: [6, 6, 0, 0],
      },
    }));

    chart.setOption({
tooltip: {
  trigger: 'axis',
  axisPointer: { type: 'shadow' },
  formatter: function (params) {
    const lines = params.map(p => {
      const value = p.value === 0.2 ? 0 : p.value;
      return `${p.marker} ${p.seriesName}: ${value}`;
    });
    return lines.join('<br/>');
  }
},

      legend: {
        bottom: 10,
        left: 'center',
        orient: 'horizontal',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
          fontSize: 12,
          color: '#1E1E4B',
        },
      },
      grid: {
        top: 10,
        left: '3%',
        right: '4%',
        bottom: 50,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: developers,
        axisLabel: {
          color: '#1E1E4B',
        },
        axisLine: {
          lineStyle: {
            color: '#E5E7EB',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#1E1E4B',
        },
        axisLine: { show: false },
        splitLine: {
          lineStyle: {
            color: '#E5E7EB',
          },
        },
      },
      series,
    });

    return () => chart.dispose();
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl custom-shadow-soft border border-[#F8F9FA]">
      <h3 className="text-xl font-medium text-primary mb-4">
        Developers
      </h3>
      <div ref={chartRef} style={{ width: '100%', height: '350px' }} />
    </div>
  );
};

export default Developers;
