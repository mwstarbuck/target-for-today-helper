import React, { useState } from 'react';

const Fighter = () => {
  const [type, setType] = useState(null);
  const [skill, setSkill] = useState('average');
  const [status, setStatus] = useState(null);
  const [angle, setAngle] = useState();

  return <div>Fighter</div>
}

export default Fighter;