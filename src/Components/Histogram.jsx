import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const Histogram = ({ title = "Monthly Sales Overview" }) => {
  useEffect(() => {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        background: '#EFFFF5' 
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 8,
          columnWidth: '55%',
        }
      },
      colors: ['#18C75C', '#278EF3', '#F54646'], 
      dataLabels: {
        enabled: false 
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        markers: {
          fillColors: ['#18C75C', '#278EF3', '#F54646'] 
        },
        itemMargin: { horizontal: 12 }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], 
        labels: {
          style: { fontSize: '13px', fontWeight: 500 }
        }
      },
      yaxis: {
        show: true
      },
      grid: {
        show: false
      },
      tooltip: {
        y: {
          formatter: val => val
        }
      }
    };

    const series = [
      {
        name: 'Revenue',
        data: [120, 132, 150, 160, 175, 180]
      },
      {
        name: 'Units Sold',
        data: [100, 115, 130, 140, 153, 165]
      },
      {
        name: 'Returns',
        data: [20, 22, 25, 23, 27, 28]
      }
    ];

    const chart = new ApexCharts(document.querySelector('#chart'), { ...options, series });
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-4 w-full">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div>
        <div id="chart"></div>
      </div>
    </div>
  );
};

export default Histogram;
