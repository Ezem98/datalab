import { positionStatistics, statistics, colors, weights } from '../constants/constants'
import { round } from 'lodash'

export const getPlayerStatisticsPerPosition = (position, player, color) => {
  console.log({ color })
  if (!player) return null
  const labels = positionStatistics[position]
  const data = [{
    value: [],
    name: player?.name,
    lineStyle: {
      color: colors[color] // color === 'primary' ? colors.primary : colors.secondary
    },
    areaStyle: {
      color: colors[`${colors}Light`] // color === 'primary' ? colors.primaryLight : colors.secondaryLight
    },
    itemStyle: {
      color: colors[color] // color === 'primary' ? colors.primary : colors.secondary
    }
  }]
  const indicator = []
  const statistics = []

  if (labels) {
    for (const label of labels) {
      data[0].value.push(player[label])
      indicator.push({ name: formatString(label) })
      statistics.push(label)
    }
  }

  return { indicator, data, statistics }
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

export const formatString = (str) => {
  // Reemplaza las letras mayúsculas con un espacio y la letra en minúscula
  str = str.replace(/([A-Z])/g, ' $1')
  // Reemplaza los espacios múltiples con un solo espacio
  str = str.replace(/\s+/g, ' ')
  // Elimina el espacio inicial si existe
  str = str.replace(/^\s/, '')
  // Convierte la primera letra en mayúscula
  str = str.charAt(0).toUpperCase() + str.slice(1)
  // Reemplaza "Per" con "per"
  str = str.replace('Per', 'per')
  return str
}

// Función para calcular la distancia de Levenshtein entre dos cadenas
const levenshtein = (a, b) => {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = []

  // Incrementa a lo largo de la primera columna de cada fila
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  // Incrementa a lo largo de la primera fila de cada columna
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // Rellena el resto de la matriz
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // sustitución
          Math.min(
            matrix[i][j - 1] + 1, // inserción
            matrix[i - 1][j] + 1
          )
        ) // eliminación
      }
    }
  }

  return matrix[b.length][a.length]
}

// Función para calcular la distancia entre dos jugadores
const calculateDistance = (player1, player2, relevantFeatures) => {
  let distance = 0
  for (const feature of relevantFeatures) {
    if (player1[feature]) {
      if (typeof player1[feature] === 'string') {
      // Calcula la distancia de Levenshtein entre las dos cadenas
        distance += levenshtein(player1[feature], player2[feature])
      } else {
        distance += Math.abs(player1[feature] - player2[feature])
      }
    }
  }
  return distance
}

// Función para obtener una lista de jugadores similares
export const getSimilarPlayers = (player, players, relevantFeatures) => {
  players = players.filter(p => p.name !== player.name)

  // Calcula la distancia entre el jugador objetivo y cada jugador en la base de datos
  const distances = players.map(p => ({
    player: p,
    distance: calculateDistance(player, p, relevantFeatures)
  }))

  // Ordena la lista de jugadores por su distancia al jugador objetivo
  distances.sort((a, b) => a.distance - b.distance)

  // Calcula la distancia máxima posible en el espacio de características
  const maxDistance = distances[distances.length - 1].distance

  // Agrega el porcentaje de similitud a cada jugador en la lista
  const similarPlayersWithPercentage = distances.map(d => ({
    player: d.player,
    similarityPercentage: ((maxDistance - d.distance) / maxDistance) * 100
  }))

  return similarPlayersWithPercentage
}

const calculateRating = (player, position) => {
  // see why it is executing many times
  const relevantFeatures = positionStatistics[position]

  if (!player || !player.position || !position) {
    return 0
  }

  const playerPositions = player.position.split(', ')

  if (!playerPositions.includes(position)) {
    return 0
  }

  let totalRating = 0

  for (const feature of relevantFeatures) {
    if (player[feature]) {
      totalRating += player[feature] * weights[feature]
    }
  }
  return totalRating
}

export const calculateAverageRating = (position, players, player) => {
  let playersAtPosition = players?.filter(p => p.position.includes(position))
  playersAtPosition = playersAtPosition?.filter(p => p.key !== player.key)
  let totalRating = 0

  const playerAverageRating = round(calculateRating(player, position), 2)

  for (const pAtP of playersAtPosition) {
    totalRating += round(calculateRating(pAtP, position), 2)
  }

  const averageRating = round(totalRating / playersAtPosition.length, 2)

  return { playerAverageRating, averageRating }
}

export const findIndexOfEmptyPosition = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === null || array[i] === undefined) {
      return i // Retorna el índice de la posición vacía
    }
  }
  return -1 // Si no se encuentra ninguna posición vacía, retorna -1
}
