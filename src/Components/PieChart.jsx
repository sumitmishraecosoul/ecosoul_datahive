import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const PieChart = ({title}) => {
  useEffect(() => {
    let options = {
      chart: {
        type: 'pie',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      series: [44, 55, 13, 43, 22], // Simple array of values for pie chart
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'], // Labels for each segment
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
      legend: {
        position: 'bottom',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    let chart = new ApexCharts(document.querySelector('#pie-chart'), options);
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
        <div id="pie-chart"></div>
      </div>
    </div>
  );
};

export default PieChart;
