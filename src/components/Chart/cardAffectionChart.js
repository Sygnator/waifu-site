/* cardsAffectionCount: {
  zaciekawienie: 0,
  fascynacja: 0,
  przyjazn: 0,
  zauroczenie: 0,
  milosc: 0,
  obsesyjnaMilosc: 0,
  obsesyjnaMiloscA: 0,
  obsesyjnaMiloscB: 0,
  obsesyjnaMiloscY: 0,
  obojetnosc: 0,
  chlodnosc: 0,
  zlosliwosc: 0,
  wrogosc: 0,
  zawisc: 0,
  nienawisc: 0,
  pogarda: 0,
  pogardaA: 0,
  pogardaB: 0,
  pogardaY: 0}, */

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
  // import faker from 'faker';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Relacje',
      },
    },
  };

  const labels = [
    'Zaciekawienie-Chłodność',
    'Fascynacja-Złośliwość',
    'Przyjaźń-Wrogość',
    'Zauroczenie-Zawiść',
    'Miłość-Nienawiść',
    'Obsesyjna miłość-Pogarda',
    'Obsesyjna miłość-Pogarda (α)',
    'Obsesyjna miłość-Pogarda (β)',
    'Obsesyjna miłość-Pogarda (γ)'
  ];

  export const AffectionChartData = {
    labels,
    datasets: [
      {
        label: 'Pozytywne relacje',
        data: [0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Negatywne relacje',
        data: [0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  export function AffectionChart() {
    return <Bar options={options} data={AffectionChartData} />;
  }
