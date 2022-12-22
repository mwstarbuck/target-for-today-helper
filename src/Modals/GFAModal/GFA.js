import React, { useContext } from 'react';
import { Modal, Popover, Divider, Row, Col, Steps } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import EnterGFNumber from './EnterGFNumber';
import EnterGFAnglesLevels from './EnterGFAngleAndLevel';
import { createGunList } from './GFHelpers';

const GFA = (props) => {
  const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal, source, opacity } = props;

  return <>
    <Row>
      <Col span={10}>
        {ctx.round === 1 ? <EnterGFNumber setShowModal={setShowModal} /> : 
          combatCTX.waveData?.map((f, i) => <EnterGFAnglesLevels key={f.id} number={i} waveData={combatCTX.waveData} setWaveData={combatCTX.setWaveData} />
        )}
      </Col>
      <Col span={14}>
        { ctx.round === 1 ? source.map((t, i) => (
          <div key={i}>
            <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>{t.title}</p>{t.diceType && <p style={{ fontSize: 16, fontWeight: 600 }}>(Roll {t.diceType})</p>}</div>
            <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>{t.title} Notes</div><img src={t.note} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
            <div style={{ alignItems: 'center' }}><img src={t.table} style={{ opacity: opacity || 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
            {i < source.length - 1 && < Divider />}
          </div>)
        ) :
          <div>
            <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-9(A) 2nd & 3rd Attack Angles and Levels</p>{<p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 1D6 On Each Table)</p>}</div>
            <div style={{ textAlign: 'center' }}><img src={require('../../Images/Tables/5-9s.png')} style={{ opacity: opacity || 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          </div>}
      </Col>
    </Row>
  </>
}

export default GFA;

