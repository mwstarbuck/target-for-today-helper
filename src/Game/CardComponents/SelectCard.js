import React from 'react';
import Select from 'react-select';

const SelectCard = (props) => {
  const {selectRef, stepOptions, onSelect, selectValue, lastStep, nextStep, advance} = props;
  return <><div className='selector'>
    <Select ref={selectRef} menuPlacement='top'
      options={stepOptions}
      onChange={onSelect}
      value={selectValue}
    />
  </div>
    {/* <div>
      <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
      {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
    </div> */}
  </>
}

export default SelectCard;