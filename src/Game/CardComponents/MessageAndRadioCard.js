import React from 'react';
import { Radio } from 'antd';

const MessageAndRadioCard = (props) => {
  const {cardMessage, onRadioChange, goToNextCard, lastStep, nextStep, advance, radioDetails} = props;
  return <div>
    <div style={{ alignItems: 'center', fontSize: 16, fontWeight: 600 }}>
      {cardMessage && <p>{cardMessage}</p>}
    </div>
    <div style={{ alignItems: 'center', fontSize: 16, fontWeight: 600 }}>
      <p>Rolled Random Event?</p>
      <Radio.Group onChange={onRadioChange} value={goToNextCard}>
        <Radio value={true}><span style={{ fontWeight: goToNextCard === true ? 600 : 500 }}>Yes</span></Radio>
        <Radio value={false}><span style={{ fontWeight: goToNextCard === false ? 600 : 500 }}>No</span></Radio>
      </Radio.Group>
    </div>
    {/* <div>
      <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
      {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
    </div> */}
  </div>
}

export default MessageAndRadioCard;