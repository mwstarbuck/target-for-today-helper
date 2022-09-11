import React from 'react';
import b17 from '../Images/b17.jpeg';

const Card = (props) => {
  return <div className='card'>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <img src={b17} style={{ opacity: 0.6, paddingTop: 30, paddingLeft: 75, paddingRight: 75 }} />
      <h2 style={{ marginBottom: -5 }}>{props.title}</h2>
      <p style={{ paddingLeft: '1rem', paddingRight: '1rem' }} >{props.description}</p>
      {props.additionalInfo &&
        <div style={{ fontSize: 14, margin: '1rem', border: '1px solid grey' }}>
          <h3>Additional Info:</h3>
          <ul style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            {props.additionalInfo.map(ai => <li>{ai}</li>)}
          </ul>
        </div>}
      <i style={{ fontSize: 14, marginBottom: props.hasAction ? 0 : 10 }}>{props.reference}</i>
      {props.hasAction && <button onClick={props.action} className='card__button'>{props.actionText}</button>}
    </div>
  </div>
}

export default Card;