import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const MyDonutChart4 = () => {
  const [chartData, setChartData] = useState({ series: [], labels: [] });

  useEffect(() => {
    // Fetch data from the backend
    axios.get('/api/donut-chart')
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const chartOptions = {
    series: chartData.series,
    labels: chartData.labels,
    legend: { position: 'bottom' },
    theme: { palette: 'palette1' },
    chart: { type: 'donut' },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: { fontSize: '22px', fontWeight: 600 },
            value: { fontSize: '16px', fontWeight: 400, formatter: (value) => `${value} %` },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} %`,
      },
    },
  };

  return (
    <ApexCharts options={chartOptions} series={chartOptions.series} type="donut" height={300} />
  );
};

export default MyDonutChart4;
