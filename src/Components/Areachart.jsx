import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const AreaChart = ({ title }) => {
  useEffect(() => {
    const seriesData = {
      monthDataSeries1: {
        prices: [31, 40, 28, 51, 42, 109, 100], 
        dates: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-20T00:00:00.000Z",
          "2018-09-21T00:00:00.000Z",
          "2018-09-22T00:00:00.000Z",
          "2018-09-23T00:00:00.000Z",
          "2018-09-24T00:00:00.000Z",
          "2018-09-25T00:00:00.000Z"
        ],
      }
    };

    const options = {
      series: [{
        name: "STOCK ABC",
        data: seriesData.monthDataSeries1.prices
      }],
      chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      labels: seriesData.monthDataSeries1.dates,
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    };

    const chart = new ApexCharts(document.querySelector('#areachart'), options);
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-4 w-full">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div>
        <div id="areachart"></div>
      </div>
    </div>
  );
};

export default AreaChart;
