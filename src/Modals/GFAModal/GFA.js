import React, { useContext } from 'react';
import { Modal, Popover, Divider, Row, Col, Steps } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import EnterGFNumber from './EnterGFNumber';

const GFA = (props) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal, source, opacity } = props;

  return <>
    <Row>
      <Col span={10}>
        <EnterGFNumber setShowModal={setShowModal} />
      </Col>
      <Col span={14}>
        {source.map((t, i) => (
          <div key={i}>
            <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>{t.title}</p>{t.diceType && <p style={{ fontSize: 16, fontWeight: 600 }}>(Roll {t.diceType})</p>}</div>
            <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>{t.title} Notes</div><img src={t.note} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
            <div style={{ alignItems: 'center' }}><img src={t.table} style={{ opacity: opacity || 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
            {i < source.length - 1 && < Divider />}
          </div>)
        )}
      </Col>
    </Row>
  </>
}

export default GFA;

