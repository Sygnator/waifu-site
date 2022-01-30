/* cardsDereCount: {
        yato: 0,
        yami: 0,
        raito: 0,
        tsundere: 0,
        mayadere: 0,
        kamidere: 0,
        deredere: 0,
        bodere: 0,
        kuudere: 0,
        dandere: 0,
        yandere: 0}, */

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
      text: 'Dere',
    },
  },
};

export const DereChartData = {
  labels: ['Yato', 'Yami', 'Raito','Tsundere', 'Mayadere', 'Kamidere','Deredere', 'Bodere', 'Kuudere', 'Dandere', 'Yandere'],
  datasets: [
    {
      label: 'Dere',
      data: [0,0,0,0,0,0,0,0,0,0,0],
      backgroundColor: [
        'rgba(86, 86, 86, 0.8)',
        'rgba(30, 30, 30, 0.8)',
        'rgba(255, 255, 255, 0.8)',
        'rgba(255, 0, 114, 0.8)',
        'rgba(255, 0, 223, 0.8)',
        'rgba(246, 249, 1, 0.8)',
        'rgba(0, 59, 255, 0.8)',
        'rgba(255, 39, 0, 0.8)',
        'rgba(0, 143, 255, 0.8)',
        'rgba(0, 253, 139, 0.8)',
        'rgba(255, 161, 0, 0.8)',
      ],
      borderColor: [
        'rgba(86, 86, 86, 1)',
        'rgba(30, 30, 30, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 0, 114, 1)',
        'rgba(255, 0, 223, 1)',
        'rgba(246, 249, 1, 1)',
        'rgba(0, 59, 255, 1)',
        'rgba(255, 39, 0, 1)',
        'rgba(0, 143, 255, 1)',
        'rgba(0, 253, 139, 1)',
        'rgba(255, 161, 0, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function DereChart() {
  return <Pie options={options} data={DereChartData} />;
}
