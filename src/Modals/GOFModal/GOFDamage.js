import React, { createContext, useContext } from 'react';
import { Modal, Divider, Popover } from 'antd';
import tableImageEnum from '../../Images/Tables/TableEnum';
import AreaHitTabs from '../DamageModal/AreaHitTabs';
import AreaDamageTabs from '../DamageModal/AreaDamageTabs';
import { hitTables } from '../../Data/Tables';
import GameContext from '../../Game/GameContext';

const GOFDamage = () => {
  const ctx = useContext(GameContext);

  return <>
    <div><p style={{ fontSize: 19, fontWeight: 600 }}>Select and Roll for Area Hit</p></div>
    <AreaHitTabs tables={hitTables?.find(t => t.id === ctx.bomber).areaHitTables} />
    <Divider />
    <div><p style={{ fontSize: 19, fontWeight: 600 }}>Select and Roll for Damage to Area</p></div>
    <AreaDamageTabs tables={hitTables?.find(t => t.id === ctx.bomber).areaDamageTables} />
  </>
}

export default GOFDamage;