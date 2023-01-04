import React, {createContext, useContext, useState} from 'react';
import NumberAnglesAndLevels from './NumberAnglesAndLevels';
import { Steps, Button } from 'antd';
import GameContext from '../GameContext';




const Test = () => {
  const ctx = useContext(GameContext);

  const onSave = () => {
    const fileData = JSON.stringify(ctx, null, '\t');
    const blob = new Blob([fileData], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'tft-saves/tftsave01';
    link.href = url;
    link.click();
  }

  const onLoad = () => {
    const saveData = JSON.parse();
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.download = 'tft-saves/tftsave01';
    // link.href = url;
    // link.click();
  }
  
  return <>
  <Button onClick={onSave}>Save</Button>
  <Button onClick={onLoad}>Load</Button>
    </>

}

export default Test;