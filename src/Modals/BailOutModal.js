import React, { createContext, useState } from 'react';
import { Modal, Switch, Row, Col, Popover } from 'antd';


const BailOutModal = (props) => {
  const { showModal, setShowModal, opacity } = props;
  const [checked, setChecked] = useState(true);

  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const onChange = () => {
    setChecked(!checked);
  }

  return <Modal
    title={<h2>Bail Out!</h2>}
    open={showModal}
    onOk={handleOk}
    onCancel={handleCancel}
    width={1000}
    style={{ textAlign: 'center' }}>
    <Row>
      <Col span={24}>
        <Switch defaultChecked checked={checked} checkedChildren='Controlled Bail Out' unCheckedChildren='Uncontrolled Bail Out' onChange={onChange} />
      </Col>
      {/* Controlled table 7-3 Ubcontrolled table 7-4 */}
      <Col span={24}> 
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        {checked ? <div key='regular'>
          <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-6 Bomber Defensive Fire Resolution</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 2D6)</p></div>
          <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>5-6 Bomber Defensive Fire Resolution Notes</div><img src={require('../Images/TableNotes/5-6-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
          </Popover>
          <div style={{ alignItems: 'center' }}><img src={require('../Images/Tables/5-6.png')} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
        </div>
          :
          <div key='spray'>
            <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-6A Area Spray Fire Table (Optional)</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 1D6)</p></div>
            <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>5-6A Area Spray Fire Table (Optional) Notes</div><img src={require('../Images/TableNotes/5-6A-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
            <div style={{ alignItems: 'center' }}><img src={require('../Images/Tables/5-6A.png')} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          </div>}
        </div>
      </Col>
    </Row>
  </Modal>
}

export default BailOutModal;