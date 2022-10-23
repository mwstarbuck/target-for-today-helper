import React, { createContext } from 'react';
import { Modal } from 'antd';
import tableImageEnum from '../Images/Tables/TableEnum';

const TableModal = (props) => {
  const {showModal, setShowModal, source} = props;
  
  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return <>
    <Modal
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel} 
      width={800}>
      <div style={{ alignItems: 'center' }}><img src={source} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
    </Modal>
  </>
}

export default TableModal;