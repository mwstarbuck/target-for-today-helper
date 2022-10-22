import React, { useContext, useEffect, useState, useRef } from 'react';
import b17 from '../Images/b17.jpeg';
import { actionEnum } from '../Utilities/Utilities';
import GameContext from './GameContext';
import { tableEnum } from "../Data/Tables";
import { optionsEnum as options } from "../Data/Options";
import Select from 'react-select';
import './GamePage.css'
import { Popover, Modal } from 'antd';
import tableImageEnum from '../Images/Tables/TableEnum';
import ZonesModal from '../Modals/ZonesModal';

let engine = -1;
let weather = 3;
const modEnum = {
  'weather': weather, //ctx.weather
  'engine': engine
}

const Card = (props) => {
  const ctx = useContext(GameContext);
  const [advance, setAdvance] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [showMods, setShowMods] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);

  const selectRef = useRef();

  const contextEnum = {
    'setCampaign': ctx.setCampaign,
    'setStep': ctx.setStep,
    'setBomber': ctx.setBomber,
    'setTimePeriod': ctx.setTimePeriod,
    'setNoseTurret': ctx.setNoseTurret,
    'setCrew': ctx.setCrew,
    'setTargetType': ctx.setTargetType,
    'setTarget': ctx.setTarget,
    'setCell': ctx.setCell,
    'setBomberNumber': ctx.setBomberNumber,
    'setModifiers': ctx.setModifiers,
    'modifiers': ctx.modifiers,
    'setZones': ctx.setZones,
  }

  const optionsEnum = {
    'aircraft': ctx?.campaign?.aircraft,
    'timePeriod': ctx?.campaign?.timePeriod,
    'targetType': options['targetType'],
    'zones': options['zones']
  }

  const action = actionEnum[props.action];

  let methodInfo;
  switch (props.action) {
    case 'processResult':
      methodInfo = {
        maxValue: props.maxValue,
        modifiers: props.modifiers,
        diceType: props.diceType,
        table: props.table,
        setter: contextEnum[props.setter.setterA]
      }
      break;
    case 'rollCrew':
      methodInfo = contextEnum[props.setter.setterA]
      break;
    case 'getBomberPosition':
      methodInfo = {
        setCell: contextEnum[props.setter.setterA],
        setBomberNumber: contextEnum[props.setter.setterB],
        setModifiers: contextEnum[props.setter.setterC],
        modifiers: contextEnum[props.modifiers]
      }
      break;
    default:
      break;
  }
  const params = methodInfo;
  const stepOptions = props.options ? optionsEnum[props.options] : [];

  const cardAction = <>
    {props.hasAction && props.actionType === 'roll' && <button onClick={() => action(params)} className='card__button'>{props.actionText}</button>}
    {/* {props.hasAction && props.actionType === 'select' &&
    <Select options={options}></Select>} */}
  </>

  const nextStep = () => {
    ctx.setStep(ctx.step + 1);
    setAdvance(false);
    setSelectValue(null);
  }
  const lastStep = () => {
    if (ctx.step > 0) {
      if (ctx.step === 1) {
        ctx.setCampaign(null);
      }
      if (ctx.gameStep.skipBack) {
        ctx.setStep(ctx.step - ctx.gameStep.skipBack);
        if (props.setter) {
          for (const [key, value] of Object.entries(props.setter)) {
            contextEnum[value](null);
          }
        }
        setAdvance(false);
        setSelectValue(null);
      }
      else {
        if (props.setter) {
          for (const [key, value] of Object.entries(props.setter)) {
            contextEnum[value](null);
          }
        }
        // contextEnum[props.setter](null);
        ctx.setStep(ctx.step - 1);
        setAdvance(false);
        setSelectValue(null);
      }

    }
  }
  const onSelect = (selection) => {
    const setter = contextEnum[props.setter.setterA]
    setSelectValue(selection);
    setter(selection.value);
    setAdvance(true);
  }

  const onInput = (e) => {
    const input = e.target.value;
    setInputValue(input);
  }

  const onSubmit = () => {
    const setter = contextEnum[props.setter.setterA]
    setter(inputValue);
    setAdvance(true);
  }

  // console.log(ctx.campaign.campaign - 1)
  return <div className='card'>
    <Popover open={showMods}
      // zIndex={2000}
      color='white'
      trigger='click'
      overlayStyle={{ width: 300, border: '2 solid grey', opacity: 1 }}
      overlayInnerStyle={{ width: 300, border: '2 solid grey', opacity: 1 }}
      onOpenChange={() => setShowMods(!showMods)}
      placement='bottom'
      content={showMods && <div ><ul>{ctx?.modifiers?.map(m => <li style={{ color: 'red' }}>{m.modifier}</li>)}</ul></div>}>
      <button onClick={() => setShowMods(!showMods)}>Roll Mods</button>
    </Popover>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <img src={b17} style={{ opacity: 0.6, paddingTop: 30, paddingLeft: 75, paddingRight: 75 }} />
      <h2 style={{ marginBottom: -5 }}>{props.heading}</h2>
      {props.subHeading && <h3>{props.subHeading}</h3>}
      <p style={{ paddingLeft: '1rem', paddingRight: '1rem' }} >{props.description}</p>
      {props.tableImage && <div style={{ alignItems: 'center' }}><img src={tableImageEnum[props.tableImage[ctx.campaign?.campaign - 1]]} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline'}} /></div>}
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
          action(params);
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
          <Select ref={selectRef} menuPlacement='top'
            options={stepOptions}
            onChange={onSelect}
            value={selectValue}
          />
        </div>
          <div>
            <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
            {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
          </div>
        </>
      }
      {props.actionType === 'input' &&
        <><div className='input'>
          <input onChange={onInput} />
          <button onClick={() => {
            onSubmit();
          }}
            className='card__button'>
            {props.actionText}
          </button>
        </div>
          <div>
            <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
            {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
          </div>
        </>
      }
      {!props.isIncrement && props.actionType === 'modal' && <>
        <button onClick={() => {
          setShowZoneModal(true);
          // setAdvance(true);
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
      {props.actionType === 'none' &&
        <>
          <div>
            <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
            <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>
          </div>
        </>
      }
      {/* {props.isIncrement && <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={() => lastStep()} className='card__goback'>Go Back</button>
        <button onClick={() => nextStep()} className='card__advance'>Next Step</button>
      </span>} */}
    </div>
    <ZonesModal 
    onSelect={onSelect} 
    options={stepOptions} 
    showZoneModal={showZoneModal} 
    setShowZoneModal={setShowZoneModal} 
    zones={ctx.zones}
    setZonesInfo={ctx.setZonesInfo} />
  </div>
}

export default Card;