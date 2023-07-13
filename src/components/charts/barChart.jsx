import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const BarsChart = ({ data1, data2, labels, isHorizontal, label1, label2 }) => {
  const midata = {
    labels,
    datasets: [
      {
        label: label1 ?? '',
        data: data1,
        backgroundColor: [
          '#0238ff50'
        ],
        borderColor: [
          '#0238ff'
        ],
        borderWidth: 1
      },
      {
        label: label2 ?? '',
        data: data2,
        backgroundColor: [
          '#b2b5b750'
        ],
        borderColor: [
          '#b2b5b7'
        ],
        borderWidth: 1
      }
    ]
  }

  const misoptions = {
    responsive: true,
    animation: true,
    indexAxis: isHorizontal ? 'y' : 'x',
    plugins: {
      legend: {
        display: !!label1
      }
    },
    scales: {
      y: {
        min: 0,
        border: { color: 'white' },
        grid: { color: '#ffffff20' }
      },
      x: {
        ticks: { color: 'white' },
        border: { color: 'white' },
        grid: { color: '#ffffff20' }
      }
    }
  }
  return <Bar data={midata} options={misoptions} />
}
