import React, { useContext, useState } from 'react';
import { List, Button } from 'antd';
import { GameContext } from './GameContext';
import { GameTablesList } from '../Data/GameTablesReference';
import TableModal from '../Modals/TableModal';

const TablesReference = () => {
  const ctx = useContext(GameContext);
  const [showTableModal, setShowTableModal] = useState(false);

  let table;
  const setTable = (e) => {
    console.log(e);
    // table = {
    //   title: e.target
    // }
  }
  return <ul>
    {GameTablesList.map(t => <li><div value={t} onClick={setTable}>{t.table}</div></li>)}
    </ul>

    {/* <TableModal
      showModal={showTableModal}
      setShowModal={setShowTableModal}
      source={modalTableSrc}
      diceType={props.diceType}
    /> */}

}

export default TablesReference;