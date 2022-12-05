import React, { useContext } from 'react';
import { Modal, Popover, Divider, Row, Col } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import EnterGFNumber from './EnterGFNumber';

const GFAModal = (props) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal, source, opacity } = props;

  // let zonesData = [];
  // for (let i = 0; i < zones; i++) {
  //   zonesData.push({
  //     zone: i + 1,
  //     targetZone: i === zones - 1 ? true : false
  //   })
  // }

  // const onInfoSelect = (e, i) => {
  //   const value = e.value
  //   zonesData[i.name].drm = value;
  //   if (i.name + 1 == zones) {
  //     zonesData[i.name].targetZone = true;
  //   }
  // }

  // let zoneList = [];
  // for (let i = 0; i < zones; i++) {
  //   zoneList.push(
  //     <div key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', padding: 2 }}>
  //       <div key={i}>
  //         {`Zone:${i + 1} DRM`}
  //         <Select
  //           key={`Zone:${i + 1} DRM`}
  //           options={drm}
  //           name={i}
  //           onChange={(e, i) => onInfoSelect(e, i)}
  //         />
  //       </div>
  //       <div>
  //         {`Zone:${i + 1} Loaction`}
  //         <Select
  //           key={`Zone:${i + 1} Loaction`}
  //           options={location}
  //           onChange={(e) => zonesData[i].location = e.value} />
  //       </div>
  //     </div>);
  // }
  const handleOk = () => {
    // setZonesInfo(zonesData);
    // ctx.setTargetZone(zonesData[zonesData.length - 1].zone);
    // combatCTX.setWaveData(waveData);
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return <>
    <Modal
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel} width={1500}>
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
    </Modal>
  </>
}

export default GFAModal;