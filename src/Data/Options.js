const targetType = [
  { value: 'Airfield', label: 'AirField' },
  { value: 'Industry', label: 'Industry' },
  { value: 'Aircraft', label: 'Aircraft' },
  { value: 'U-Boats', label: 'U-Boats' },
  { value: 'Marshalling Yards', label: 'Marshalling Yards' },
  { value: 'Shipyards', label: 'Shipyards' },
  { value: 'Aircraft Factory', label: 'Aircraft Factory' },
  { value: 'Oil', label: 'Oil' },
  { value: 'Shipyard (includes U-boats)', label: 'Shipyard (includes U-boats)' },
  { value: 'V-Weapons', label: 'V-Weapons' },
  { value: 'Government', label: 'Government' },
  { value: 'Tactical Targets', label: 'Tactical Targets' },
  { value: 'Bridges', label: 'Bridges' },
  { value: 'Bridges (includes other chokepoints)', label: 'BrBridges (includes other chokepoints' },
]

export const zones = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
  { value: 15, label: 15 },
]

export const fighters = [
  { value: 'Me-109', label: 'Me-109', attacks: 3 },
  { value: 'Me-109 S', label: 'Me-109 S', attacks: 3 },
  { value: 'Me-110', label: 'Me-110', attacks: 2 },
  { value: 'Me-210', label: 'Me-210', attacks: 2 },
  { value: 'Me-410', label: 'Me-410', attacks: 2 },
  { value: 'Me-163', label: 'Me-163', attacks: 1 },
  { value: 'Me-262', label: 'Me-262', attacks: 3 },
  { value: 'Fw-190', label: 'Fw-190', attacks: 2 },
  { value: 'Fw-190 S', label: 'Fw-190 S', attacks: 3 },
  { value: 'He-162', label: 'He-162', attacks: 1 },
  { value: 'Ju-88', label: 'Ju-88', attacks: 2 }, 
  { value: 'Ta-152', label: 'Ta-152', attacks: 2 },
]

export const angles = [
  { value: '12:00', label: '12:00'},
  { value: '1:30', label: '1:30'},
  { value: '3:00', label: '3:00'},
  { value: '6:00', label: '6:00'},
  { value: '9:00', label: '9:00'},
  { value: '10:30', label: '10:30'},
  { value: 'Vertical Climb', label: 'Vertical Climb' },
  { value: 'Vertical Dive', label: 'Vertical Dive' },
]

export const optionsEnum = {
  'targetType': targetType,
  'zones': zones,
  'fighters': fighters
}