'use client'

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { colors } from '../../constants/constants'
export const RadarChart = ({ id, radius, data, indicator, axisLabel = false, symbolSize = 6, fontSize = 10 }) => {
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
          color: colors.quinary,
          // backgroundColor: '#666',
          borderRadius: 3,
          padding: [3, 5],
          fontSize,
          fontStyle: 'normal',
          fontWeight: 'bold'
        },
        axisLabel: {
          show: axisLabel,
          fontSize: 8,
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
          data,
          symbolSize
        }
      ]
    }

    option && myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data, radius, indicator, fontSize, symbolSize, axisLabel])

  return <div ref={chartRef} id={id} style={{ width: '100%', height: '100vh' }} />
}
