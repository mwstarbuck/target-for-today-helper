
import { campaignRoll, rollDice, getResult } from "../Utilities/Utilities"
import { TABLE_2_1, TABLE_2_2 } from "./Tables"
import GameContext from "../Game/GameContext"

export const PRE_MISSION_STEPS = [
  {
    id: 1,
    section: 'pre-mission',
    heading: 'Campaign Roll',
    instruction: 'Decide what campaign time frame you wish to fly your mission or start your tour of duty in. You can start your tour of duty on any date you wish. Table 2-1 is found in the Target Listings and Gazetteer Handbook.',
    reference: 'Table 2-1, Target Listings and Gazetteer Handbook',
    additionalInfo: null,
    hasAction: true,
    actionType: 'roll',
    action: 'processResult',
    actionText: 'Roll for Campaign',
    diceType: 'd6',
    maxValue: 6,
    table: 'table_2_1',
    options: null,
    setter: { setterA: 'setCampaign' },//'setCampaign',
    contingencyStep: false,
  },
  {
    id: 2,
    section: 'pre-mission',
    heading: 'Select Bomber',
    instruction: 'Select your bomber from the dropdown Menu.',
    reference: 'Table 2-1, Target Listings and Gazetteer Handbook',
    additionalInfo: null,
    hasAction: true,
    actionType: 'select',
    action: 'submit',
    actionText: 'Select bomber.',
    diceType: null,
    maxValue: null,
    table: 'table_2_1',
    options: 'aircraft',
    setter: { setterA: 'setBomber' },
    contingencyStep: false,
  },
  {
    id: 3,
    section: 'pre-mission',
    heading: 'B-24J Nose Turret Type',
    instruction: 'Roll to Determin Nose Turret Type for the B-24J.',
    reference: 'Table 2-9, Target Listings and Gazetteer Handbook',
    additionalInfo: null,
    hasAction: true,
    actionType: 'roll',
    action: 'processResult',
    options: null,
    actionText: 'Roll for Nose Turret',
    diceType: 'd6-simple',
    maxValue: 6,
    table: 'table_2_9',
    setter: { setterA: 'setNoseTurret' },
    contingencyStep: true,
    contingencyValue: 'bomber',
    contingentUpon: 'B-24J'
  },
  {
    id: 4,
    section: 'pre-mission',
    heading: 'Select Time Period',
    instruction: 'Select the time period to start your mission or campaign from the dropdown Menu.',
    reference: 'Table 2-1, Target Listings and Gazetteer Handbook',
    additionalInfo: ['Selecting cetain months will add zone weather modifiers'],
    hasAction: true,
    actionType: 'select',
    action: 'submit',
    actionText: 'Select Time Period',
    diceType: null,
    maxValue: null,
    table: 'table_2_1',
    options: 'timePeriod',
    setter: { setterA: 'setTimePeriod' },
    contingencyStep: false,
    skipBack: 2
  },
  // {
  //   id: 5,
  //   section: 'pre-mission',
  //   heading: 'Roll for Crew',
  //   instruction: 'Roll for Crew memebers.',
  //   reference: 'Table 2-1, Target Listings and Gazetteer Handbook',
  //   additionalInfo: [],
  //   hasAction: true,
  //   actionType: 'roll',
  //   action: 'rollCrew',
  //   actionText: 'Roll for Crew',
  //   setter: { setterA: 'setCrew' },
  //   contingencyStep: false,
  // },
  {
    id: 5,
    section: 'pre-mission',
    heading: 'Target Selection  (Target Type)',
    instruction: 'Select bombing target type depending on the campaign in tables 2-2 through 2-7M depending on selected campaign.',
    reference: 'Tables 2-2 through 2-7M found in the Target Listings and Gazetteer Handbook',
    additionalInfo: null,
    hasAction: true,
    actionType: 'select',
    action: 'submit',
    actionText: 'Select Target Type',
    options: 'targetType',
    setter: { setterA: 'setTargetType' },
    contingencyStep: false,

    // modifiers: ['weather', 'engine']
  },
  {
    id: 6,
    section: 'pre-mission',
    heading: 'Target Selection (City)',
    instruction: 'Input bombing target (City) depending on the campaign in tables 2-2 through 2-7M depending on selected campaign.',
    reference: 'Tables 2-2 through 2-7M found in the Target Listings and Gazetteer Handbook',
    additionalInfo: null,
    hasAction: true,
    actionType: 'input',
    action: 'submit',
    actionText: 'Select Target City',
    // options: 'target_type',
    setter: { setterA: 'setTarget' },
    contingencyStep: false,

    // modifiers: ['weather', 'engine']
  },
  {
    id: 7,
    section: 'pre-mission',
    heading: 'Bomber Position in Formation',
    instruction: 'Determine formation position for your bomber on Table 2-10A and Table 2-10B',
    reference: 'Table 2-10A and Table 2-10B',
    additionalInfo: null,
    hasAction: true,
    actionType: 'roll',
    action: 'getBomberPosition',
    actionText: 'Bomber Positon Roll',
    setter: {
      setterA: 'setCell',
      setterB: 'setBomberNumber',
      setterC: 'setModifiers'
    },
    modifiers: 'modifiers',
    contingencyStep: false,

    // modifiers: ['weather', 'engine']
  },
  {
    id: 8,
    section: 'pre-mission',
    heading: 'Determine Zones',
    instruction: 'Find the number of zones in the alphabetized Air Force Flight Log Gazetteer - Tables 2-8A (8th Air Force) and 2-8B (15th Air Force).',
    reference: 'Tables 2-8A (8th Air Force) and 2-8B (15th Air Force)',
    additionalInfo: ['W = Water, A = Albania, Au = Austria, B = Belgium, Bu = Bulgaria, C = Corsica, Cz = Czechoslovakia, E = England, F = France; G = Germany, Gr = Greece, H = Hungary, I = Italy, L = Luxembourg, N = Netherlands, No = Norway, P = Poland, R = Rumania, S = Switzerland, U = Ukraine, Y = Yugoslavia.', 'The number to the left of the slash is the modification, if any, to the roll on Table 5-1 when determining the actual German Fighter Resistance in the zone.  Before noting the target city\'s information in the zone boxes on the Mission Log Sheet, check Table 2 - 8C for modifications to the information.'],
    hasAction: true,
    actionType: 'modal',
    action: 'submit',
    actionText: 'Set Zones',
    options: 'zones',
    setter: { setterA: 'setZones' },
    contingencyStep: false,
  },
  {
    id: 9,
    section: 'pre-mission',
    heading: 'Determine Fighter Escort',
    subHeading: 'Zones 2-5',
    instruction: 'Determine mission\'s fighter escort on Table 2-13 (1D10)',
    reference: 'Table 2-13',
    additionalInfo: null,
    hasAction: false,
    actionType: 'tableForCard',
    cardTableDependency: 'campaign',
    modalTableDependency: null,
    //tableImageDependency: 'campaign',
    tableNotes: '2-13-note',
    tableImage: [{ table: '2-13-1', diceType: '1D10', title: 'Campaign 1 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-2', diceType: '1D10', title: 'Campaign 2 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-3', diceType: '1D10', title: 'Campaign 3 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-4', diceType: '1D10', title: 'Campaign 4 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-5', diceType: '1D10', title: 'Campaign 5 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-6', diceType: '1D10', title: 'Campaign 6 Table 2-13 Fighter Escort Level', note: '2-13-note' }],
    cardTable: [{ table: '2-13-1', diceType: '1D10', title: 'Campaign 1 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-2', diceType: '1D10', title: 'Campaign 2 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-3', diceType: '1D10', title: 'Campaign 3 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-4', diceType: '1D10', title: 'Campaign 4 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-5', diceType: '1D10', title: 'Campaign 5 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-6', diceType: '1D10', title: 'Campaign 6 Table 2-13 Fighter Escort Level', note: '2-13-note' }]
  },
  {
    id: 10,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Create crew members by clicking below and place crew on the crew placement board.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
    actionType: 'roll',
    action: 'rollCrew',
    actionText: 'Roll for Crew',
    setter: { setterA: 'setCrew' },
    contingencyStep: false,
  },
  {
    id: 11,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Place the fire extinguishers in their box next to the bomber on the Crew Placement Sheet. Place the appropriate turret gunnery markers nearby.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
    actionType: 'none'
  },
  {
    id: 12,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Place the large bomber counter in the middle of the Battle Board combat area.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
    actionType: 'none'
  },
  {
    id: 13,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Lastly, place the small bomber counter on the Strategic Movement Track in Zone 1 facing toward the Designated Target Zone number. Thsnk place the target zone chit in the target zone on the same track.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
    actionType: 'none'
  },
  {
    id: 14,
    section: 'pre-mission',
    heading: 'Begin the Mission',
    instruction: 'You, as the pilot of your bomber have just left the briefing hut. You meet your crew, jump into a jeep and drive to the flight line where your crew chief has your bomber ready to go. You make the customary walk- around but you know you will find nothing wrong as your ground crew is top-notch. Boarding your bomber you go through the start-up check list. When the engines are purring smoothly and all the crew members check in on the intercom saying that everything is A-OK, you give the thumbs up to the Crew Chief who pulls the wheel chocks. You taxi out and join the other bombers on the taxiway waiting to takeoff. That comes quickly as bombers take off at 30 second intervals.',
    reference: null,
    additionalInfo: null,
    hasAction: true,
    actionType: 'none'
  },
]

export const TAKEOFF_PROCEDURE = [
  {
    id: 15,
    section: 'Takeoff Procedure',
    heading: 'Weather over base',
    instruction: 'Roll 1D10 on Table 3-1',
    reference: 'Table 3-1 (1D10)',
    additionalInfo: ['If based in England, -2 modifier if mission flown in Jan, Feb or Dec and -1 modifier if mission flown in Mar, Apr, Oct or Nov', 'If based in Italy, +1 modifier if mission flown in May or Oct; +2 modifier if flown in Jun or Sep; +3 modifier if flown in Jul or Aug'],
    hasAction: false,
    actionType: 'tableForCard',
    tableImageDependency: null,
    cardTableDependency: null,
    tableNotes: '3-1-note',
    tableImage: [{ table: '3-1', diceType: '1D10', title: 'Table 3-1 Weather Over Base (Take-Off and Landing)', note: '3-1-note' }],
    cardTable: [{ table: '3-1', diceType: '1D10', title: 'Table 3-1 Weather Over Base (Take-Off and Landing)', note: '3-1-note' }],
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 16,
    section: 'Takeoff Procedure',
    heading: 'Take-Off',
    instruction: 'Roll on Table 3-2',
    reference: 'Table 3-2 (1D10) & Table 3-3 if possible engine malfunction',
    additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    actionType: 'tableModal',
    // tableImageDependency: 'none',
    modalTableDependency: null,
    tableImage: [{ table: '3-2', diceType: '1D10', title: '3-2 Take-Off', note: '3-2-note' }, { table: '3-3', diceType: '1D6', title: '3-3 Bomber Crashes on Take-off', note: '3-3-note' }],
    modalTable: [{ table: '3-2', diceType: '1D10', title: '3-2 Take-Off', note: '3-2-note' }, { table: '3-3', diceType: '1D6', title: '3-3 Bomber Crashes on Take-off', note: '3-3-note' }],
    actionText: 'See Table Reference',
    // action: 'roll',
    // actionText: ''
  },
]

export const ZONES_PROCEDURE = [
  {
    id: 17,
    section: 'Movement in the Zones',
    heading: 'Movement',
    instruction: 'Click to move to next zone. Move your bomber on the tracker as well.',
    reference: 'Section 4.1',
    // additionalInfo: [],
    hasAction: true,
    actionType: 'click',
    action: 'zoneMovement',
    options: null,
    actionText: 'Move to next zone',
    // diceType: 'd6-simple',
    // maxValue: 6,
    // table: 'table_2_9',
    setter: { setterA: 'setCurrentZone' },
    contingencyStep: false,
    contingencyValue: 'direction',
    // contingentUpon: 'B-24J'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 18,
    section: 'Movement in the Zones',
    heading: 'Weather in the Zone',
    instruction: 'Roll on Table 4-1 and select the result in the zone section',
    reference: 'Table 4-1 (1D10) & Table 4-1A if 100% cloud cover is rolled on table 4-1 and bomber is over Alps',
    // additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    actionType: 'tableModal',
    // tableImageDependency: 'none',
    modalTableDependency: null,
    // tableImage: [{ table: '4-1', diceType: '1D10', title: '4-1 Weather in Zone', note: '4-1-note' }, { table: '4-1A', diceType: '1D10', title: '4-1A Weather Over Alps', note: '4-1A-note' },],
    modalTable: [{ table: '4-1', diceType: '1D10', title: '4-1 Weather in Zone', note: '4-1-note' }, { table: '4-1A', diceType: '1D10', title: '4-1A Weather Over Alps', note: '4-1A-note' },],
    actionText: 'See Table 4-1',
    diceType: '1D10',
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 19,
    section: 'Movement in the Zones',
    heading: 'Check for Mission Recall',
    instruction: 'Roll on Table 4-2 if weather in zone is 100% cloud cover',
    reference: 'Section 4.3 Table 4-2 (1D10 + 1D10)',
    // additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    actionType: 'tableForCard',
    // tableImageDependency: 'none',
    cardTableDependency: null,
    tableNotes: '4-2-note',
    // tableImage: [{ table: '4-2', diceType: '1D10 + 1D10', title: '4-2 Mission Recall', note: '4-2-note' }],
    cardTable: [{ table: '4-2', diceType: '1D10 + 1D10', title: '4-2 Mission Recall', note: '4-2-note' }],
    actionText: 'See Table 4-2',
    diceType: '1D10 + 1D10',
    contingencyStep: true,
    contingencyValue: 'weather',
    contingentUpon: '100% clouds'
  },
  {
    id: 20,
    section: 'Movement in the Zones',
    heading: 'Check for Mechanial Failure',
    instruction: 'Roll on Table 4-3A (1D10 + 1D10). If result is mechanical failure, roll on table 4-3B or 4-3C',
    reference: 'Table 4-3A (1D10 + 1D10)',
    // additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    actionType: 'cardModalCombo',
    tableImageDependency: null,
    cardTableDependency: null,
    modalTableDependency: 'aircraft',
    // tableImage: [{ table: '4-3A', diceType: '1D10', title: '4-3A Mechanical Failure' }, { table: '4-3B', diceType: '1D10', title: '4-3B Failed System' },],
    cardTable: [{ table: '4-3A', diceType: '1D10', title: '4-3A Mechanical Failure', note: '4-4-note' }],
    modalTable: [{ table: '4-3B', diceType: '1D10', title: '4-3B Failed System', note: '4-4-note', match: ['B-17F', 'B-17G', 'YB-40'] }, { table: '4-3C', diceType: '1D10', title: '4-3C Failed System', note: '4-4-note', match: ['B-24D', 'B-24J'] }],
    actionText: 'See Tablea 4-3A,B & C',
    diceType: '1D10',
    skipBack: 2
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 21,
    section: 'Movement in the Zones',
    heading: 'Contrails',
    instruction: 'Roll 1D10 on Table 4-4',
    reference: 'Table 4-4 (1D10)',
    // additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    actionType: 'tableForCard',
    tableImageDependency: null,
    cardTableDependency: null,
    tableImage: [{ table: '4-4', diceType: '1D10', title: '4-4 Contrails', note: '4-4-note' }],
    cardTable: [{ table: '4-4', diceType: '1D10', title: '4-4 Contrails', note: '4-4-note' }],
    actionText: 'See Table 4-1',
    diceType: '1D10',
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 22,
    section: 'Movement in the Zones',
    heading: 'Rejoin Formation',
    instruction: 'Roll 1D6 on Table 4-8',
    reference: 'Table 4-8 (1D6)',
    hasAction: false,
    actionType: 'tableForCard',
    tableImageDependency: null,
    modalTableDependency: null,
    cardTable: [{ table: '4-8', diceType: '1D6', title: '4-8 Rejoin Formation', note: '4-8-note' }],
    actionText: 'See Table 4-1',
    diceType: '1D10',
    // action: 'roll',
    // actionText: ''
  },
]

export const COMBAT_PROCEDURE = [
  {
    id: 23,
    section: 'Combat',
    heading: 'German Fighter Resistance in Zone',
    instruction: 'Roll on Table 5-1',
    reference: 'Table 5-1 (1D10) & Table 4-1A if 100% cloud cover is rolled on table 4-1 and bomber is over Alps',
    // additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-1', diceType: '1D10', title: '5-1 Weather in Zone' }, { table: '5-1', diceType: '1D10', title: '5-1 German Fighter Resistance in Zone', note: '5-1-note' }],
    actionText: 'See Table 4-1',
    diceType: '1D10',
    // action: 'roll',
    // actionText: ''
  },
]