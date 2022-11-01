import React, { useState } from 'react';
import { Tabs } from 'antd';
import GamePage from './GamePage';
import ZonesPage from './ZonesPage';
import Crew from './Crew';
import TablesReference from './TablesReference';
// import "antd/dist/antd.css";

const { TabPane } = Tabs;

const MainPage = () => {
  const [activeKey, setActiveKey] = useState('gamePage');

  const items = [
    {
      label: 'Game Page',
      key: 'gamePage',
      children: <GamePage />
    },
    {
      label: 'Zones Page',
      key: 'zonesPage',
      children: <ZonesPage />
    },
    {
      label: 'Bomber Crew',
      key: 'bomberCrew',
      children: <Crew />
    },
    {
      label: 'Tables Reference',
      key: 'tablesReference',
      children: <TablesReference />
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

export default MainPage;