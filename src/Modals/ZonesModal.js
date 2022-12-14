import React, { useContext } from 'react';
import { Modal } from 'antd';
import Select from 'react-select';
import GameContext from '../Game/GameContext';

const drm = [
  { value: 'N/A', label: 'N/A' },
  { value: -2, label: -2 },
  { value: -1, label: -1 },
  { value: 0, label: 0 },
  { value: 1, label: 1 },
  { value: 2, label: 2 },
]

const location = [
  { value: 'E', label: 'E' },
  { value: 'I', label: 'I' },
  { value: 'W', label: 'W' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'Bu', label: 'Bu' },
  { value: 'C', label: 'C' },
  { value: 'Cz', label: 'Cz' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
  { value: 'Gr', label: 'Gr' },
  { value: 'H', label: 'H' },
  { value: 'L', label: 'L' },
  { value: 'N', label: 'N' },
  { value: 'No', label: 'No' },
  { value: 'P', label: 'P' },
  { value: 'R', label: 'R' },
  { value: 'S', label: 'S' },
  { value: 'U', label: 'U' },
  { value: 'Y', label: 'Y' },
]

const ZonesModal = (props) => {
  const ctx = useContext(GameContext);
  const { options, showZoneModal, setShowZoneModal, onSelect, zones, setZonesInfo } = props;

  let zonesData = [];
  for (let i = 0; i < zones; i++) {
    zonesData.push({
      zone: i + 1,
      targetZone: i === zones - 1 ? true : false
    })
  }

  const onInfoSelect = (e, i) => {
    const value = e.value
    zonesData[i.name].drm = value;
    if (i.name + 1 == zones) {
      zonesData[i.name].targetZone = true;
    }
  }

  let zoneList = [];
  for (let i = 0; i < zones; i++) {
    zoneList.push(
      <div key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', padding: 2 }}>
        <div key={i}>
          {`Zone:${i + 1} DRM`}
          <Select
            key={`Zone:${i + 1} DRM`}
            options={drm}
            name={i}
            onChange={(e, i) => onInfoSelect(e, i)}
          />
        </div>
        <div>
          {`Zone:${i + 1} Loaction`}
          <Select
            key={`Zone:${i + 1} Loaction`}
            options={location}
            onChange={(e) => zonesData[i].location = e.value} />
        </div>
      </div>);
  }
  const handleOk = () => {
    setZonesInfo(zonesData);
    ctx.setTargetZone(zonesData[zonesData.length - 1].zone);
    setShowZoneModal(false);
  };
  const handleCancel = () => {
    setShowZoneModal(false);
  };
  return <>
    <Modal
      open={showZoneModal}
      onOk={handleOk}
      onCancel={handleCancel} width={400}>
      <Select options={options}
        onChange={onSelect} />
      Set DRM Location for Each Zone

      {zoneList?.length > 0 && zoneList.map(z => z)}
    </Modal>
  </>
}

export default ZonesModal;