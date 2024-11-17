import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const MyDeviceStatsBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('/api/device-stats')
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const chartOptions = {
    series: chartData,
    legend: { position: 'bottom' },
    theme: { palette: 'palette1' },
    chart: { type: 'bar' },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yaxis: { title: { text: 'Usage (thousands)' } },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (value) => `${value} thousands`,
      },
    },
  };

  return (
    <ApexCharts options={chartOptions} series={chartOptions.series} type="bar" height={300} />
  );
};

export default MyDeviceStatsBarChart;
