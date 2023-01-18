import React, {createContext, useContext, useState} from 'react';
import NumberAnglesAndLevels from './NumberAnglesAndLevels';
import { Steps, Button } from 'antd';
import GameContext from '../GameContext';
import { getNewFileHandle, saveToFile, writeFile, chooseFile } from '../../Utilities/UseFileSystem';

const Test = () => {
  const ctx = useContext(GameContext);

  //methods
  const onSave = async () => {

      const file = await saveToFile(ctx);
      console.log(file);
  }
  
  const onLoad = async () => {
    const fileHandle = await chooseFile();
    const file = await fileHandle.getFile();
    const fileContents = JSON.parse(await file.text());
    console.log(fileContents);
    // TODO all the context setting
  }
 
  // UI
  return <>
  <Button onClick={onSave}>Save</Button>
  <Button onClick={onLoad}>Load</Button>
    </>

}

export default Test;