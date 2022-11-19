import React, { createContext } from 'react';
import { Modal, Divider, Popover } from 'antd';
import tableImageEnum from '../../Images/Tables/TableEnum';
import AreaHitTabs from '../DamageModal/AreaHitTabs';
import AreaDamageTabs from '../DamageModal/AreaDamageTabs';

const DamageModal = (props) => {
  const { showModal, setShowModal, source, opacity } = props;

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
      <AreaHitTabs />
      <Divider />
      <div><p style={{ fontSize: 19, fontWeight: 600 }}>Select and Roll for Damage to Area</p></div>
      <AreaDamageTabs />
    </Modal>
  </>
}

export default DamageModal;