import React, { useContext, useState } from 'react';
import { Row, Col, Radio, Checkbox, Input } from 'antd';
import { GameContext } from './GameContext';

const Crew = () => {
  const ctx = useContext(GameContext);
  return <>
  {
    ctx?.crew && ctx.crew.map((c, i) => <p style={{ fontSize: 16 }} key={i}>{`${c.position}: 
          ${c.name}, Age: ${c.age}, State: ${c.state}, Status: ${c.status}`}</p>)
  }
  </>
}

export default Crew;