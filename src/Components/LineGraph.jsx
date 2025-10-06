import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const LineGraph = ({ title }) => {
  useEffect(() => {
    let options = {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'Inventory Levels',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },

        {
          name: 'Sales',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },{
          name: 'Received Revenue',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        },{
          name: 'Lost Revenue',
          data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
        },
      ],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
    };

    let chart = new ApexCharts(document.querySelector('#line-chart'), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-4 w-full">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div>
        <div id="line-chart"></div>
      </div>
    </div>
  );
};

export default LineGraph;
