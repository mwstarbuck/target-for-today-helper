import React from 'react';
import { Radio } from 'antd';
import TableModal from '../../Modals/TableModal';

const TableModalAndInput = ({ cardMessage, onRadioChange, goToNextCard, radioDetails, radioQuestion, setShowModal, actionText }) => {
  return <>
    <button onClick={() => {
      setShowModal(true);
    }}
      className='card__button'>
      {actionText}
    </button>
    <div style={{ alignItems: 'center', fontSize: 16, fontWeight: 600 }}>
      {cardMessage && <p>{cardMessage}</p>}
    </div>
    <div style={{ alignItems: 'center', fontSize: 16, fontWeight: 600 }}>
      <p>{radioQuestion}</p>
      <Radio.Group onChange={onRadioChange} value={goToNextCard}>
        {radioDetails.map((rd, i) => <Radio
          key={i}
          value={rd.value}><span
            style={{ fontWeight: goToNextCard === true ? 600 : 500 }}>
            {rd.label}</span>
        </Radio>)}
      </Radio.Group>
    </div>
  </>
}

export default TableModalAndInput;