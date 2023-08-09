'use client'

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { colors } from '../../constants/constants'

const gaugeData = [
  {
    value: 20,
    name: 'Excellent',
    title: {
      offsetCenter: ['0%', '-30%']
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '-20%'],
      color: '#5470C6'
    }
  },
  {
    value: 40,
    name: 'Good',
    title: {
      offsetCenter: ['0%', '0%']
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '10%']
    },
    itemStyle: {
      color: colors.primary
    }
  },
  {
    value: 60,
    name: 'Commonly',
    title: {
      offsetCenter: ['0%', '30%']
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '40%']
    },
    itemStyle: {
      color: colors.secondary
    }
  }
]
export const RingGaugeChart = ({ id, radius, data, indicator, axisLabel = false, symbolSize = 6, fontSize = 10, width, height }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)
    const option = {
      series: [
        {
          type: 'gauge',
          colorBy: 'data',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 2,
              borderColor: '#464646'
            }

          },
          axisLine: {
            lineStyle: {
              width: 40
            }
          },
          splitLine: {
            show: true,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true,
            distance: 50
          },
          data: gaugeData,
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }
      ]
    }

    option && myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data, radius, indicator, fontSize, symbolSize, axisLabel])

  return <div ref={chartRef} id={id} style={{ width, height }} />
}
