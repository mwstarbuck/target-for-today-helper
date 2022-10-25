import React, { createContext } from 'react';
import { Modal, Divider } from 'antd';
import tableImageEnum from '../Images/Tables/TableEnum';

const TableModal = (props) => {
  const { showModal, setShowModal, source } = props;

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
      style={{ textAlign: 'center' }}>
      {source.map((t, i) => (
        <div>
          <div style={{ textAlign: 'center' }}><h3>{t.title}</h3>{t.diceType && <h4>(Roll {t.diceType})</h4>}</div>

          <div style={{ alignItems: 'center' }}><img src={t.table} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          {i < source.length - 1 && < Divider />}
        </div>)
      )}
    </Modal>
  </>
}

export default TableModal;