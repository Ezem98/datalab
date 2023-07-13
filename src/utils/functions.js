import { positionStatistics, statistics, colors } from '../constants/constants'

export const getPlayerStatisticsPerPosition = (position, player, color) => {
  if (!player) return null
  const labels = positionStatistics[position]
  const data = [{
    value: [],
    name: player?.name,
    lineStyle: {
      color: color === 'primary' ? colors.primary : colors.secondary
    },
    areaStyle: {
      color: color === 'primary' ? colors.primaryLight : colors.secondaryLight
    },
    itemStyle: {
      color: color === 'primary' ? colors.primary : colors.secondary
    }
  }]
  const indicator = []

  for (const label of labels) {
    data[0].value.push(player[label])
    indicator.push({ name: label })
  }

  return { indicator, data }
}

export const getUnusedStatistics = (alreadyInUse) => {
  alreadyInUse = alreadyInUse.map((item) => item?.name)

  const filteredPositionStatsArray = statistics.filter((item) => !alreadyInUse.includes(item)).map((string, index) => ({
    key: index,
    name: string
  }))

  return filteredPositionStatsArray
}

export const getValueByStat = (player, stat) => {
  return player[stat]
}
