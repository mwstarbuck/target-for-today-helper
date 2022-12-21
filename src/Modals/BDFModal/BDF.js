import React, { useContext, useEffect, useState } from 'react';
import { Popover, Divider, Row, Col, Switch } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import BDFFighters from './BDFFighters';
import { makeMods } from '../../Utilities/ModUtility';

const BDF = (props) => {
  const gameCTX = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal, source, opacity } = props;
  const [checked, setChecked] = useState(true);
  const [cardMods, setCardMods] = useState(null);

  const mods = [{
    type: 'ifThen',
    info: [
      {
        this: combatCTX?.targetedFighter?.angle,
        thisValue: 'Vertical Dive',
        result: -3,
        message: '-3 for defensive fire against VERTICAL DIVE fighter position.'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'Me-163',
        result: -2,
        message: '-2 for defensive fire against Me-163 Rocket Fighter.'
      },
      {
        this: combatCTX?.targetedFighter?.skill,
        thisValue: 'ace',
        result: -1,
        message: '–1 for defensive fire versus Ace fighter pilot (See Table 5-5A)'
      },
      {
        this: 'evasive action', //TODO
        thisValue: true,
        result: -1,
        message: '–1 for defensive fire if bomber is performing “Evasive Action” (See Rules Section 5.9)'
      },
      {
        this: 'Nose Turret Hydraulics out', //TODO
        thisValue: true,
        result: -1,
        message: '–1 for defensive fire, Nose Turret (B-24J) if Nose Turret Hydraulics out (Table 4-3C note “p”)'
      },
    ],
  },
  {
    type: 'thisThenThat',
    info: [
      {
        this: (gameCTX.bomber === 'B-24D' || gameCTX.bomber === 'B-24J') ? gameCTX.TTRComp.comsOut : gameCTX?.systems.comsSysOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Top Turr', 'Ball Turr', 'Right Chk', 'Left Chk', 'Right Wst', 'Left Wst', 'Nose Gun', 'Chin Turr', 'Nose Turr', 'Radio Rm'],
        result: -2,
        message: '–2 for defensive fire if Intercom System out for all guns firing except Tail Guns (B-17)/Tail Turret (B-24)'
      },
      {
        this: gameCTX.pilotComp.tTurretPowerOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Top Turr'],
        result: -2,
        message: '–2 for defensive fire if Chin Turret (B-17G), Nose Turret (B-24J), Top Turret (B-17, B-24)/Ball Turret (B-17/B-24)Tail Turret(B- 24) Power failed(See Tables 4-3B, 4-3C)'
      },
      {
        this: gameCTX.TTRComp.tTurrPwrOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Top Turr'],
        result: -2,
        message: '–2 for defensive fire if Chin Turret (B-17G), Nose Turret (B-24J), Top Turret (B-17, B-24)/Ball Turret (B-17/B-24)Tail Turret(B- 24) Power failed(See Tables 4-3B, 4-3C)'
      },
      {
        this: gameCTX.waistComp.ballPwrOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Ball Turr'],
        result: -2,
        message: '–2 for defensive fire if Chin Turret (B-17G), Nose Turret (B-24J), Top Turret (B-17, B-24)/Ball Turret (B-17/B-24)Tail Turret(B- 24) Power failed(See Tables 4-3B, 4-3C)'
      },
      {
        this: gameCTX.nose.chinGunPwrOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Chin Turr'],
        result: -2,
        message: '–2 for defensive fire if Chin Turret (B-17G), Nose Turret (B-24J), Top Turret (B-17, B-24)/Ball Turret (B-17/B-24)Tail Turret(B- 24) Power failed(See Tables 4-3B, 4-3C)'
      },
      {
        this: gameCTX?.noseB24J?.emmerPowerOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Nose Turr'],
        result: -2,
        message: '–2 for defensive fire if Chin Turret (B-17G), Nose Turret (B-24J), Top Turret (B-17, B-24)/Ball Turret (B-17/B-24)Tail Turret(B- 24) Power failed(See Tables 4-3B, 4-3C)'
      },
      {
        this: gameCTX?.tailSection?.powerOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Tail Turr'],
        result: -2,
        message: '–2 for defensive fire if Chin Turret (B-17G), Nose Turret (B-24J), Top Turret (B-17, B-24)/Ball Turret (B-17/B-24)Tail Turret(B- 24) Power failed(See Tables 4-3B, 4-3C)'
      },
      {
        this: 'Electrical out', // TODO for Top turret, ball turret and Nose Turret Emerson
        thisValue: true,
        that: combatCTX?.activeGun,
        thatValue: ['Top Turr'],
        result: -1,
        message: '–1 for defensive fire if Nose Turret (B-24 Emerson turret)/Ball Turret/Top Turret if Electrical System out (Table 4-3C)'
      },
      {
        this: 'Auxillary hydraulic Tail compartment', // TODO
        thisValue: true,
        that: combatCTX?.activeGun,
        thatValue: ['Tail Turr'],
        result: -1,
        message: '–1 for defensive fire if Nose Turret (B-24 Emerson turret)/Ball Turret/Top Turret if Electrical System out (Table 4-3C)'
      },
      {
        this: 'Intercom System out of Systems', // TODO
        thisValue: true,
        that: combatCTX?.activeGun,
        thatValue: ['Tail Guns'],
        result: -1,
        message: '-1 for defensive fire by Tail Guns (B-17)/Tail Turret (B-24) if Intercom System out.'
      },    
    ]
  },
  // {
  //   type: 'ifThisAndThisThen',
  //   info: [
  //     {
  //       this: (gameCTX.bomber === 'B-24D' || gameCTX.bomber === 'B-24J') ? gameCTX.TTRComp.comsOut : gameCTX?.systems.comsSysOut,
  //       thisValue: ['B-24D'],
  //       andThis:
  //       that: combatCTX?.activeGun,
  //       thatValue: ['Top Turr', 'Ball Turr', 'Right Chk', 'Left Chk', 'Right Wst', 'Left Wst', 'Nose Gun', 'Chin Turr', 'Nose Turr', 'Radio Rm'],
  //       result: -2,
  //       message: '–2 for defensive fire if Intercom System out for all guns firing except Tail Guns (B-17)/Tail Turret (B-24)'
  //     },
  //   ]
  // }
]
/*
–1 for defensive fire if bomber is performing “Evasive Action” (See Rules Section 5.9)
–1 for defensive fire, Nose Turret (B-24J) if Nose Turret Hydraulics out (Table 4-3C note “p”)
–1 for defensive fire if Nose Turret (B-24 Emerson turret)/Ball Turret/Top Turret if Electrical System out (Table 4-
3C)
–1 for defensive fire Tail Turret (B-24) if Auxiliary Hydraulic System out (Table 4-3C)
-1 for defensive fire by Tail Guns (B-17)/Tail Turret (B-24) if Intercom System out.
–1 for defensive fire for Tail Guns (B-17)/ Tail Turret (B-24) “Passing Shot” against a fighter attacking from 10:30, 
12, or 1:30 positions (See Rules Section 5.5.2).
-1 Nose (affects Consolidated type turret only) turret defensive fire if #3 engine is out on B-24: 
-1 if the gunner is suffering from Frostbite
-1 for defensive fire against Me-262 and He-162 Jet Fighters.
+1 for defensive fire versus Green fighter pilot (See Table 5-5A)
+1 for defensive fire by bomber Ace gunner (5+ credited kills)
+1 for defensive fire versus Me-110, Me-210, Me-410, Ju88 C-6
+1 for defensive fire against 3 or 9 o’clock fighter attack positions (High/Level/Low).
+1 for defensive fire by a functioning power turret (electrical power, hydraulic)
+1 for defensive fire for Chin Turret (B-17G)/Nose Turret (B-24J)/Top Turret defensive fire against 12 o’clock level 
fighter position.
+2 for defensive fire against 6 o’clock fighter attack position (High/Level/Low).
+3 for defensive fire against VERTICAL CLIMB fighter position.
*/

  const BDFMods = (mods) => {
    let modDisplay = { result: 0, modList: [] };
    console.log(mods);
    mods?.forEach(mod => {
      switch (mod.type) {
        case 'thisThenThat':
          mod.info?.forEach(check => {
            if (check.this === check.thisValue) {
              if (check.thatValue.includes(check.that)) {
                modDisplay.modList.push(check.message);
                // const sum = modDisplay.result + check.result
                modDisplay.result +=check.result;
              }
            }
          });
          break;
        case 'ifThen':
          mod.info?.forEach(check => {
            if (check.this === check.thisValue) {
              modDisplay.modList.push(check.message);
              // const sum = modDisplay.result +=check.result
              modDisplay.result +=check.result;
            }
          })
          break;
        default:
          break;
      }
    });

    if (modDisplay.modList.length > 0) {
      return modDisplay;
    }
    else {
      modDisplay.reuslt = 'No modifiers for this table'
      return modDisplay;
    }
  }

  useEffect(() => {
      setCardMods(BDFMods(mods));
  }, [gameCTX, combatCTX.targetedFighter, combatCTX.activeGun]);

  const onChange = () => {
    setChecked(!checked);
  }

  return <>
    <Row>
      <Col span={12}>
        {/* Fighers go herer type, Skill, angle level */}
        {/* Radio to select Gun & radio to enter Status */}
        <BDFFighters />
      </Col>
      
      <Col span={12}>
        {/* Show table 5-6 use toggle to display spray fire table */}
        {/* Show cumulative modifiers here */}
        <Row>
        <Col span={12}>
        <Switch defaultChecked checked={checked} checkedChildren='Fire Table' unCheckedChildren='Spray Fire Table' onChange={onChange} />
        </Col>
        <Col span={12}>
        <Popover 
          color='white'
          trigger='click'
          overlayStyle={{ width: 500, border: '2 solid grey', opacity: 1 }}
          overlayInnerStyle={{ width: 500, border: '2 solid grey', opacity: 1 }}
          placement='bottom'
          content={<div><ul>{cardMods?.modList?.map(m => <li style={{ color: 'red' }}>{m}</li>)}</ul>
            <div>Roll Modifier: {cardMods?.result}</div>
          </div>}>
          Show Roll Modifiers
        </Popover>
        </Col>
        </Row>
        {checked ? <div key='regular'>
          <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-6 Bomber Defensive Fire Resolution</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 2D6)</p></div>
          <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>5-6 Bomber Defensive Fire Resolution Notes</div><img src={require('../../Images/TableNotes/5-6-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
          </Popover>
          <div style={{ alignItems: 'center' }}><img src={require('../../Images/Tables/5-6.png')} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
        </div>
          :
          <div key='spray'>
            <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-6A Area Spray Fire Table (Optional)</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 1D6)</p></div>
            <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>5-6A Area Spray Fire Table (Optional) Notes</div><img src={require('../../Images/TableNotes/5-6A-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
            <div style={{ alignItems: 'center' }}><img src={require('../../Images/Tables/5-6A.png')} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          </div>}
      </Col>
    </Row>
  </>
}

export default BDF;

