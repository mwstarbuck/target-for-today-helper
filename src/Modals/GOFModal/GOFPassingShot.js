import React, { useContext, useEffect, useState } from 'react';
import { Popover, Divider, Row, Col, Switch } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
// import BDFFighters from '../BDFModal/BDFFighters';
import PassingShotFighters from './PassingShotFighters'
import { makeMods } from '../../Utilities/ModUtility';

const GOFPassingShot = (props) => {
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
        this: combatCTX?.targetedFighter?.angle,
        thisValue: '3:00',
        result: 1,
        message: '+1 for defensive fire against 3 o’clock fighter attack positions (High/Level/Low)'
      },
      {
        this: combatCTX?.targetedFighter?.angle,
        thisValue: '9:00',
        result: 1,
        message: '+1 for defensive fire against 9 o’clock fighter attack positions (High/Level/Low)'
      },
      {
        this: combatCTX?.targetedFighter?.angle,
        thisValue: '6:00',
        result: 2,
        message: '+2 for defensive fire against 6 o’clock fighter attack position (High/Level/Low).'
      },
      {
        this: combatCTX?.targetedFighter?.angle,
        thisValue: 'Vertical Climb',
        result: 3,
        message: '+3 for defensive fire against VERTICAL CLIMB fighter position.'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'Me-262',
        result: -1,
        message: '-1 for defensive fire against Me-262 Jet Fighter.'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'He-162',
        result: -1,
        message: '-1 for defensive fire against He-162 Jet Fighter.'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'Me-163',
        result: -2,
        message: '-2 for defensive fire against Me-163 Rocket Fighter.'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'Me-110',
        result: 1,
        message: '+1 for defensive fire versus Me-110'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'Me-210',
        result: 1,
        message: '+1 for defensive fire versus Me-210'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'Me-410',
        result: 1,
        message: '+1 for defensive fire versus Me-410'
      },
      {
        this: combatCTX?.targetedFighter?.type,
        thisValue: 'Ju-88',
        result: 1,
        message: '+1 for defensive fire versus Ju88 C-6'
      },
      {
        this: combatCTX?.targetedFighter?.skill,
        thisValue: 'ace',
        result: -1,
        message: '–1 for defensive fire versus Ace fighter pilot (See Table 5-5A)'
      },
      {
        this: combatCTX?.targetedFighter?.skill,
        thisValue: 'green',
        result: 1,
        message: '+1 for defensive fire versus Green fighter pilot (See Table 5-5A)'
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
        this: gameCTX?.noseB24J?.conTurrHydrOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Nose Turr'],
        result: -1,
        message: '–1 for defensive fire, Nose Turret (B-24J) if Nose Turret Hydraulics out (Table 4-3C note “p”)'
      },
      {
        this: gameCTX?.noseB24J?.emmerElecOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Nose Turr'],
        result: -1,
        message: '–1 for defensive fire if Nose Turret (B-24 Emerson turret)/Ball Turret/Top Turret if Electrical System out (Table 4-3C)'
      },
      {
        this: gameCTX?.TTRComp?.tTurrElecOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Top Turr'],
        result: -1,
        message: '–1 for defensive fire if Nose Turret (B-24 Emerson turret)/Ball Turret/Top Turret if Electrical System out (Table 4-3C)'
      },
      {
        this: gameCTX?.waistComp?.ballElecOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Ball Turr'],
        result: -1,
        message: '–1 for defensive fire if Nose Turret (B-24 Emerson turret)/Ball Turret/Top Turret if Electrical System out (Table 4-3C)'
      },
      {
        this: gameCTX?.tailSection?.auxHydrOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Tail Turr'],
        result: -1,
        message: '–1 for defensive fire Tail Turret (B-24) if Auxiliary Hydraulic System out (Table 4-3C)'
      },
      {
        this: gameCTX?.systems?.comsSysOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Tail Guns'],
        result: -1,
        message: '-1 for defensive fire by Tail Guns (B-17) if Intercom System out.'
      },
      {
        this: gameCTX?.TTRComp?.comsOut,
        thisValue: true,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Tail Turr'],
        result: -1,
        message: '-1 for defensive fire by Tail Turret (B-24) if Intercom System out.'
      },
      {
        this: gameCTX?.noseB24J?.emmerElecOut,
        thisValue: false,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Nose Turr'],
        result: 1,
        message: '+1 for defensive fire by a functioning power turret (electrical power, hydraulic)'
      },
      {
        this: gameCTX?.noseB24J?.conTurrHydrOut,
        thisValue: false,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Nose Turr'],
        result: 1,
        message: '+1 for defensive fire by a functioning power turret (electrical power, hydraulic)'
      },
    ]
  },
  {
    type: 'thisAndThisThenThat',
    info: [
      {
        this: gameCTX?.waistComp?.ballElecOut,
        thisValue: false,
        andThis: gameCTX?.waistComp?.ballAuxHydrOut,
        andThisValue: false,
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Ball Turr'],
        result: 1,
        message: '+1 for defensive fire by a functioning power turret (electrical power, hydraulic)'
      },
      {
        this: gameCTX?.TTRComp?.tTurrElecOut,
        thisValue: false,
        andThis: gameCTX?.bomber,
        andThisValue: 'B-24D',
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Top Turr'],
        result: 1,
        message: '+1 for defensive fire by a functioning power turret (electrical power, hydraulic)'
      },
      {
        this: gameCTX?.TTRComp?.tTurrElecOut,
        thisValue: false,
        andThis: gameCTX?.bomber,
        andThisValue: 'B-24J',
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Top Turr'],
        result: 1,
        message: '+1 for defensive fire by a functioning power turret (electrical power, hydraulic)'
      },
      {
        this: gameCTX?.tailSection?.auxHydrOut,
        thisValue: false,
        andThis: gameCTX?.bomber,
        andThisValue: 'B-24D',
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Tail Turr'],
        result: 1,
        message: '+1 for defensive fire by a functioning power turret (electrical power, hydraulic)'
      },
      {
        this: gameCTX?.tailSection?.auxHydrOut,
        thisValue: false,
        andThis: gameCTX?.bomber,
        andThisValue: 'B-24J',
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Tail Turr'],
        result: 1,
        message: '+1 for defensive fire by a functioning power turret (electrical power, hydraulic)'
      },
      {
        this: combatCTX?.targetedFighter?.angle,
        thisValue: '12:00',
        andThis: combatCTX?.targetedFighter?.level,
        andThisValue: 'level',
        that: combatCTX?.activeGun?.gun,
        thatValue: ['Chin Turr', 'Nose Turr', 'Top Turr'],
        result: 1,
        message: '+1 for defensive fire for Chin Turret (B-17G)/Nose Turret (B-24J)/Top Turret defensive fire against 12 o’clock level fighter position.'
      },
    ]
  }
  ]
  /*
    X–1 for defensive fire, Nose Turret (B-24J) if Nose Turret Hydraulics out (Table 4-3C note “p”)
    X–1 for defensive fire if Nose Turret (B-24 Emerson turret)/Ball Turret/Top Turret if Electrical System out (Table 4-
    3C)
    X–1 for defensive fire Tail Turret (B-24) if Auxiliary Hydraulic System out (Table 4-3C)
    X-1 for defensive fire by Tail Guns (B-17)/Tail Turret (B-24) if Intercom System out.
    X-1 for defensive fire against Me-262 and He-162 Jet Fighters.
    X+1 for defensive fire versus Green fighter pilot (See Table 5-5A)
    X+1 for defensive fire versus Me-110, Me-210, Me-410, Ju88 C-6
    X+1 for defensive fire against 3 or 9 o’clock fighter attack positions (High/Level/Low).
    X+1 for defensive fire by a functioning power turret (electrical power, hydraulic)
    X+1 for defensive fire for Chin Turret (B-17G)/Nose Turret (B-24J)/Top Turret defensive fire against 12 o’clock level 
      fighter position.
    X+2 for defensive fire against 6 o’clock fighter attack position (High/Level/Low).
    X+3 for defensive fire against VERTICAL CLIMB fighter position.
    TODO
    –1 for defensive fire if bomber is performing “Evasive Action” (See Rules Section 5.9)
    –1 for defensive fire for Tail Guns (B-17)/ Tail Turret (B-24) “Passing Shot” against a fighter attacking from 10:30, 
      12, or 1:30 positions (See Rules Section 5.5.2).
    -1 Nose (affects Consolidated type turret only) turret defensive fire if #3 engine is out on B-24: 
    -1 if the gunner is suffering from Frostbite
    +1 for defensive fire by bomber Ace gunner (5+ credited kills)
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
                modDisplay.result += check.result;
              }
            }
          });
          break;
        case 'ifThen':
          mod.info?.forEach(check => {
            if (check.this === check.thisValue) {
              modDisplay.modList.push(check.message);
              modDisplay.result += check.result;
            }
          })
          break;
        case 'thisAndThisThenThat':
          mod.info?.forEach(check => {
            if (check.this === check.thisValue && check.andThis === check.andThisValue) {
              if (check.thatValue.includes(check.that)) {
                modDisplay.modList.push(check.message);
                modDisplay.result += check.result;
              }
            }
          })
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
        <PassingShotFighters fId={combatCTX?.targetedFighter?.id} />
      </Col>

      <Col span={12}>
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

export default GOFPassingShot;

