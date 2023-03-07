import React, { useState, useContext } from 'react';
import { Card } from 'antd';
import GameContext from '../GameContext';

const Test = () => {
  const ctx = useContext(GameContext);
  const crew = ctx?.crew;
  const manStations = (crew, location) => {
    let locList = [];
    crew.forEach(c => {
      if (c.location === location) {
        locList.push(c);
      }
    });
    return locList;
  }

  const [nose, setNose] = useState(manStations(crew, 'Nose'));
  const [pilot, setPilot] = useState(manStations(crew, 'Pilot'));
  const [radio, setRadio] = useState(manStations(crew, 'Radio'));
  const [waist, setWaist] = useState(manStations(crew, 'Waist'));
  const [tail, setTail] = useState(manStations(crew, 'Tail'));
  const [bomb, setBomb] = useState(manStations(crew, 'Bombs'));

  const DragStart = (event, card) => {
    //1. ORIGINAL 
    // event.dataTransfer.setData('card_id', card.id);

    // 2. TRANSFER 2 PROPERTIES
    // event.dataTransfer.setData('id', card.id);
    // event.dataTransfer.setData('location', card.location);

    //3. TRANSFER ENTIRE OBJECT USING JSON STRINGIFY
    const cardObj = JSON.stringify(card);
    event.dataTransfer.setData('card', cardObj);
  };

  const DragOver = (event) => {
    event.preventDefault();
  };

  // const getPrevLoc = (card_id, container) => {
  //   if (cards.some(c => c.id === card_id)){
  //     return cards.find((c) => c.id === card_id);
  //   }
  //   if (leftCards.some(c => c.id === card_id)) {
  //     if (container === 'left'){
  //       return;
  //     }
  //     return leftCards.find((c) => c.id === card_id);
  //   }
  //   if (rightCards.some(c => c.id === card_id)) {
  //     if (container === 'right') {
  //       return
  //     }
  //     return rightCards.find((c) => c.id === card_id);
  //   }
  //   if (nose.some(c => c.id === card_id)) {
  //     if (container === 'Nose') {
  //       return
  //     }
  //     return rightCards.find((c) => c.id === card_id);
  //   }
  // }

  const removeCrew = (crew) => {
    switch (crew.location) {
      case 'Nose':
        setNose(nose.filter(c => c.id !== crew.id));
        break;
      case 'Pilot':
        setPilot(pilot.filter(c => c.id !== crew.id));
        break;
      case 'Radio':
        setRadio(radio.filter(c => c.id !== crew.id));
        break;
      case 'Waist':
        setWaist(waist.filter(c => c.id !== crew.id));
        break;
      case 'Tail':
        setTail(tail.filter(c => c.id !== crew.id));
        break;
      case 'Bomb':
        setBomb(bomb.filter(c => c.id !== crew.id));
        break;
      default:
        break;
    }
  }

  const Drop = (event, container) => {
    // 1. GETTING ONE PROPERTY -- ORIGINAL
    // const card_id = event.dataTransfer.getData('card_id');

    //2.  JUST GET 2 PROPERTIES
    // const cardObj = {
    //   id: event.dataTransfer.getData('card_id'),
    //   prevLoc: event.dataTransfer.getData('location'),
    // }
  
    // 3. GETTING ENTIRE OBJECT
    const crew = JSON.parse(event.dataTransfer.getData('card'));

    if (container === 'Nose' && container !== crew.location) {
      removeCrew(crew);
      crew.location = 'Nose';
      setNose([...nose, crew]);
    }
    if (container === 'Pilot' && container !== crew.location) {
      removeCrew(crew);
      crew.location = 'Pilot';
      setPilot([...pilot, crew]);
    }
    if (container === 'Radio' && container !== crew.location) {
      removeCrew(crew);
      crew.location = 'Radio';
      setRadio([...radio, crew]);
    }
    if (container === 'Waist' && container !== crew.location) {
      removeCrew(crew);
      crew.location = 'Waist';
      setWaist([...waist, crew]);
    }
    if (container === 'Tail' && container !== crew.location) {
      removeCrew(crew);
      crew.location = 'Tail';
      setTail([...tail, crew]);
    }
    if (container === 'Bomb' && container !== crew.location) {
      removeCrew(crew);
      crew.location = 'Bomb';
      setBomb([...bomb, crew]);
    }
  };

  const getCards = (cardList) => {
    return cardList.map((card) => (
      <Card
        key={card.id}
        draggable
        onDragStart={(event) => DragStart(event, card)}
        style={{ marginBottom: '10px' }}
      >
        {card.position}
      </Card>
    ));
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div
        id='nose'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'Nose')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '16%',
        }}
      >
        <h3>Nose Comp</h3>
        {getCards(nose)}
      </div>
      <div
        id='pilot'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'Pilot')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '16%',
        }}
      >
        <h3>Pilot Comp</h3>
        {getCards(pilot)}
      </div>
      <div
        id='pilot'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'Radio')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '16%',
        }}
      >
        <h3>Radio Comp</h3>
        {getCards(radio)}
      </div>
      <div
        id='pilot'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'Bomb')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '16%',
        }}
      >
        <h3>Bombs Comp</h3>
        {getCards(bomb)}
      </div>
      <div
        id='pilot'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'Waist')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '16%',
        }}
      >
        <h3>Wasit Comp</h3>
        {getCards(waist)}
      </div>
      <div
        id='pilot'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'Tail')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '16%',
        }}
      >
        <h3>Tail Comp</h3>
        {getCards(tail)}
      </div>
    </div>
  );
};

export default Test;
