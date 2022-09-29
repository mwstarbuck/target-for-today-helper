import React, { useContext, useState } from 'react';
import b17 from '../Images/b17.jpeg';
import { actionEnum, contextEnum } from '../Utilities/Utilities';
import GameContext from './GameContext';
import Select from 'react-select';
import './GamePage.css'


//#region test
// TODO: use result to match table entry
let engine = -1;
let weather = 3;
const modEnum = {
  'weather': weather, //ctx.weather
  'engine': engine
}

// const add = (action, modifiers, table, ctx) => {
//   let roll = action();
//   console.log('roll:', roll);
//   let result = modifiers?.forEach(m => roll += modEnum[m])
//   console.log('result:', roll)
// }
//#endregion
const options = [{ value: 'poop', label: 'poop' }, { value: 'pee', label: 'pee' }]

const Card = (props) => {
  const ctx = useContext(GameContext);
  const [advance, setAdvance] = useState(false);

  const contextEnum = {
    'setCampaign': ctx.setCampaign,
    'setStep': ctx.setStep
  }

  const action = actionEnum[props.action];
  const stepInfo = {
    maxValue: props.maxValue,
    modifiers: props.modifiers,
    diceType: props.diceType,
    table: props.table,
    setter: contextEnum[props.setter]
  }

  const cardAction = <>
    {props.hasAction && props.actionType === 'roll' && <button onClick={() => action(stepInfo)} className='card__button'>{props.actionText}</button>}
    {/* {props.hasAction && props.actionType === 'select' &&
    <Select options={options}></Select>} */}
  </>

  const nextStep = () => {
    ctx.setStep(ctx.step + 1);
    setAdvance(false);
  }
  const lastStep = () => {
    if (ctx.step > 0) {
      if (ctx.step === 1) {
        ctx.setCampaign(null);
      }
      ctx.setStep(ctx.step - 1);
      setAdvance(false);
    }
  }
  const onSelect = (selection) => {
    // console.log(value);
    ctx.setBomber(selection.value);
    setAdvance(true);
  }

  return <div className='card'>
    <div>
      <img src={b17} style={{ opacity: 0.6, paddingTop: 30, paddingLeft: 75, paddingRight: 75 }} />
      <h2 style={{ marginBottom: -5 }}>{props.title}</h2>
      <p style={{ paddingLeft: '1rem', paddingRight: '1rem' }} >{props.description}</p>
      {props.additionalInfo &&
        <div style={{ fontSize: 14, margin: '1rem', border: '1px solid grey' }}>
          <h3>Additional Info:</h3>
          <ul style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            {props.additionalInfo.map((ai, i) => <li key={i}>{ai}</li>)}
          </ul>
        </div>}
      <i style={{ fontSize: 14, marginBottom: props.hasAction ? 0 : 10 }}>{props.reference}</i>
      {!props.isIncrement && props.actionType === 'roll' && <>
        <button onClick={() => {
          action(stepInfo);
          setAdvance(true);
        }}
          className='card__button'>
          {props.actionText}
        </button>
        <div>
          <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
          {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
        </div>
      </>
      }
      {!props.isIncrement && props.actionType === 'select' &&
        <><div className='selector'>
          <Select menuPlacement='top'
            options={ctx.campaign.aircraft}
            onChange={onSelect} />
        </div>
          <div>
            <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
            {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
          </div>
        </>
      }
      {/* {props.isIncrement && <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={() => lastStep()} className='card__goback'>Go Back</button>
        <button onClick={() => nextStep()} className='card__advance'>Next Step</button>
      </span>} */}
    </div>
  </div>
}

export default Card;