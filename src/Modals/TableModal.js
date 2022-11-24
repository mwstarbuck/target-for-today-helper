import React, { createContext } from 'react';
import { Modal, Divider, Popover } from 'antd';
import tableImageEnum from '../Images/Tables/TableEnum';

const TableModal = (props) => {
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
      {source.map((t, i) => (
        <div key={i}>
          <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>{t.title}</p>{t.diceType && <p style={{ fontSize: 16, fontWeight: 600 }}>(Roll {t.diceType})</p>}</div>
          <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>{t.title} Notes</div><img src={t.note} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
          <div style={{ alignItems: 'center' }}><img src={t.table} style={{ opacity: opacity || 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          {i < source.length - 1 && < Divider />}
        </div>)
      )}
    </Modal>
  </>
}

export default TableModal;