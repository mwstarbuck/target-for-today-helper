import React, { createContext } from 'react';
import { Modal, Divider, Popover } from 'antd';
import tableImageEnum from '../../Images/Tables/TableEnum';

const DanageModal = (props) => {
  const { showModal, setShowModal, source, opacity } = props;

  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  return <>
    <Modal
      title={<h2>Tables Reference</h2>}
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      style={{ textAlign: 'center' }}>
      {}
    </Modal>
  </>
}

export default TableModal;