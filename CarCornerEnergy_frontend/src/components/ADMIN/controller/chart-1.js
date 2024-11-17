import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const MyChart1 = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('/api/visitors')
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const chartOptions = {
    series: [
      {
        name: 'Visitors',
        data: chartData,
      },
    ],
    chart: {
      type: 'area',
      toolbar: {
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: 'transparent' },
    colors: ['var(--bs-primary)'],
    markers: { size: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.12,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        style: {
          colors: Array(12).fill('#a1aab2'),
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: Array(10).fill('#a1aab2'),
        },
      },
    },
  };

  return (
    <div>
      <ApexCharts options={chartOptions} series={chartOptions.series} type="area" height={300} />
    </div>
  );
};

export default MyChart1;
