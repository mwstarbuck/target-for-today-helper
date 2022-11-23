import React, { useContext, useState } from 'react';
import { List, Button } from 'antd';
import { GameContext } from './GameContext';
import { GameTablesList } from '../Data/GameTablesReference';
import TableModal from '../Modals/TableModal';
import tableImageEnum from '../Images/Tables/TableEnum';
import tableNoteEnum from '../Images/TableNotes/TableNoteEnum';

const TablesReference = () => {
  const ctx = useContext(GameContext);
  const [showTableModal, setShowTableModal] = useState(false);
  const [table, setTable] = useState([]);


  const setModal = (table) => {
    const displayTable = {
      title: table.table,
      diceType: table.diceType,
      table: tableImageEnum[table.table],
      note: tableNoteEnum[table.note]
    }
    setTable([displayTable]);
    setShowTableModal(true)
  }
  return <div style={{textAlign: 'left'}}>
  <ul>
    {GameTablesList.map(t => <li><a value={t} onClick={() => setModal(t)}>{t.table}</a></li>)}
    </ul>

    <TableModal
      showModal={showTableModal}
      setShowModal={setShowTableModal}
      source={table}
      opacity={1}
    />
  </div>

}

export default TablesReference;