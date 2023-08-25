'use client'

import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'
import { round } from 'lodash'
// import { colors } from '../../constants/constants'
export const NormalDistributionChart = ({
  id,
  data,
  metricValue,
  percentile,
  metricName,
  width,
  height
}) => {
  const chartRef = useRef(null)
  const colorsArea = [
    {
      offset: 0,
      color: '#18184b'
    },
    {
      offset: 0.2,
      color: '#51a9cb'
    },
    {
      offset: 0.4,
      color: '#fdd65d'
    },
    {
      offset: 0.6,
      color: '#dd7431'
    },
    {
      offset: 0.8,
      color: '#d4280a'
    },
    {
      offset: 1,
      color: '#720d15'
    }
  ]
  const metricOffset = (metricValue) / data[data.length - 1][0]
  const [metricColor, setMetricColor] = useState('')

  function hexToRgb (hex) {
    // Remover el símbolo '#' del comienzo si está presente
    hex = hex.replace(/^#/, '')

    // Separar el valor hex en componentes de color
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    // Devolver la representación RGB
    return [r, g, b]
  }
  function rgbToHex (r, g, b) {
    // Asegurarse de que los componentes de color estén en el rango correcto (0-255)
    r = Math.min(255, Math.max(0, r))
    g = Math.min(255, Math.max(0, g))
    b = Math.min(255, Math.max(0, b))

    // Convertir cada componente a formato hexadecimal
    const hexR = r.toString(16).padStart(2, '0')
    const hexG = g.toString(16).padStart(2, '0')
    const hexB = b.toString(16).padStart(2, '0')

    // Devolver el valor hexadecimal
    return `#${hexR}${hexG}${hexB}`
  }
  function interpolateColor (color1, color2, factor) {
    const result = []
    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(color1[i] + (factor * (color2[i] - color1[i])))
    }
    return result
  }

  useEffect(() => {
    if (colorsArea.length !== 0) {
      for (let i = 0; i < colorsArea.length; i++) {
        if (colorsArea[i].offset < metricOffset && metricOffset < colorsArea[i + 1].offset) {
          const result = interpolateColor(hexToRgb(colorsArea[i].color), hexToRgb(colorsArea[i + 1].color), (colorsArea[i].offset + colorsArea[i + 1].offset) / 2)
          setMetricColor(rgbToHex(result[0], result[1], result[2]))
        } else {
          if (colorsArea[i].offset <= metricOffset && !colorsArea[i + 1]) {
            setMetricColor('#720d15')
          }
        }
      }
    }
  }, [metricOffset])

  useEffect(() => {
    const myChart = echarts.init(chartRef.current)
    const option = {
      legend: {
        data: [metricName],
        textStyle: {
          fontWeight: 'bold'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: ''
        }
      },
      xAxis: {
        type: 'value',
        axisLine: { onZero: false },
        min: data[0][0],
        max: data[data.length - 1][0],
        splitNumber: 0,
        boundaryGap: false
      },
      series: [
        {
          name: metricName,
          type: 'line',
          smooth: true,
          data,
          areaStyle: {
            origin: 'end',
            opacity: 1,
            color: '#fff'
          },
          lineStyle: {
            width: 0
          },
          itemStyle: {
            opacity: 0
          },
          markPoint: {
            // Agrega el marcador
            symbol: 'triangle', // Símbolo del marcador (puedes ajustarlo según tus preferencias)
            symbolSize: 10, // Tamaño del marcador
            itemStyle: {
              // Cambia el color del marcador
              color: 'black' // Cambia el color a rojo, puedes ajustarlo según tus preferencias
            }
            // emphasis: {
            //   disabled: false
            // }
            // symbolOffset: ['0%', '50%']
            // data: [
            //   {
            //     // type: 'max',
            //     name: 'coordinate',
            //     coord: [0, -80]
            //   }
            // ]
          },
          markLine: {
            // Agrega el marcador
            symbol: 'none', // Símbolo del marcador (puedes ajustarlo según tus preferencias)
            symbolSize: 10, // Tamaño del marcador
            itemStyle: {
              // Cambia el color del marcador
              color: 'blue' // Cambia el color a rojo, puedes ajustarlo según tus preferencias
            },
            // emphasis: {
            //   disabled: false
            // }
            // symbolOffset: ['0%', '50%'],
            data: [
              {
                name: metricValue,
                // 'average', 'min', and 'max' are supported
                // type: 'x',
                xAxis: metricValue,
                lineStyle: {
                  color: 'black', // Color de la línea
                  width: 1.5
                },
                label: {
                  position: 'start',
                  distance: [0, 20],
                  fontWeight: 'bold',
                  fontSize: 14,
                  formatter: [
                    `{a|${metricValue}} {b|P}{c|${round(percentile * 100)}}`
                  ].join('\n'),
                  rich: {
                    a: {
                      color: 'black',
                      lineHeight: 10,
                      fontWeight: 'bold',
                      verticalAlign: 'top'
                    },
                    b: {
                      color: metricColor,
                      fontWeight: 'bold',
                      verticalAlign: 'top',
                      fontStyle: 'italic'
                    },
                    c: {
                      color: metricColor,
                      fontWeight: 'bold',
                      verticalAlign: 'bottom',
                      fontStyle: 'italic',
                      fontSize: 10

                    }
                  }
                }
              }
            ]
          },
          markArea: {
            silent: true,
            itemStyle: {
              color: 'transparent'
            },
            data: [
              [{
                xAxis: 'min',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(1, 1, 0, 1, [
                    {
                      offset: 1,
                      color: '#18184b'
                    },
                    {
                      offset: 0.8,
                      color: '#51a9cb'
                    },
                    {
                      offset: 0.6,
                      color: '#fdd65d'
                    },
                    {
                      offset: 0.4,
                      color: '#dd7431'
                    },
                    {
                      offset: 0.2,
                      color: '#d4280a'
                    },
                    {
                      offset: 0,
                      color: '#720d15'
                    }
                  ])
                }
              }, {
                xAxis: 'max'
              }],
              [{
                xAxis: metricValue,
                itemStyle: {
                  color: '#cccccc'
                }
              }, {
                xAxis: 'max'
              }]
            ]
          }
        }
      ]
    }

    option && myChart.setOption(option)

    return () => {
      myChart.dispose()
    }
  }, [data])

  return (
    <div ref={chartRef} id={id} style={{ width, height }} className='flex m-0 p-0 border rounded-lg' />
  )
}
