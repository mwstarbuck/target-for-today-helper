import React, { useContext, useState } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';
import Fighter from './Fighter';
const CombatComponent = () => {
  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Fighter />
  </div>
}

export default CombatComponent;