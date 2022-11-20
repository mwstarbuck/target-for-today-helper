import React, { useState } from 'react';
import { Tabs } from 'antd';
import HitAndDamage from './HitAndDamage';

// import "antd/dist/antd.css";

const { TabPane } = Tabs;

const AreaDamageTabs = ({tables}) => {
  const [activeKey, setActiveKey] = useState('gamePage');

  const items = [
    {
      label: 'Nose',
      key: 'nose',
      children: <HitAndDamage table={tables[0]} /> //<div>Nose</div>
    },
    {
      label: 'Pilot Compartment',
      key: 'pilotCompartment',
      children: <HitAndDamage table={tables[1]} /> //<div>Pilot Compartment</div>
    },
    {
      label: 'Bomb Bay',
      key: 'bombBay',
      children: <HitAndDamage table={tables[2]} /> //<div>Bomb Bay</div>
    },
    {
      label: 'Radio Room',
      key: 'radioRoom',
      children: <HitAndDamage table={tables[3]} /> //<div>Radio Room</div>
    },
    {
      label: 'Waist',
      key: 'waist',
      children: <HitAndDamage table={tables[4]} /> //<div>Nose</div>
    },
    {
      label: 'Tail Section',
      key: 'tailSection',
      children: <HitAndDamage table={tables[5]} /> //<div>Tail Section</div>
    },
    {
      label: 'Wings',
      key: 'wings',
      children: <HitAndDamage table={tables[6]} /> //<div>Wings</div>
    },
    {
      label: 'Instruments',
      key: 'instruments',
      children: <HitAndDamage table={tables[7]} /> //<div>Instruments</div>
    },
    {
      label: 'Crew Wound',
      key: 'crewWound',
      children: <HitAndDamage table={tables[8]} /> //<div>Crew Wound</div>
    },
  ]

  const handleTabChange = (key) => {
    setActiveKey(key)
  }

  return <Tabs
    onTabClick={handleTabChange}
    activeKey={activeKey}
    destroyInactiveTabPane={true}
    type='card'
    tabPosition='left'
    items={items}
  />
}

export default AreaDamageTabs;