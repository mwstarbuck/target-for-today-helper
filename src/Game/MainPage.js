import React, { useState } from 'react';
import { Tabs } from 'antd';
import GamePage from './GamePage';
import ZonesPage from './ZonesPage';
import Crew from './Crew';
import TablesReference from './TablesReference';
import Test from './Test/Test';
import SaveLoad from './SaveLoad';
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
    {
      label: 'Save & Load',
      key: 'saveLoad',
      children: <SaveLoad/>
    },
    {
      label: 'Test',
      key: 'test',
      children: <Test />
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