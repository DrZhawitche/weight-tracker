import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend

)

import './Chart.scss'

function Chart() {

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // x-axis labels
    datasets: [
      {
        label: 'My First Database',
        data: [65, 59, 80, 81, 56, 55, 40], // y-axis data points
        fill: false,
        borderColor: 'rgb(75, 197, 192)', // Line color
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        position: 'bottom', // Position of the legend
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  const savedEntries = JSON.parse(localStorage.getItem('entries'))

  return(
    <div className="chart">
      <h2>This is a cool chart</h2>
      <p>Hell {savedEntries}</p>
    </div>
  )
}
import { formatNumber } from "chart.js/helpers"

export default Chart