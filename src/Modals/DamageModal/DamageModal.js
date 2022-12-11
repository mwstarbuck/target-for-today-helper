import React, { createContext } from 'react';
import { Modal, Divider, Popover } from 'antd';
import AreaHitTabs from '../DamageModal/AreaHitTabs';
import AreaDamageTabs from '../DamageModal/AreaDamageTabs';

const DamageModal = (props) => {
  const { showModal, setShowModal, hitTables, bomber } = props;

  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return <>
    <Modal
      title={<h2>Damage Modal</h2>}
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1200}
      style={{ textAlign: 'center' }}>
      <div><p style={{ fontSize: 19, fontWeight: 600 }}>Select and Roll for Area Hit</p></div>
      <AreaHitTabs tables={hitTables?.find(t => t.id === bomber).areaHitTables} />
      <Divider />
      <div><p style={{ fontSize: 19, fontWeight: 600 }}>Select and Roll for Damage to Area</p></div>
      <AreaDamageTabs tables={hitTables?.find(t => t.id === bomber).areaDamageTables} />
    </Modal>
  </>
}

export default DamageModal;