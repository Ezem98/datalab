export const colors = {
  primary: '#5ba176',
  primaryShadow: '#5ba176',
  primaryLight: '#5ba17650',
  primaryLightContrast: '#141414',
  secondary: '#e9aa45',
  secondaryLight: '#e9aa4550',
  tertiary: '#000000',
  quaternary: '#fafafa',
  quinary: '#141414'
}

export const columns = [
  {
    key: 'name',
    label: 'PLAYER NAME'
  },
  {
    key: 'club',
    label: 'CLUB'
  },
  {
    key: 'selectedPeriodClub',
    label: 'SELECTED PERIOD CLUB'
  },
  {
    key: 'age',
    label: 'AGE'
  },
  {
    key: 'position',
    label: 'POSITION'
  },
  {
    key: 'passesAccuracy(%)',
    label: 'SUCCESSFUL PASS (%)'
  },
  {
    key: 'thefts',
    label: 'THEFTS/90min'
  },
  {
    key: 'goalsPerMatch',
    label: 'GOALS PER MATCH'
  },
  {
    key: 'shootingAccuracy',
    label: 'SHOOTING ACCURACY (%)'
  }
]

export const positionStatistics = {
  GK: [
    'goalsConcededPerMatch',
    'xGAgainstPerMatch',
    'avoidedGoalsPerMatch',
    'counterAttacksPerMatch',
    'saves(%)',
    'longPassesPerMatch',
    'longPassesAccuracy(%)',
    'exitsPerMatch',
    'aerialDuelsPerMatch'
  ],
  RB: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'progressivePassesPerMatch',
    'progressivePassesAccuracy(%)',
    'interceptionsPerMatch',
    'crossesPerMatch',
    'crossesAccuracy(%)',
    'dribblesPerMatch',
    'successfulDribbles(%)',
    'successfulAttackingActionsPerMatch'
  ],
  LB: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'progressivePassesPerMatch',
    'progressivePassesAccuracy(%)',
    'interceptionsPerMatch',
    'crossesPerMatch',
    'crossesAccuracy(%)',
    'dribblesPerMatch',
    'successfulDribbles(%)',
    'successfulAttackingActionsPerMatch'
  ],
  RCB: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'progressivePassesPerMatch',
    'progressivePassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  LCB: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'progressivePassesPerMatch',
    'progressivePassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  CB: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'forwardPassesPerMatch',
    'forwardPassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  RDMF: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'forwardPassesPerMatch',
    'forwardPassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  DMF: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'forwardPassesPerMatch',
    'forwardPassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  LDMF: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'forwardPassesPerMatch',
    'forwardPassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  RCMF: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'forwardPassesPerMatch',
    'forwardPassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  CMF: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'forwardPassesPerMatch',
    'forwardPassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  LCMF: [
    'defensiveDuelsPerMatch',
    'defensiveDuelsWonPerMatch(%)',
    'aerialDuelsPerMatch',
    'aerialDuelsWonPerMatch(%)',
    'possessionWonAfterTackles',
    'interceptionsPerMatch',
    'foulsPerMatch',
    'yellowCardsPerMatch',
    'possessionWonAfterInterceptions',
    'forwardPassesPerMatch',
    'forwardPassesAccuracy(%)',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  RAMF: [
    'passesPerMatch',
    'passesAccuracy(%)',
    'xA/90',
    'secondAssistsPerMatch',
    'keyPassesPerMatch',
    'passesIntoFinalThirdPerMatch',
    'passesIntoFinalThirdAccuracy(%)',
    'throughBallsPerMatch',
    'throughBallsAccuracy(%)',
    'attackingDuelsPerMatch',
    'attackingDuelsWonPerMatch(%)',
    'dribblesPerMatch',
    'successfulDribbles(%)',
    'passesIntoPenaltyAreaPerMatch'
  ],
  AMF: [
    'passesPerMatch',
    'passesAccuracy(%)',
    'xA/90',
    'secondAssistsPerMatch',
    'keyPassesPerMatch',
    'passesIntoFinalThirdPerMatch',
    'passesIntoFinalThirdAccuracy(%)',
    'throughBallsPerMatch',
    'throughBallsAccuracy(%)',
    'attackingDuelsPerMatch',
    'attackingDuelsWonPerMatch(%)',
    'dribblesPerMatch',
    'successfulDribbles(%)',
    'passesIntoPenaltyAreaPerMatch'
  ],
  LAMF: [
    'passesPerMatch',
    'passesAccuracy(%)',
    'xA/90',
    'secondAssistsPerMatch',
    'keyPassesPerMatch',
    'passesIntoFinalThirdPerMatch',
    'passesIntoFinalThirdAccuracy(%)',
    'throughBallsPerMatch',
    'throughBallsAccuracy(%)',
    'attackingDuelsPerMatch',
    'attackingDuelsWonPerMatch(%)',
    'dribblesPerMatch',
    'successfulDribbles(%)',
    'passesIntoPenaltyAreaPerMatch'
  ],
  RWF: [
    'xA/90',
    'crossesPerMatch',
    'crossesAccuracy(%)',
    'dribblesPerMatch',
    'successfulDribbles(%)',
    'attackingDuelsPerMatch',
    'attackingDuelsWonPerMatch(%)',
    'touchesInThePenaltyAreaPerMatch',
    'progressiveRunsPerMatch',
    'deepProgressionsPerMatch',
    'passesIntoPenaltyAreaPerMatch',
    'passesIntoSixYardBoxAccuracy(%)',
    'passesIntoFinalThirdPerMatch',
    'passesIntoFinalThirdAccuracy(%)',
    'defensiveActionsPerMatch',
    'passesPerMatch',
    'passesAccuracy(%)'
  ],
  CF: [
    'touchesInThePenaltyAreaPerMatch',
    'backwardPassesPerMatch',
    'backwardPassesAccuracy(%)',
    'sidewaysPassesPerMatch',
    'sidewaysPassesAccuracy(%)',
    'attackingDuelsPerMatch',
    'attackingDuelsWonPerMatch(%)',
    'xG/90',
    'headedGoalsPerMatch',
    'shotsPerMatch',
    'goalsPerMatch',
    'xA/90',
    'shotsOnTargetAccuracy(%)',
    'goalsConversion(%)'
  ],
  LWF: [
    'xA/90',
    'crossesPerMatch',
    'crossesAccuracy(%)',
    'dribblesPerMatch',
    'successfulDribbles(%)',
    'attackingDuelsPerMatch',
    'attackingDuelsWonPerMatch(%)',
    'touchesInThePenaltyAreaPerMatch',
    'progressiveRunsPerMatch',
    'deepProgressionsPerMatch',
    'passesIntoPenaltyAreaPerMatch',
    'passesIntoSixYardBoxAccuracy(%)',
    'passesIntoFinalThirdPerMatch',
    'passesIntoFinalThirdAccuracy(%)',
    'defensiveActionsPerMatch',
    'passesPerMatch',
    'passesAccuracy(%)'
  ]
}

export const positions = Object.keys(positionStatistics)

export const statistics = [...new Set(Object.values(positionStatistics).flatMap((array) => array))]

export const flags = {
  Argentina: '/flags/argentina.svg',
  Bolivia: '/flags/bolivia.svg',
  Brasil: '/flags/brasil.svg',
  Chile: '/flags/chile.svg',
  Colombia: '/flags/colombia.svg',
  Ecuador: '/flags/ecuador.svg',
  Paraguay: '/flags/paraguay.svg',
  Perú: '/flags/peru.svg',
  Uruguay: '/flags/uruguay.svg',
  Venezuela: '/flags/venezuela.svg',
  Spain: '/flags/spain.svg'
}

export const weights = {
  goalsConcededPerMatch: 0.1,
  xGAgainstPerMatch: 0.15,
  avoidedGoalsPerMatch: 0.1,
  counterAttacksPerMatch: 0.1,
  saves: 0.15,
  longPassesPerMatch: 0.05,
  'longPassesAccuracy(%)': 0.05,
  exitsPerMatch: 0.05,
  aerialDuelsPerMatch: 0.1,
  defensiveDuelsPerMatch: 0.1,
  'defensiveDuelsWonPerMatch(%)': 0.1,
  'aerialDuelsWonPerMatch(%)': 0.1,
  possessionWonAfterTackles: 0.1,
  interceptionsPerMatch: 0.1,
  foulsPerMatch: 0.05,
  yellowCardsPerMatch: 0.05,
  possessionWonAfterInterceptions: 0.1,
  progressivePassesPerMatch: 0.1,
  'progressivePassesAccuracy(%)': 0.1,
  passesPerMatch: 0.1,
  'passesAccuracy(%)': 0.1,
  'xA/90': 0.15,
  'xG/90': 0.15,
  secondAssistsPerMatch: 0.1,
  keyPassesPerMatch: 0.1,
  passesIntoFinalThirdPerMatch: 0.1,
  'passesIntoFinalThirdAccuracy(%)': 0.1,
  throughBallsPerMatch: 0.15,
  'throughBallsAccuracy(%)': 0.1,
  attackingDuelsPerMatch: 0.1,
  'attackingDuelsWonPerMatch(%)': 0.1,
  dribblesPerMatch: 0.1,
  'successfulDribbles(%)': 0.1,
  passesIntoPenaltyAreaPerMatch: 0.15,
  touchesInThePenaltyAreaPerMatch: 0.1,
  progressiveRunsPerMatch: 0.1,
  deepProgressionsPerMatch: 0.1,
  'passesIntoSixYardBoxAccuracy(%)': 0.1,
  shotsPerMatch: 0.15,
  goalsPerMatch: 0.2,
  'shotsOnTargetAccuracy(%)': 0.15,
  'goalsConversion(%)': 0.15,
  headedGoalsPerMatch: 0.1,
  crossesPerMatch: 0.1,
  'crossesAccuracy(%)': 0.1,
  backwardPassesPerMatch: 0.05,
  'backwardPassesAccuracy(%)': 0.05,
  sidewaysPassesPerMatch: 0.05,
  'sidewaysPassesAccuracy(%)': 0.05,
  successfulAttackingActionsPerMatch: 0.1,
  forwardPassesPerMatch: 0.1,
  'forwardPassesAccuracy(%)': 0.15
}
