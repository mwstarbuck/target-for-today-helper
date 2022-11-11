import React from 'react';

const ButtonActionCard = (props) => {
  const {params, actionText, outbound, setOutbound, lastStep, nextStep, action, setAdvance, advance} = props;
  return <>
    <button onClick={() => {
      action(params);
      setAdvance(true);
    }}
      className='card__button'>
      {actionText}
    </button>
    <button onClick={() => setOutbound(!outbound)}>test abort!</button>
    {/* <div>
      <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
      {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
    </div> */}
  </>
}

export default ButtonActionCard;