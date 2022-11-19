import React, { useState } from 'react';
import { Tabs } from 'antd';
// import "antd/dist/antd.css";

const { TabPane } = Tabs;

const AreaDamageTabs = () => {
  const [activeKey, setActiveKey] = useState('gamePage');

  const items = [
    {
      label: 'Nose',
      key: 'nose',
      children: <div>Nose</div>
    },
    {
      label: 'Pilot Compartment',
      key: 'pilotCompartment',
      children: <div>Pilot Compartment</div>
    },
    {
      label: 'Bomb Bay',
      key: 'bombBay',
      children: <div>Bomb Bay</div>
    },
    {
      label: 'Radio Room',
      key: 'radioRoom',
      children: <div>Radio Room</div>
    },
    {
      label: 'Waist',
      key: 'waist',
      children: <div>Nose</div>
    },
    {
      label: 'Tail Section',
      key: 'tailSection',
      children: <div>Tail Section</div>
    },
    {
      label: 'Wings',
      key: 'wings',
      children: <div>Wings</div>
    },
    {
      label: 'Instruments',
      key: 'instruments',
      children: <div>Instruments</div>
    },
    {
      label: 'Crew Wound',
      key: 'crewWound',
      children: <div>Crew Wound</div>
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