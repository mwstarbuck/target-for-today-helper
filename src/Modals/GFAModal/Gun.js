import React, {useState, useEffect} from 'react';
import { Checkbox } from 'antd';

const Gun = ({key, fighter, onGunSelect, gun, waveData}) => {
  const [checked, setChecked] = useState();

  // useEffect(() => {
  //   setChecked(waveData[key].targetedBy.includes(gun.gun));
  // },[])

  return <Checkbox key={key} fighter={fighter} checked={checked} onChange={(e) => {onGunSelect(e); setChecked(!checked)}} disabled={gun.inoperable || gun.inUse} name={gun.gun}>{gun.gun}</Checkbox>
}

export default Gun;