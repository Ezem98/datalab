'use client'

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { colors } from '../../constants/constants'
import { round } from 'lodash'
export const GradeGaugeChart = ({ id, value, averageRating }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: averageRating,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#E66765'],
                [0.5, colors.secondary],
                [0.75, '#5470C6 '],
                [1, colors.primary]
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: colors.quinary,
            fontWeight: 'bold',
            fontSize: 16,
            distance: -40,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === round(averageRating * 0.875, 5)) {
                return 'Excellent'
              } else if (value === averageRating * 0.625) {
                return 'Good'
              } else if (value === round(averageRating * 0.375, 5)) {
                return 'Not Bad'
              } else if (value === averageRating * 0.125) {
                return 'Bad'
              }
              return ''
            }

          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            // formatter: function (value) {
            //   return Math.round(value * 1) + ''
            // },
            color: 'inherit'
          },
          data: [
            {
              value,
              name: 'Player Rating',
              fontWeight: 'bold'
            }
          ]
        }
      ]
    }

    option && myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [value, averageRating])

  return <div ref={chartRef} id={id} style={{ width: '100%', height: '100vh' }} />
}
