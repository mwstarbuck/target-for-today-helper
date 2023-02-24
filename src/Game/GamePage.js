import React, { useState, useContext, useEffect } from 'react';
import { rollDice, nextStep } from '../Utilities/Utilities';
import { TABLE_2_1 } from '../Data/Tables';
import PreMissionInfo from './PreMissionInfo';
import { PRE_MISSION_STEPS } from '../Data/GameSteps';
import { actionEnum } from '../Utilities/Utilities';
import { GameContext } from './GameContext';
import { Row, Col, Popover, List, Avatar } from 'antd';
import Zone from './Zone';
import b17f from '../Images/b17f-test.png'
import NoseCompartment from './PageComponents/Compartments/NoseCompartment';
import NoseCompartmentB24J from './PageComponents/Compartments/NoseCompartmentB24J';
import PilotCompartment from './PageComponents/Compartments/PilotCompartment';
import WaistCompartment from './PageComponents/Compartments/WaistCompartment';
import TopTurretRadioCompartment from './PageComponents/Compartments/TopTurretRadioCompartment';
import BombBay from './PageComponents/Compartments/BombBay';
import RadioCompartment from './PageComponents/Compartments/RadioCompartment';
import TailSection from './PageComponents/Compartments/TailSection';
import ControlCables from './PageComponents/Compartments/ControlCables';
import LandingGear from './PageComponents/Compartments/LandingGear';
import Systems from './PageComponents/Compartments/Systems';
import CombatComponent from './PageComponents/Combat/CombatComponent';
import Fighter from './PageComponents/Combat/Fighter';
import BomberInfo from './PageComponents/BomberInfo';
import { rollCrew } from '../Utilities/Utilities';


const GamePage = () => {
  const ctx = useContext(GameContext);
  const [showRoller, setShowRoller] = useState(false);
  // const [step, setStep] = useState(0);
  const step = ctx.step;

  const jumpToStep = () => {

    ctx.setCampaign({
      id: 1,
      campaign: 1,
      timePeriod: '2/1943',
      aircraft: 'B-17F',
      base: '8th Airforce (England)',
      missions: 25,
      altMissions: null
    })
    ctx.setBomber('B-17F');
    ctx.setTimePeriod('2/1943');
    ctx.setTarget('Leone');
    ctx.setTargetType('Airfield');
    ctx.setCell('middle');
    ctx.setBomberNumber(3);
    ctx.setZones(5);
    rollCrew({bomber: ctx.bomber, setter: ctx.setCrew});
    ctx.setZonesInfo([{
      zone: 1,
      targetZone: false,
      drm: 'N/A',
      location: 'E'
    },
    {
      zone: 2,
      targetZone: false,
      drm: '-2',
      location: 'W'
    },
    {
      zone: 3,
      targetZone: false,
      drm: '-2',
      location: 'W'
    },
    {
      zone: 4,
      targetZone: false,
      drm: '-1',
      location: 'F'
    },
    {
      zone: 5,
      targetZone: true,
      drm: '0',
      location: 'F'
    }]);
    ctx.setCurrentZone(1);
    const zones = ctx.zonesInfo;
    for (const zone of zones) {
      if (zone.zone === ctx.currentZone) {
        zone.escort = 'fair';
        break;
      }
    }
    ctx.setTargetZone(5);
    ctx.setEscort('fair');
    ctx.setOutbound(true);
    ctx.setStep(17);
  }

  const reportDamage = (compartment) => {
    for (const property in compartment) {
      if (compartment[property])
        return true;
      }
      return false;
  }

  const nextStep = () => {
    ctx.setStep(ctx.step + 1);
  }
  const lastStep = () => {
    if (ctx.step > 0) {
      if (ctx.step === 1) {
        ctx.setCampaign(null);
      }
      ctx.setStep(ctx.step - 1);
    }
  }

  const handleRoll = () => {
    const result = rollDice(6);
    const campaign = (TABLE_2_1.find(c => c.id === result));
    ctx.setCampaign(campaign);
  }

  return <>
    <h1 style={{ opacity: 0.6, fontWeight: 600 }}>Target for Today Helper</h1>

    {ctx.step === 0 && <button style={{ fontFamily: 'Courier', opacity: 0.7 }} onClick={nextStep}>Start Game</button>}
    {ctx.step === 0 && <button style={{ fontFamily: 'Courier', opacity: 0.7 }} onClick={jumpToStep}>Test Game</button>}
    {ctx.step > 0 && <div className='row'>
      <div className='bigColumn'>
        Campaign Info
        {step >= 1 && ctx.campaign && <span style={{ opacity: 0.6 }}>
          <div style={{ width: 1175, minWidth: 1175 }}>
            <Row>
              <Col span={6}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Campaign</div></Col>
              <Col span={6}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Period</div></Col>
              <Col span={6}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Bomber</div></Col>
              <Col span={6}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Base</div></Col>

              <Col span={6}><div style={{ border: '1px solid black' }}>{ctx.campaign?.campaign}</div></Col>
              <Col span={6}><div style={{ border: '1px solid black' }}>{ctx?.timePeriod}</div></Col>
              <Col span={6}><div style={{ border: '1px solid black' }}>{ctx?.bomber}{ctx.noseTurret ? <span style={{ fontSize: 12 }}>{ctx?.bomber === 'B-24J' && `(${ctx?.noseTurret})`}</span> : null}</div></Col>
              <Col span={6}><div style={{ border: '1px solid black' }}>{ctx.campaign?.base}</div></Col>

              <Col span={6}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Target</div></Col>
              <Col span={9}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Target Type</div></Col>
              <Col span={7}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Position</div></Col>
              <Col span={2}><div style={{ backgroundColor: 'rgb(226, 212, 201)', border: '1px solid black', fontWeight: 700 }}>Missions</div></Col>

              <Col span={6}><div style={{ border: '1px solid black' }}>{ctx?.target}</div></Col>
              <Col span={9}><div style={{ border: '1px solid black' }}>{ctx?.targetType}</div></Col>
              <Col span={7}><div style={{ border: '1px solid black' }}>{ctx?.cell?.cell}, {ctx?.bomberNumber}</div></Col>
              <Col span={2}><div style={{ border: '1px solid black' }}>{ctx.campaign?.missions}</div></Col>
            </Row>
          </div>
          <br />
        </span>
        }
        {ctx.zonesInfo && <Zone />}
        {/* {ctx.zonesInfo && <img src={b17f} style={{ width: 700 }} />} */}
        {ctx.zonesInfo && <BomberInfo />}
        {ctx.zonesInfo && <List>
          <div style={{textAlign: 'left'}}>Compartment Status</div>
          <List.Item>
            <Popover trigger='click' placement='left' content={ctx.bomber === 'B-24J' ? <NoseCompartmentB24J /> : <NoseCompartment />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: 'green'}}>Nose</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Nose Compartment
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={<PilotCompartment />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: 'green' }}>Pilot</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Pilot Compartment
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={<WaistCompartment />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: 'green' }}>Waist</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Waist Compartment
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={(ctx?.bomber === 'B-24D' || ctx?.bomber === 'B-24J') ? <TopTurretRadioCompartment /> : <RadioCompartment />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: 'green' }}>{(ctx?.bomber === 'B-24D' || ctx?.bomber === 'B-24J') ? `TT & Radio` : `Radio`}</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    {(ctx?.bomber === 'B-24D' || ctx?.bomber === 'B-24J') ? `Top Turret & Radio Room` : `Radio Compartment`}
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={<BombBay />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: 'green' }}>Bomb Bay</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Bomb Bay
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={<TailSection />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: reportDamage(ctx.tailSection) ? 'red' : 'green' }}>Tail</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Tail Section
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={<ControlCables />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: reportDamage(ctx.controlCables) ? 'red' : 'green' }}>Cables</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Control Cables
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={<LandingGear />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: reportDamage(ctx.landingGear) ? 'red' : 'green' }}>LG</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Landing Gear
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
          <List.Item>
            <Popover trigger='click' placement='left' content={<Systems />}>
              <span style={{ cursor: 'pointer' }}>
                <Row gutter={[16, 16]}>
                  <Col span={4}>
                    <Avatar size='medium' shape='circle' style={{ backgroundColor: reportDamage(ctx.systems) ? 'red' : 'green' }}>Systems</Avatar>
                  </Col>
                  <Col span={20} style={{ paddingTop: 5 }}>
                    Systems
                  </Col>
                </Row>
              </span>
            </Popover>
          </List.Item>
        </List>}
        {/* {ctx.zonesInfo && <NoseCompartment />} */}
        {/* {ctx.zonesInfo && <PilotCompartment />} */}
        {/* <Fighter /> */}
      </div>
      <div className='column'>
        Game Step Helper
        {step >= 1 && <PreMissionInfo
          step={step} />}
      </div>
      {/* <div className='column'>Bomber Card
      </div> */}
    </div>}

  </>
}

export default GamePage;