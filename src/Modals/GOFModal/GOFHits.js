import React, { useContext, useState } from 'react';
import { Popover, Divider, Row, Col, Switch } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import GOFFighters from './GOFFighters';

const DamageTable = ({ title, noteTitle, table, note, diceType }) => {
  return <div>
    <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>{title}</p>{diceType && <p style={{ fontSize: 16, fontWeight: 600 }}>(Roll {diceType})</p>}</div>
    <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>{noteTitle} Notes</div><img src={note} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
    </Popover>
    <div style={{ alignItems: 'center' }}><img src={table} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
    {/* {i < source.length - 1 && < Divider />} */}
  </div>
}

const GOFHits = (props) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal, source, opacity } = props;
  const [checked, setChecked] = useState(true);

  const onChange = () => {
    setChecked(!checked);
  }

  return <>
    <Row>
      <Col span={11}>
        <GOFFighters fId={combatCTX?.targetedFighter?.id} />
      </Col>
      <Col span={13}>
        <Switch defaultChecked checked={checked} checkedChildren='DamageTable' unCheckedChildren='Detailed Damage' onChange={onChange} />
        {/* Show table 5-7 use toggle to display tables 5-7a-b */}
        {/* Show cumulative modifiers here */}
            <DamageTable
          title={'5-10 Shell Hits By Area Of Attack'}
              noteTitle={'5-10 Fighter Damage for FCA and FBOA hits Notes'}
              table={require('../../Images/Tables/5-10.png')}
              // note={require('../../Images/TableNotes/5-7A-note.png')}
              diceType={'2D6'} />
            < Divider />
            <DamageTable
          title={'5-11 Hit Effect Multiplier'}
          noteTitle={'5-11 Hit Effect Multiplier Notes'}
              table={require('../../Images/Tables/5-11.png')}
              note={require('../../Images/TableNotes/5-11-note.png')}
              diceType={'2D6'} />
      </Col>
    </Row>
  </>
}

export default GOFHits;

