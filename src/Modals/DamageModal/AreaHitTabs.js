import React, { useState } from 'react';
import { Tabs } from 'antd';
import HitAndDamage from './HitAndDamage';
// import "antd/dist/antd.css";

const { TabPane } = Tabs;

const AreaHitTabs = () => {
  const [activeKey, setActiveKey] = useState('gamePage');

  const items = [
    {
      label: 'Attack from 10:30/12/1:30 O\'clock',
      key: 'tenTwelveOne',
      children: <div>Attack from 10:30 / 12 / 1:30 O'clock</div>
    },
    {
      label: 'Zones Attack from 9/3 O\'clock',
      key: 'nineThree',
      children: <div>Zones Attack from 9 / 3 O'clock</div>
    },
    {
      label: 'Attack From: 6 O\'clock',
      key: 'six',
      children: <div>Attack From: 6 O'clock</div>
    },
    {
      label: 'Vertical Dive and Climb Attacks',
      key: 'vdvc',
      children: <div>Vertical Dive and Climb Attacks</div>
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
    tabPosition='top'
    items={items}
  />
}

export default AreaHitTabs;