import React from 'react';
import { Radio } from 'antd';

const YesOrNoCard = (props) => {
  const {cardMessage, onRadioChange, goToNextCard, radioDetails, radioQuestion} = props;
  return <div>
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
    {/* <div>
      <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
      {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
    </div> */}
  </div>
}

export default YesOrNoCard;