import React, { useState } from 'react';
import { fighters } from '../../../Data/Options';

const Fighter = () => {
  const [type, setType] = useState(null);
  const [skill, setSkill] = useState('average');
  const [status, setStatus] = useState(null);
  const [angle, setAngle] = useState(null);
  const [attacks, setAttack] = useState(null)

  return <div>Fighter</div>
}

export default Fighter;