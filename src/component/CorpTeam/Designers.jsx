import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Technicals = ({ data, setFilters }) => {
  const chartRef = useRef(null);

  // ✅ Extract technicals outside of useEffect so we can use them in JSX
  const technicalsSet = new Set();
  data?.forEach((item) => {
    if (item["employee"]) technicalsSet.add(item["employee"]);
  });
  const technicals = Array.from(technicalsSet);

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const statuses = ["Completed", "In Progress", "Not Started", "Canceled"];
    const formattedData = {
      Completed: [],
      "In Progress": [],
      "Not Started": [],
      Canceled: [],
    };

    statuses.forEach((status) => {
      technicals.forEach((technical) => {
        const count = data.filter(
          (item) =>
            item["employee"] === technical &&
            (item["Status"] || "").toLowerCase() === status.toLowerCase()
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
        selectedMode: true,
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
        data: technicals,
        axisLabel: {
          color: '#1E1E4B',
          interval: 0,
          fontSize: 12,
          formatter: (name) => {
            const maxChars = 18;
            if (name.length <= maxChars) return name;
            return name.match(new RegExp(`.{1,${maxChars}}`, 'g')).join('\n');
          },
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

    // ✅ Click on a bar → filter by technical
    chart.on('click', (params) => {
      const clickedTechnical = params.name;

      if (technicals.includes(clickedTechnical)) {
        setFilters(prev => ({
          ...prev,
          technical: prev.technical === clickedTechnical ? "All" : clickedTechnical,
        }));
      }
    });

    // ✅ Click on legend → filter by technical status
    chart.on('legendselectchanged', function (params) {
      const status = params.name;
      setFilters(prev => ({
        ...prev,
        technicalStatus: prev.technicalStatus === status ? "All" : status,
      }));
    });

    return () => chart.dispose();
  }, [data, technicals]);

  return (
    <div className="bg-white p-6 rounded-2xl custom-shadow-soft border border-[#F8F9FA]">
      <h3 className="text-xl font-medium text-primary mb-4">Technicals</h3>

      <div className="overflow-x-auto md:overflow-x-hidden">
        <div style={{ minWidth: technicals.length * 140 }}>
          <div
            ref={chartRef}
            style={{
              width: '100%',
              height: '350px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Technicals;
