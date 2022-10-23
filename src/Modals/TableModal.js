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
      title={<h2>Tables Reference</h2>}
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel} 
      width={1000}
      style={{textAlign: 'center'}}>
      <div style={{ alignItems: 'center' }}><img src={source} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
    </Modal>
  </>
}

export default TableModal;