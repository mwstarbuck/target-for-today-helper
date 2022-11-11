import React from 'react';
import { Popover } from 'antd';

const TableCard = (props) => {
  const { note, table } = props;
  return <div>
    <Popover trigger='click' content={<img src={note} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} />}>
      <a style={{ cursor: 'pointer' }}>See Table Notes</a>
    </Popover>
    <div style={{ alignItems: 'center' }}>
      <img src={table} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline' }} />
    </div>
  </div>
}

export default TableCard;