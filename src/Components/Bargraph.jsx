import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { getBarGraphData } from '../services/inventory';

const BarGraph = ({ title }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    const materialCategories = ['Bamboo', 'Birchwood', 'Bagasse', 'PLA', 'Palm Leaf', 'Paper'];

    const buildOptions = (values) => ({
      chart: { type: 'bar', height: 350, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: false, borderRadius: 10, distributed: true, columnWidth: '45%' } },
      colors: ['#d8f3dc', '#2d6a4f', '#40916c', '#b7e4c7', '#74c69d', '#95d5b2'],
      dataLabels: { enabled: true, position: 'top', formatter: (val) => Number(val).toLocaleString(), style: { fontSize: '12px', colors: ['#333'] } },
      xaxis: { categories: materialCategories, labels: { style: { fontSize: '15px' } } },
      series: [{ data: values }],
      legend: { show: false },
      grid: { show: false }
    });

    const coerceNumber = (v) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const fetchAndRender = async () => {
      try {
        const p = await getBarGraphData();
        const values = [
          coerceNumber(p.bamboo),
          coerceNumber(p.birchwood),
          coerceNumber(p.baggase ?? p.bagasse),
          coerceNumber(p.pla),
          coerceNumber(p.palmLeaf ?? p.palmleaf),
          coerceNumber(p.paper),
        ];

        if (isCancelled || !chartRef.current) return;
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }
        chartRef.current.innerHTML = '';
        chartInstanceRef.current = new ApexCharts(chartRef.current, buildOptions(values));
        await chartInstanceRef.current.render();
      } catch (e) {
        // render zeros on error
        if (isCancelled || !chartRef.current) return;
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        }
        chartRef.current.innerHTML = '';
        chartInstanceRef.current = new ApexCharts(chartRef.current, buildOptions([0, 0, 0, 0, 0, 0]));
        await chartInstanceRef.current.render();
      }
    };

    fetchAndRender();

    return () => {
      isCancelled = true;
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-4 w-full">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div>
        <div id="chart" ref={chartRef}></div>
      </div>
    </div>
  );
};

export default BarGraph;
