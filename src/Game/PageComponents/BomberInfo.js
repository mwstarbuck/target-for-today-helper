import React, { useContext } from 'react';
import {Row, Col, Avatar, Popover} from 'antd';
import b17f from '../../Images/b17f-test.png'
import GameContext from '../GameContext';
import NoseCompartment from './Compartments/NoseCompartment';
import NoseCompartmentB24J from './Compartments/NoseCompartmentB24J';

const BomberInfo = () => {
const ctx = useContext(GameContext);
  return <div>
    <img src={b17f} style={{ width: 700 }} />
    <Popover trigger='click' placement='left' content={ctx.bomber === 'B-24J' ? <NoseCompartmentB24J /> : <NoseCompartment />}>
            <div style={{ cursor: 'pointer', position: 'relative', top: '-520px', left: '380px', width: 100 }}>Nose ---</div>
    </Popover>
  </div>
}

export default BomberInfo;
