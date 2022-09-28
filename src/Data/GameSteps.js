
import { campaignRoll, rollDice, getResult } from "../Utilities/Utilities"
import { TABLE_2_1, TABLE_2_2 } from "./Tables"
import GameContext from "../Game/GameContext"

export const PRE_MISSION_STEPS = [
  {
    id: 1,
    section: 'pre-mission',
    heading: 'Campaign Selection',
    instruction: 'Decide what campaign time frame you wish to fly your mission or start your tour of duty in. You can start your tour of duty on any date you wish. Table 2-1 is found in the Target Listings and Gazetteer Handbook.',
    reference: 'Table 2-1, Target Listings and Gazetteer Handbook',
    additionalInfo: null,
    hasAction: true,
    action: 'processResult',
    actionText: 'Roll for Campaign',
    diceType: 'd6',
    maxValue: 6,
    table: 'table_2_1',
    setter: 'setCampaign'
  },
  {
    id: 2,
    section: 'pre-mission',
    heading: 'Campaign Selection',
    instruction: 'Lay out the game components. Decide which type of bomber you wish to fly and then select the appropriate Crew Placement Sheet and Mission Log Sheet for that bomber.',
    reference: 'Table 2-9 in the Game Tables Booklet',
    additionalInfo: ['If you choose the B-24J and you must choose the "B-24J Nose Turret Type" on Table 2-9 in the Game Tables Booklet', 'If you choose the B-17G there are options for the radio room gun. (See the optional rules section for the B-17G)'],
    hasAction: false,

  },
  {
    id: 3,
    section: 'pre-mission',
    heading: 'Select Bombing target',
    instruction: 'Select bombing target depending on the campaign in tables 2-2 through 2-7M found in the Target Listings and Gazetteer Handbook.',
    reference: 'tables 2-2 through 2-7M found in the Target Listings and Gazetteer Handbook',
    additionalInfo: null,
    hasAction: true,
    action: () => getResult(39, TABLE_2_2, 'd100'),
    actionText: 'Roll for Target',
    // modifiers: ['weather', 'engine']
  },
  {
    id: 4,
    section: 'pre-mission',
    heading: 'Determine Zones',
    instruction: 'Find the number of zones in the alphabetized Air Force Flight Log Gazetteer - Tables 2-8A (8th Air Force) and 2-8B (15th Air Force).',
    reference: 'Tables 2-8A (8th Air Force) and 2-8B (15th Air Force)',
    additionalInfo: ['W = Water, A = Albania, Au = Austria, B = Belgium, Bu = Bulgaria, C = Corsica, Cz = Czechoslovakia, E=England, F = France; G = Germany, Gr = Greece, H = Hungary, I = Italy, L=Luxembourg, N=Netherlands, No=Norway, P=Poland, R = Rumania, S=Switzerland, U = Ukraine, Y = Yugoslavia.', 'The number to the left of the slash is the modification, if any, to the roll on Table 5-1 when determining the actual German Fighter Resistance in the zone.  Before noting the target city\'s information in the zone boxes on the Mission Log Sheet, check Table 2 - 8C for modifications to the information.'],
    hasAction: false,
  },
  {
    id: 5,
    section: 'pre-mission',
    heading: 'Determine Formation Position',
    instruction: 'Determine formation position for your bomber on Table 2-10A and Table 2-10B',
    reference: 'Table 2-10A and Table 2-10B',
    additionalInfo: null,
    hasAction: false,
  },
  {
    id: 6,
    section: 'pre-mission',
    heading: 'Determine Fighter Escort',
    instruction: 'Determine mission\'s fighter escort on Table 2-13',
    reference: 'Table 2-13',
    additionalInfo: null,
    hasAction: false,
  },
  {
    id: 7,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Create crew members and place them on the crew placement board.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
  },
  {
    id: 8,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Place the fire extinguishers in their box next to the bomber on the Crew Placement Sheet. Place the appropriate turret gunnery markers nearby.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
  },
  {
    id: 9,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Place the large bomber counter in the middle of the Battle Board combat area.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
  },
  {
    id: 10,
    section: 'pre-mission',
    heading: 'Crew Placement Sheet and Battle Board',
    instruction: 'Lastly, place the small bomber counter on the Strategic Movement Track in Zone 1 facing toward the Designated Target Zone number.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
  }, {
    id: 11,
    section: 'pre-mission',
    heading: 'Begin the Mission',
    instruction: 'You, as the pilot of your bomber have just left the briefing hut. You meet your crew, jump into a jeep and drive to the flight line where your crew chief has your bomber ready to go. You make the customary walk- around but you know you will find nothing wrong as your ground crew is top-notch. Boarding your bomber you go through the start-up check list. When the engines are purring smoothly and all the crew members check in on the intercom saying that everything is A-OK, you give the thumbs up to the Crew Chief who pulls the wheel chocks. You taxi out and join the other bombers on the taxiway waiting to takeoff. That comes quickly as bombers take off at 30 second intervals.',
    reference: null,
    additionalInfo: null,
    hasAction: false,
  },
]

const TAKEOFF_PROCEDURE = [
  {
    id: 12,
    section: 'Takeoff Procedure',
    heading: 'Weather over base',
    instruction: 'Roll on Table 3-1',
    reference: 'Table 3-1 (1D10)',
    additionalInfo: ['If based in England, -2 modifier if mission flown in Jan, Feb or Dec and -1 modifier if mission flown in Mar, Apr, Oct or Nov', 'If based in Italy, +1 modifier if mission flown in May or Oct; +2 modifier if flown in Jun or Sep; +3 modifier if flown in Jul or Aug'],
    hasAction: false,
    // action: 'roll',
    // actionText: ''
  },
  {
    id: 13,
    section: 'Takeoff Procedure',
    heading: 'Take-Off',
    instruction: 'Roll on Table 3-2',
    reference: 'Table 3-2 (1D10) & Table 3-3 if possible engine malfunction',
    additionalInfo: ['If roll is 1, roll on Table 3-3', 'If roll is 2 and weather is poor over base there is a mid-air formation accident and you become formation lead (see section 4.7), otherwise takeoff is ok'],
    hasAction: false,
    // action: 'roll',
    // actionText: ''
  },
]