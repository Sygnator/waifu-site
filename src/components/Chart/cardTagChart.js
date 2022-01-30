import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Tagi',
      },
    },
};

export const TagChartData = {
  labels: ['Wymiana🔃', 'Ulubione💗', 'Galeria📌', 'Rezerwacja📝'],
  datasets: [
    {
      label: 'Tag',
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 10, 60, 0.8)',
        'rgba(174, 242, 193, 0.8)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 10, 60, 1)',
        'rgba(174, 242, 193, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function TagChart() {
  return <Doughnut options={options} data={TagChartData} />;
}
