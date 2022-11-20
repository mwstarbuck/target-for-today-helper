import React, { createContext } from 'react';
import { Popover } from 'antd';
import tableImageEnum from '../../Images/Tables/TableEnum';
import tableNoteEnum from '../../Images/TableNotes/TableNoteEnum';
// import tableImageEnum from '../Images/Tables/TableEnum';

const HitAndDamage = ({ table, opacity }) => {
  return <>
    <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>{table.title}</p>{table.diceType && <p style={{ fontSize: 16, fontWeight: 600 }}>(Roll {table.diceType})</p>}</div>
    <Popover trigger='click' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>{table.title} Notes</div><img src={tableNoteEnum[table.note]} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
    </Popover>
    <div style={{ alignItems: 'center' }}><img src={tableImageEnum[table.table]} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
  </>
}

export default HitAndDamage;