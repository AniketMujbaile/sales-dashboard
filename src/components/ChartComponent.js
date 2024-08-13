import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ChartComponent({ data, title, type }) {
  const chartData = {
    labels: data.map(item => item.product || item.category),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.sales || item.date1Sales),
        backgroundColor: 'rgba(59, 130, 246, 0.6)', 
      },
      type === 'bar' && data[0].date2Sales ? {
        label: 'Comparison Sales',
        data: data.map(item => item.date2Sales),
        backgroundColor: 'rgba(16, 185, 129, 0.6)', 
      } : null,
    ].filter(Boolean),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title },
    },
    scales: type === 'bar' ? {
      y: {
        beginAtZero: true,
      },
    } : undefined,
  };

  return (
    <div className="w-full h-64 md:h-80">
      {type === 'bar' && <Bar data={chartData} options={options} />}
      {type === 'pie' && <Pie data={chartData} options={options} />}
    </div>
  );
}

export default ChartComponent;