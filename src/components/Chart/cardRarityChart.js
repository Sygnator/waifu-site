/*cardsCount: {SSS: 0, SS: 0, S: 0, A: 0, B: 0, C: 0, D: 0, E: 0, total: 0},
      cardsCountProfile: {SSS: 0, SS: 0, S: 0, A: 0, B: 0, C: 0, D: 0, E: 0, total: 0, max: 0},*/

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Liczba kart (Ranga)',
    },
  },
};

const labels = ['SSS', 'SS', 'S', 'A', 'B', 'C', 'D','E'];

export const RarityChartData = {
  labels,
  datasets: [
    {
      label: 'Aktualne wyświetlane',
      data: [0,0,0,0,0,0,0,0],
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
    },
    {
      label: 'Wszystkie',
      data: [0,0,0,0,0,0,0,0],
      backgroundColor: 'rgba(53, 162, 235, 0.8)',
    },
  ],
};

export function RarityChart() {
  return <Bar options={options} data={RarityChartData} />;
}
