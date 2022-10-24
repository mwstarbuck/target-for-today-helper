import React, { createContext } from 'react';
import { Modal } from 'antd';
import tableImageEnum from '../Images/Tables/TableEnum';

const TableModal = (props) => {
  const {showModal, setShowModal, source, diceType} = props;
  
  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  console.log(source);
  return <>
    <Modal
      title={<h2>Tables Reference</h2>}
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel} 
      width={1000}
      style={{textAlign: 'center'}}>
      {source.map(s => (
        <div> 
      <h2>{s.name}</h2>
        {s.diceType && <h3>Roll {s.diceType}</h3>}
        <div style={{ alignItems: 'center' }}><img src={s.table} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
        </div>)
      )}
      {/* {diceType && <h2>Roll {diceType}</h2>}
      <div style={{ alignItems: 'center' }}><img src={source} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div> */}
    </Modal>
  </>
}

export default TableModal;