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
    key: 'successfulPass',
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
