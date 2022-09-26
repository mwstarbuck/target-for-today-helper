import React from 'react';
import b17 from '../Images/b17.jpeg';

//#region test
// TODO: use result to match table entry
let engine = -1;
let weather = 3;
const modEnum = {
  'weather': weather, //ctx.weather
  'engine': engine
}

const add = (action, modifiers, table, ctx) => {
  let roll = action();
  console.log('roll:', roll);
  let result = modifiers?.forEach(m => roll += modEnum[m])
  console.log('result:', roll)
}
//#endregion

const Card = (props) => {
  // console.log(props.modifiers?.forEach(m => modEnum[m]));
  return <div className='card'>
    <div /*style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}*/>
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
      {props.hasAction && <button onClick={() => add(props.action, props.modifiers)} className='card__button'>{props.actionText}</button>}
    </div>
  </div>
}

export default Card;