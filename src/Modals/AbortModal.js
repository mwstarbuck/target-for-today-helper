import React, { createContext } from 'react';
import { Modal } from 'antd';


const AbortModal = (props) => {
  const { showModal, setShowModal, setOutbound } = props;

  const handleOk = () => {
    setOutbound(false);
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  return <Modal
      title={<h2>Abort Mission</h2>}
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      style={{ textAlign: 'center' }}>
    <h3>Abort the current mission?</h3>    
    </Modal>
}

export default AbortModal;