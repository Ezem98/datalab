'use client'

// import {
//   Chart,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// } from 'chart.js'
// import React from 'react'
// import { Radar } from 'react-chartjs-2'
// import { colors } from '../../constants/constants'

// Chart.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// )
// export const RadarChart = ({ labels, datasets }) => {
//   if (!Array.isArray(datasets) || datasets.length === 0) {
//     return null // O mostrar un mensaje de error adecuado
//   }
//   // Normalizar los datos
//   const normalizedDatasets = datasets.map((dataset) => {
//     const maxDataValue = Math.max(...dataset.data)
//     const normalizedData = dataset.data.map((value) => value / maxDataValue)
//     return { ...dataset, data: normalizedData }
//   })

//   const data = {
//     labels: ['A', 'B', 'C', 'D', 'E'],
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [10, 20, 30, 40, 50],
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//         yAxisID: 'y-axis-1'
//       },
//       {
//         label: 'Dataset 2',
//         data: [100, 200, 300, 400, 500],
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         yAxisID: 'y-axis-2'
//       }
//     ]
//   }

//   const options = {
//     scales: {
//       r: {
//         angleLines: {
//           display: true
//         },
//         suggestedMin: 0
//       },
//       yAxes: [
//         {
//           id: 'y-axis-1',
//           type: 'linear',
//           position: 'left',
//           ticks: {
//             max: 60,
//             min: 0,
//             stepSize: 10
//           }
//         },
//         {
//           id: 'y-axis-2',
//           type: 'linear',
//           position: 'right',
//           ticks: {
//             max: 600,
//             min: 0,
//             stepSize: 100
//           }
//         }
//       ]
//     }
//   }

//   return <Radar data={data} options={options} />
// }

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

export const RadarChart = ({ id, radius, data, indicator }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)
    const option = {
      legend: {
        data: ['Player 1', 'Player 2']
      },
      tooltip: {
        trigger: 'axis'
      },
      radar: {
        // Define the name, min and max of each axis
        indicator,
        radius,
        axisName: {
          color: '#fff',
          backgroundColor: '#666',
          borderRadius: 3,
          padding: [3, 5],
          fontSize: 10
        },
        axisLabel: {
          show: true,
          fontSize: 10,
          fontStyle: 'normal',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          // Define the data for each series
          data
        }
      ]
    }

    option && myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data, radius, indicator])

  return <div ref={chartRef} id={id} style={{ width: '100%', height: '100vh' }} />
}
