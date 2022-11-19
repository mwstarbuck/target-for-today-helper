
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
    inputRequired: 'button'
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
    inputRequired: 'select'
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
    contingentUpon: 'B-24J',
    inputRequired: 'button'
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
    skipBack: 2,
    inputRequired: 'select'
  },
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
    inputRequired: 'select'
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
    inputRequired: 'button'

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
    inputRequired: 'button'
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
    actionType: 'tableCardZoneClick',
    cardTableDependency: 'campaign',
    modalTableDependency: null,
    //tableImageDependency: 'campaign',
    tableNotes: '2-13-note',
    cardTable: [{ table: '2-13-1', diceType: '1D10', title: 'Campaign 1 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-2', diceType: '1D10', title: 'Campaign 2 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-3', diceType: '1D10', title: 'Campaign 3 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-4', diceType: '1D10', title: 'Campaign 4 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-5', diceType: '1D10', title: 'Campaign 5 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-6', diceType: '1D10', title: 'Campaign 6 Table 2-13 Fighter Escort Level', note: '2-13-note' }],
    inputRequired: 'escort'
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
    inputRequired: 'none'
  },
  {
    id: 11,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Place the fire extinguishers in their box next to the bomber on the Crew Placement Sheet. Place the appropriate turret gunnery markers nearby.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
    actionType: 'none',
    inputRequired: 'none'

  },
  {
    id: 12,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Place the large bomber counter in the middle of the Battle Board combat area.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
    actionType: 'none',
    inputRequired: 'none'
  },
  {
    id: 13,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Lastly, place the small bomber counter on the Strategic Movement Track in Zone 1 facing toward the Designated Target Zone number. Thsnk place the target zone chit in the target zone on the same track.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
    actionType: 'none',
    inputRequired: 'none'
  },
  {
    id: 14,
    section: 'pre-mission',
    heading: 'Begin the Mission',
    instruction: 'You, as the pilot of your bomber have just left the briefing hut. You meet your crew, jump into a jeep and drive to the flight line where your crew chief has your bomber ready to go. You make the customary walk- around but you know you will find nothing wrong as your ground crew is top-notch. Boarding your bomber you go through the start-up check list. When the engines are purring smoothly and all the crew members check in on the intercom saying that everything is A-OK, you give the thumbs up to the Crew Chief who pulls the wheel chocks. You taxi out and join the other bombers on the taxiway waiting to takeoff. That comes quickly as bombers take off at 30 second intervals.',
    reference: null,
    additionalInfo: null,
    hasAction: true,
    actionType: 'none',
    inputRequired: 'none'
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
    inputRequired: 'none'
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
    inputRequired: 'none'
    // action: 'roll',
    // actionText: ''
  },
]

export const ZONES_PROCEDURE = [
  {
    id: 17,
    section: 'Movement in the Zones',
    heading: 'Movement to Next Zone',
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
    contingencyValue: 'outbound',
    nextCardTest: true,
    cardTestName: 'rollResistance',
    // contingentUpon: 'B-24J'
    // action: 'roll',
    // actionText: ''
  },
  //THis card only shows for zones it needs to rolled in
  {
    id: 18,
    section: 'Movement in the Zones',
    heading: 'Determine Fighter Escort',
    subHeading: 'Zones 2-5',
    instruction: 'Determine mission\'s fighter escort on Table 2-13 (1D10). Make note of the escort level for the current escort level zone range.',
    reference: 'Table 2-13',
    additionalInfo: null,
    hasAction: false,
    actionType: 'tableForCard',
    cardTableDependency: 'campaign',
    modalTableDependency: null,
    //tableImageDependency: 'campaign',
    tableNotes: '2-13-note',
    cardTable: [{ table: '2-13-1', diceType: '1D10', title: 'Campaign 1 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-2', diceType: '1D10', title: 'Campaign 2 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-3', diceType: '1D10', title: 'Campaign 3 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-4', diceType: '1D10', title: 'Campaign 4 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-5', diceType: '1D10', title: 'Campaign 5 Table 2-13 Fighter Escort Level', note: '2-13-note' }, { table: '2-13-6', diceType: '1D10', title: 'Campaign 6 Table 2-13 Fighter Escort Level', note: '2-13-note' }],
    inputRequired: 'escort'
  },
  // {
  //   id: 19,
  //   section: 'Movement in the Zones',
  //   heading: 'Reminders',
  //   subHeading: 'Set Variables reminder',
  //   instruction: 'Please be sure to set the escort level for the current campaign specific zone range.',
  //   // reference: 'Table 2-13',
  //   additionalInfo: null,
  //   hasAction: true,
  //   actionType: 'none',
  //   // actionType: 'tableForCard',
  //   // cardTableDependency: 'campaign',
  //   modalTableDependency: null,
  //   //tableImageDependency: 'campaign',
  //   skipBack: 2
  // },
  {
    id: 19,
    section: 'Movement in the Zones',
    heading: 'Weather in the Zone',
    instruction: 'Roll on Table 4-1 and select the result in the zone section',
    reference: 'Table 4-1 (1D10) & Table 4-1A if 100% cloud cover is rolled on table 4-1 and bomber is over Alps',
    // additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    actionType: 'tableModal',
    // tableImageDependency: 'none',
    modalTableDependency: null,
    modalTable: [{ table: '4-1', diceType: '1D10', title: '4-1 Weather in Zone', note: '4-1-note' }, { table: '4-1A', diceType: '1D10', title: '4-1A Weather Over Alps', note: '4-1A-note' },],
    actionText: 'See Table 4-1',
    diceType: '1D10',
    skipBack: 2,
    inputRequired: 'weather'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 20,
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
    contingentUpon: '100% clouds',
    inputRequired: 'none'
  },
  {
    id: 21,
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
    actionText: 'See Table 4-3',
    diceType: '1D10',
    skipBack: 2,
    inputRequired: 'none'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 22,
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
    inputRequired: 'contrails'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 23,
    section: 'Movement in the Zones',
    heading: 'Rejoin Formation',
    instruction: 'Roll 1D6 on Table 4-8',
    reference: 'Table 4-8 (1D6)',
    hasAction: false,
    actionType: 'tableForCard',
    tableImageDependency: null,
    modalTableDependency: null,
    cardTable: [{ table: '4-8', diceType: '1D6', title: '4-8 Rejoin Formation', note: '4-8-note' }],
    actionText: 'See Table 4-8',
    diceType: '1D10',
    inputRequired: 'none'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 24,
    section: 'Movement in the Zones',
    heading: 'Possible Enemy Resistance?',
    instruction: 'Read Instruction',
    reference: 'If the DRM value for zone is "N/A", you will now move to next zone.',
    hasAction: false,
    actionType: 'none',
    tableImageDependency: null,
    modalTableDependency: null,
    // cardTable: [{ table: '4-8', diceType: '1D6', title: '4-8 Rejoin Formation', note: '4-8-note' }],
    // actionText: 'See Table 4-8',
    // diceType: '1D10',
    nextCardTest: true,
    cardTestName: 'goCombatTest',
    // contingencyStep: true,
    contingencyValue: 'drm',
    contingentUpon: 'N/A',
    inputRequired: 'none'

    // action: 'roll',
    // actionText: ''
  },
]

export const COMBAT_PROCEDURE = [
  {
    id: 25,
    section: 'Combat',
    heading: 'German Fighter Resistance in Zone',
    instruction: 'Roll on Table 5-1',
    reference: 'Table 5-1 (1D10)',
    additionalInfo: ['Roll on Table 5-1 German Fighter Resistance Levels.',
      'Cross-index the campaign you are playing with the die roll.',
      'Record the resistance level on the Zone Worksheet.',
      'A result of “None” on Table 5-1 always means NO German fighters encountered this zone (do not roll on Tables 5-2 through 5-4.'],
    hasAction: false,
    actionType: 'tableForCard',
    tableImageDependency: null,
    modalTableDependency: null,
    cardTable: [{ table: '5-1', diceType: '1D10', title: '5-1 German Fighter Resistance in Zone', note: '5-1-note' }],
    actionText: 'See Table 5-1',
    diceType: '1D10',
    nextCardTest: true,
    cardTestName: 'resistance',
    inputRequired: 'resistance'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 26,
    section: 'Combat',
    heading: 'German Fighter Waves in Zone',
    instruction: 'Roll on Table 5-2',
    reference: 'Table 5-2 (1D10) Section 5.2 Rules pg. 14',
    additionalInfo: ['Roll on table 5-2 for the current zone', 'Mark number of waves in the zone worksheet'],
    hasAction: false,
    actionType: 'tableCardZoneClick',
    tableImageDependency: null,
    modalTableDependency: null,
    cardTable: [{ table: '5-2', diceType: '1D10', title: '5-2  Number of German Fighter Waves (Any Zone)', note: '5-2-note' }],
    // actionText: 'See Table 4-1',
    diceType: '1D10',
    inputRequired: 'waves'
    // nextCardTest: true,
    // cardTestName: 'waves'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 27,
    section: 'Combat',
    heading: 'Combat Summary',
    instruction: 'Roll on Table 5-2',
    reference: 'Table 5-2 (1D10) Section 5.2 Rules pg. 14',
    additionalInfo: ['Roll on table 5-2 for the current zone', 'Mark number of waves in the zone worksheet'],
    hasAction: false,
    actionType: 'combatStatus',
    tableImageDependency: null,
    modalTableDependency: null,
    cardTable: [{ table: '5-2', diceType: '1D10', title: '5-2  Number of German Fighter Waves (Any Zone)', note: '5-2-note' }],
    // actionText: 'See Table 4-1',
    diceType: '1D10',
    nextCardTest: true,
    cardTestName: 'waves',
    messageType: 'combatStatus',
    cardMessage: [
      { message: 'There is no combat for this zone (0 waves)', match: [0] },
      { message: 'Starting Fighter Wave 1', match: [1] },
      { message: 'Starting Fighter Wave 2', match: [2] },
      { message: 'Starting Fighter Wave 3', match: [3] },
      { message: 'Combat is Over for the current zone', match: ['done'] }],
    inputRequired: 'none',
    updateCombat: true
  },
  {
    id: 28,
    section: 'Combat',
    heading: 'German Fighter Number and Attack Angles',
    instruction: 'Roll on Table 5-3A,B or C',
    reference: 'Table 5-3, Section 5.3 game rules pg. 15.',
    additionalInfo: ['Roll 1D6 + 1D6 and cross reference the the resistance level rolled on 5-1.', 'Place fighteres in the clock position designated by the table.', 'If a random event or no attack is rolled, roll 1D6 per table notes to determine which option to take.'],
    hasAction: false,
    actionType: 'cardMessage&Radio',
    tableImageDependency: null,
    modalTableDependency: null,
    cardMessage: [{
      message: 'See Table 5-3A in the Tables Reference Tab', match: ['11/1942', '12/1942', '1/1943', '2/1943',
        '3/1943', '4/1943', '5/1943', '6/1943', '7/1943', '8/1943', '9/1943', '10/1943', '11/1943']
    },
    {
      message: 'See Table 5-3B in the Tables Reference Tab', match: ['12/1943', '1/1944', '2/1944', '3/1944',
        '4/1944', '5/1944', '6/1944', '7/1944', '8/1944', '9/1944', '10/1944', '11/1944']
    },
    { message: 'See Table 5-3C in the Tables Reference Tab', match: ['12/1944', '1/1945', '2/1945', '3/1945', '4/1945', '5/1945'] }],
    diceType: '1D6 + 1D6',
    nextCardTest: true,
    cardTestName: 'radioResult',
    messageType: 'fighterNumberTable',
    radioQuestion: 'Rolled Random Event?',
    radioDetails: [{ label: 'Yes', value: true }, { label: 'No', value: false },],
    inputRequired: 'radio'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 29,
    section: 'Combat',
    heading: 'Random Event!',
    instruction: 'Roll 2D6 on Table 5-3D',
    reference: 'Table 5-3D, rule section 5.3.1, pg. 15.',
    additionalInfo: ['Events rolled on this table take place in the next zone.', 'After determining event, move to the next zone.'],
    hasAction: false,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    // radioQuestion: 'Did you roll a random event?',
    // radioDetails: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    modalTable: [{ table: '5-3D', diceType: '2D6', title: '5-3D Random Event Table', note: '5-3D-note' }],
    actionText: 'See Table 5-3D',
    diceType: '2D6',
    nextCardTest: true,
    cardTestName: 'nextZone',
    inputRequired: 'none'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 30,
    section: 'Combat',
    heading: 'Roll for New Round Attack Levels and Angles',
    instruction: 'Roll on Table 5-9 & 5-9A for each elligible fighter',
    reference: 'Table 5-1 (1D10)',
    additionalInfo: ['Roll on Table 5-9 & 5-9A for each elligible fighter.',
      'Place fighteres in the clock position designated by the table.',
      'Do not roll on pilot skill level table.'],
    hasAction: false,
    actionType: 'tableForCard',
    tableImageDependency: null,
    modalTableDependency: null,
    cardTable: [{ table: '5-9s', diceType: '1D10', title: '5-9(A) 2nd & 3rd Attack Angles and Levels', note: null }],
    actionText: 'See Table 5-9(A)',
    diceType: '1D6',
    // nextCardTest: true,
    // cardTestName: 'resistance',
    inputRequired: 'none'
    // action: 'roll',
    // actionText: ''
  }, 
  {
    id: 31,
    section: 'Combat',
    heading: 'Number of Fighters Driven Off By Escort',
    instruction: 'Roll 2D6 on Table 5-4',
    reference: 'Table 5-4 (2D6), Rule section 5.4, pg. 14',
    additionalInfo: ['Determin how many fighters are driven off in each wave.', 'Do not roll on table if "no fighter escort was rolled non table 2-13', 'The first number is the number of fighters driven off in wave 1', 'The number in parentheses is the number drieven off in waves 2 and 3.', 'The player chooses the fighters to remove.', 'Fighters in vertical dive or jet fighters cnnot be removed.', 'Out of formation bomber recieves same level of escort as bombers in formation.'],
    hasAction: false,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-4', diceType: '2D6', title: '5-4 Number of Fighters Driven Off By Escort', note: '5-4-note' }],
    actionText: 'See Table 5-4',
    diceType: '2D6',
    skipBack: 2,
    inputRequired: 'none'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 32,
    section: 'Combat',
    heading: 'Bomber Defensive Fire',
    instruction: 'Determine Bomber defensive Fire allocation on table 5-5.',
    reference: 'See Table 5-5, Rule Section 5.5, pg.15',
    additionalInfo: ['Bomber fires first in all rounds', 'All results against fighters is asseses before German offensive combat begins.', 'On table 5-5 allocate defensive fire', 'More than one gun or turret can be targeted at the same fighter', 'The gun or turret must be operational to fire.', 'Each gun may only fire at one target per round', 'Place target markers next to the chosen target', 'Mark off ammunition box on the mission log sheet', 'Next, determine German fighter pilot skill on table 5-5A', 'Twin Gund: B-17 chin turret, ball turret, B-24 Nose turret', 'Powered Turrets: Chin (B-17G), Nose (B-24J), Top Turret and Ball Turret (All models of B17 and B-24) and tail guns (B-24). The Tail Guns (B17) are not powered.', 'See special rules section 5.5.2.1 for tail gunner passing shots, nose section guns and Area spray fire (optional).'],
    hasAction: false,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-5', diceType: null, title: 'Bomber Defensive Fire for Round', note: '5-5-note' }],
    actionText: 'See Table 5-5',
    diceType: null,
    inputRequired: 'none',
    nextCardTest: true,
    cardTestName: 'skillRoll',
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 33,
    section: 'Combat',
    heading: 'German Fighter Skill',
    instruction: 'Roll 1D6 on Table 5-5A for first round of combat only.',
    reference: 'Table 5-5A, game section 5.5.1, pg 16',
    additionalInfo: ['Only roll on table for first round of combat'],
    hasAction: false,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-5A', diceType: '1D6', title: '5-5A German Fighter Skill', note: '5-5A-note' }],
    actionText: 'See Table 5-5A',
    diceType: '1D6',
    inputRequired: 'none',
    // contingencyStep: true,
    // contingencyValue: 'round',
    // contingentUpon: 1,
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 34,
    section: 'Combat',
    heading: 'Bomber Defensive Fire',
    instruction: 'Roll on Table 5-6',
    reference: 'Rules section 5.5.3. Table 5-6 (2D6) & Table 5-6A (1D6) for spray fire.',
    additionalInfo: ['After each gun target marker has been placed, mark off 1 ammo for regular fire (3 ammo for spray fire).', 'Ammo maty be shifted from one gun to another by any crewman. See rule 5.5.3.', 'Roll on table 5-6 for each turret or gun.', '', '', ''],
    hasAction: false,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-6', diceType: '2D6', title: '5-6 Bomber Defensive Fire Resolution', note: '5-6-note' }, { table: '5-6A', diceType: '1D6', title: '5-6A Area Spray Fire Table (Optional)', note: '5-6A-note' }],
    actionText: 'See 5-6 & 5-6A',
    diceType: '1D10',
    inputRequired: 'none',
    skipBack: 2
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 35,
    section: 'Combat',
    heading: 'Hit Damage on German Fighters',
    instruction: 'Roll on Table 5-7',
    reference: 'Rules section 5.5.3. Table 5-7 (2D6) Tables 5.7',
    additionalInfo: ['After each funs target marker has been placed, mark off 1 ammo for regular fire (3 ammo for spray fire).', 'Ammo maty be shifted from one gun to another by any crewman. See rule 5.5.3.', 'Roll on table 5-6 for each turret or gun.', '', '', ''],
    hasAction: false,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-7', diceType: '2D6', title: '5-7 Hit Damage Against German Fighter', note: '5-7-note' }, { table: '5-7A', diceType: '2D6', title: '5-7A Fighter Damage for FCA and FBOA hits (optional)', note: '5-7A-note' }, { table: '5-7B', diceType: '2D6', title: '5-7B Hit Fighter Damage for Destroyed hits (optional)', note: '5-7B-note' }],
    actionText: 'See Tables 5-7(A-B)',
    diceType: '1D10',
    inputRequired: 'none'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 36,
    section: 'Combat',
    heading: 'Surviving Fighters?',
    instruction: 'Check the appropriate box',
    reference: 'Rules section 5.5.4',
    // additionalInfo: ['', '', '', '', ''],
    hasAction: false,
    actionType: 'yesOrNo',
    tableImageDependency: null,
    modalTableDependency: null,
    diceType: '1D10',
    nextCardTest: true,
    cardTestName: 'survivingFighters',
    radioQuestion: 'Surviving German Fighters?',
    radioDetails: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    inputRequired: 'radio'
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 37,
    section: 'Combat',
    heading: 'German Offensive Fire',
    instruction: 'Resolve possible hits on bomber.',
    reference: 'Rules section 5.6 Table 5-8',
    additionalInfo: ['', '', '', '', ''],
    hasAction: true,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-8', diceType: '2D6', title: '5-8 Hit Damage Against German Fighter', note: '5-8-note' },],
    actionText: 'See Table 5-8',
    diceType: '2D6',
    inputRequired: 'none',
    // nextCardTest: true,
    // cardTestName: 'survivingFighters',
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 38,
    section: 'Combat',
    heading: 'German Offensive Fighter Hits Rolled?',
    instruction: 'Check the appropriate box',
    reference: 'see section ?',
    // additionalInfo: ['', '', '', '', ''],
    hasAction: false,
    actionType: 'yesOrNo',
    tableImageDependency: null,
    modalTableDependency: null,
    // modalTable: [{ table: '5-7', diceType: '2D6', title: '5-7 Hit Damage Against German Fighter', note: '5-7-note' }, { table: '5-7A', diceType: '2D6', title: '5-7A Fighter Damage for FCA and FBOA hits (optional)', note: '5-7A-note' }, { table: '5-7B', diceType: '2D6', title: '5-7B Hit Fighter Damage for Destroyed hits (optional)', note: '5-7B-note' }],
    // actionText: 'See Table 4-1',
    diceType: '1D10',
    nextCardTest: true,
    cardTestName: 'hitsOnBomber',
    radioQuestion: 'Successful hits on Bomber?',
    radioDetails: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    inputRequired: 'radio',
    inputRequired: 'radio',
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 39,
    section: 'Combat',
    heading: 'Resolve Bomber Hits',
    instruction: 'Resolve shell hits by area of attack.',
    reference: 'Rules section 5.6 Table 5-10',
    additionalInfo: ['', '', '', '', ''],
    hasAction: true,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-10', diceType: '2D6', title: '5-10 Shell Hits By Area Of Attack', note: null },],
    actionText: 'See Table 5-10',
    diceType: '2D6',
    inputRequired: 'none',
  },
  {
    id: 40,
    section: 'Combat',
    heading: 'Resolve Bomber Hit Effect',
    instruction: 'Roll on hit effect multiplier table.',
    reference: 'Rules section 5.6 Table 5-11',
    additionalInfo: ['', '', '', '', ''],
    hasAction: true,
    actionType: 'tableModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-11', diceType: '1D6', title: '5-11 Hit Effect Multiplier', note: '5-11-note' },],
    actionText: 'See Table 5-11',
    diceType: '1D6',
    inputRequired: 'none',
  },
  //yes or no for actual damage move on to damage area tables?
  {
    id: 41,
    section: 'Combat',
    heading: 'Resolve Bomber Damage',
    instruction: 'Enter answer to question.',
    reference: 'Rules section 5.7',
    // additionalInfo: ['', '', '', '', ''],
    hasAction: true,
    actionType: 'damageModal',
    tableImageDependency: null,
    modalTableDependency: null,
    modalTable: [{ table: '5-8', diceType: '2D6', title: '5-10', note: '5-10-note' },],
    actionText: 'See Table 5-8',
    diceType: '2D6',
    inputRequired: 'none',
    nextCardTest: true,
    cardTestName: 'moreHits',
    radioQuestion: 'Need to resolve more hits to bomber?',
    radioDetails: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    inputRequired: 'radio'
  },
  {
    id: 42,
    section: 'Combat',
    heading: 'Abort Or Bail Out?',
    instruction: 'Confirm answer below',
    reference: 'Rules section 5.5.4',
    // additionalInfo: ['', '', '', '', ''],
    hasAction: false,
    actionType: 'yesOrNo',
    tableImageDependency: null,
    modalTableDependency: null,
    // diceType: '1D10',
    nextCardTest: true,
    cardTestName: 'abortOrBail',
    radioQuestion: 'Abort mission or bail out??',
    radioDetails: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    inputRequired: 'radio'
  },
]