import React, { createContext } from 'react';
import { Modal } from 'antd';
import Select from 'react-select';

const drm = [
  { value: '"N/A"', label: '"N/A"' },
  { value: -2, label: -2 },
  { value: -1, label: -1 },
  { value: 0, label: 0 },
  { value: 1, label: 1 },
  { value: 2, label: 2 },
]

const location = [
  { value: 'Base', label: 'Base' },
  { value: 'W', label: 'W' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'Bu', label: 'Bu' },
  { value: 'C', label: 'C' },
  { value: 'Cz', label: 'Cz' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
  { value: 'Gr', label: 'Gr' },
  { value: 'H', label: 'H' },
  { value: 'I', label: 'I' },
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
  const { options, showZoneModal, setShowZoneModal, onSelect, zones, setZonesInfo } = props;

  let zonesData = [];
  for (let i = 0; i < zones; i++) {
    zonesData.push({zone: i + 1,
    targetZone: i === zones - 1 ? true : false})
  }

  const onInfoSelect = (e, i) => {
    console.log(e);
    const value = e.value
    zonesData[i.name].drm = value;
    if (i.name + 1 == zones) {
      zonesData[i.name].targetZone = true;
      console.log(zonesData);
    }
  }

  let zoneList = [];
  for (let i = 0; i < zones; i++) {
    zoneList.push(
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', padding: 2 }}>
        <div>
          {`Zone:${i + 1} DRM`}
          <Select
            key={i}
            options={drm}
            name={i}
            onChange={( e, i ) => onInfoSelect( e, i )}
          />
        </div>
        <div>
          {`Zone:${i + 1} Loaction`}
          <Select
            key={i}
            options={location}
            onChange={(e) => zonesData[i].location = e.value} />
        </div>
      </div>);
  }
  const handleOk = () => {

    setZonesInfo(zonesData);
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