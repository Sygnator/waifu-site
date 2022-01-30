// value: {high: 0, normal: 0, low: 0},

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// ChartJS.defaults.plugins.legend.position = 'right';
// ChartJS.defaults.plugins.legend.labels.boxHeight = 20;
// ChartJS.defaults.plugins.legend.labels.boxWidth = 30;
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Wartość Kart',
    },
  },
};

export const ValueChartData = {
  labels: ['Wysoka', 'Normalna', 'Niska'],
  datasets: [
    {
      label: 'Wartość Kart',
      data: [0,0,0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function ValueChart() {
  return <Pie options={options} data={ValueChartData} />;
}
