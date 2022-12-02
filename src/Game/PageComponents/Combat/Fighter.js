import React, { useContext, useState } from 'react';
import { Row, Col, Radio, Divider, Checkbox } from 'antd';
import Select from 'react-select';
import { fighters, angles } from '../../../Data/Options';
import GameContext from '../../GameContext';
import NoseCompartment from '../NoseCompartment';
import { useEffect } from 'react';

const Fighter = () => {
  const ctx = useContext(GameContext);
  const [type, setType] = useState(null);
  const [skill, setSkill] = useState('average');
  const [status, setStatus] = useState(null);
  const [angle, setAngle] = useState(null);
  const [level, setLevel] = useState(null);
  const [attacks, setAttack] = useState(null);
  const [selectedGun, setSelectedGun] = useState(null);

  const createGunList = () => {
    const bomber = ctx.bomber;
    const nose = ctx.nose;
    const pilotComp = ctx.pilotComp;
    let guns = [];
    switch (angle) {
      case '12:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable })
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable }, { name: 'Nose Gun', inoperable: nose.noseGun })
        }
        // if (level === 'low') {
        //   guns.push('Ball Turr.', 'Nose Gun')
        // }
        break;
      // case '1:30':
      //   if (level === 'high') {
      //     guns.push('Top Turr.', 'Right Wst.', 'Right Chk')
      //   }
      //   if (level === 'level') {
      //     guns.push('Top Turr.', 'Right Wst.', 'Right Chk', 'Nose Gun')
      //   }
      //   if (level === 'low') {
      //     guns.push('Ball Turr.', 'Top Turr.', 'Right Wst.', 'Right Chk', 'Nose Gun')
      //   }
      //   break;

      default:
        break;
    }
    return guns;
  }

  useEffect(() => {
    createGunList();
  }, [ctx.pilotComp])

  const onFighterChange = (e) => {
    const type = e.value
    setType(type);
  }

  const onAngleChange = (e) => {
    const angle = e.value
    setAngle(angle);
    console.log(angle);
  }

  const onLevelChange = (e) => {
    const level = e.target.value
    setLevel(level);
  }

  const onSkillChange = (e) => {
    const skill = e.target.value
    setSkill(skill);
  }

  const onStatusChange = (e) => {
    const status = e.target.value
    setStatus(status);
  }

  const onGunSelect = (e) => {
    const gun = e.target.value
    setSelectedGun(gun);
  }

  return <div style={{ width: 550, minWidth: 550, border: '1px solid black' }}>
    <Row gutter={[10, 5]} style={{ padding: 5 }}>
      <Col span={24}>
        <Select
          options={fighters}
          onChange={(e) => onFighterChange(e)}
        />
      </Col>
      <Col span={12}>
        <Select
          options={angles}
          onChange={(e) => onAngleChange(e)}
        />
      </Col>
      <Col span={12}>
        <Radio.Group name='level' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8 }} onChange={onLevelChange} value={level}>
          <Radio disabled={angle === 'Vertical Climb' || angle === 'Vertical Dive'} value={'high'}>High</Radio>
          <Radio disabled={angle === 'Vertical Climb' || angle === 'Vertical Dive'} value={'level'}>Level</Radio>
          <Radio disabled={angle === 'Vertical Climb' || angle === 'Vertical Dive'} value={'low'}>Low</Radio>
        </Radio.Group>
      </Col>
      <Col span={11} style={{ borderRight: '1px solid grey', paddingRight: 2 }}>
        <Radio.Group name='skill' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8 }} onChange={onSkillChange} value={skill} defaultValue='average'>
          <Radio value={'green'}>Green</Radio>
          <Radio value={'average'}>Average</Radio>
          <Radio value={'ace'}>Ace</Radio>
        </Radio.Group>
      </Col>
      <Col span={13}>
        <Radio.Group name='status' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8, paddingLeft: 8 }} onChange={onStatusChange} value={status} defaultValue='average'>
          <Radio value={'FCA'}>FCA</Radio>
          <Radio value={'2 FCA'}>2FCA</Radio>
          <Radio value={'FBOA'}>FBOA</Radio>
          <Radio value={'FCAB'}>FCAB</Radio>
        </Radio.Group>
      </Col>
    </Row>
    <Divider type='vertical' style={{ color: 'black' }} />
    <Row>
      <Col span={24}>Choose Bomber Gun</Col>
      <Col span={24}>
        <Radio.Group name='status' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8, paddingLeft: 8 }} onChange={onGunSelect} value={selectedGun}>
          {createGunList().map(g => <Radio disabled={g.inoperable} value={g.gun}>{g.gun}</Radio>)}
          {/* <Radio value={'FCA'}>FCA</Radio>
          <Radio value={'2 FCA'}>2FCA</Radio>
          <Radio value={'FBOA'}>FBOA</Radio>
          <Radio value={'FCAB'}>FCAB</Radio> */}
        </Radio.Group>
      </Col>
    </Row>
  </div>
}

export default Fighter;