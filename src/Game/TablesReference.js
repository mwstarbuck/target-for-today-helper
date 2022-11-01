import React, { useContext, useState } from 'react';
import { List, Button } from 'antd';
import { GameContext } from './GameContext';
import { GameTablesList } from '../Data/GameTablesReference';
import TableModal from '../Modals/TableModal';

const TablesReference = () => {
  const ctx = useContext(GameContext);
  const [showTableModal, setShowTableModal] = useState(false);
  const [table, setTable] = useState([]);


  const setModal = (table) => {
    console.log(table);
    setTable([table]);
    setShowTableModal(true)
  }
  return <>
  <ul>
    {GameTablesList.map(t => <li><a value={t} onClick={() => setModal(t)}>{t.table}</a></li>)}
    </ul>

    <TableModal
      showModal={showTableModal}
      setShowModal={setShowTableModal}
      source={table}
    />
  </>

}

export default TablesReference;