import React, { useState, useContext } from 'react';
import { Card } from 'antd';
import GameContext from '../GameContext';

const Test = () => {
  const ctx = useContext(GameContext);
  const [cards, setCards] = useState([
    { id: 'card1', position: 'Card 1', location: 'start' },
    { id: 'card2', position: 'Card 2', location: 'start' },
    { id: 'card3', position: 'Card 3', location: 'start' },
  ]);
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
  const [leftCards, setLeftCards] = useState([]);
  const [rightCards, setRightCards] = useState([]);

  const [nose, setNose] = useState(manStations(crew, 'Nose Comp.'));
  const [pilotComp, setpilotComp] = useState([]);
  const [radio, setRadio] = useState([]);
  const [waist, setWaist] = useState([]);
  const [tail, setTail] = useState([]);

  const DragStart = (event, card) => {
    //1. ORIGINAL 
    // event.dataTransfer.setData('card_id', card.id);

    // 2. TRANSFER 2 PROPERTIES
    event.dataTransfer.setData('card_id', card.id);
    event.dataTransfer.setData('location', card.location);

    //3. TRANSFER ENTIRE OBJECT USING JSON STRINGIFY
    const cardObj = JSON.stringify(card);
    event.dataTransfer.setData('card', cardObj);
  };

  const DragOver = (event) => {
    event.preventDefault();
  };

  const getPrevLoc = (card_id, container) => {
    if (cards.some(c => c.id === card_id)){
      return cards.find((c) => c.id === card_id);
    }
    if (leftCards.some(c => c.id === card_id)) {
      if (container === 'left'){
        return;
      }
      return leftCards.find((c) => c.id === card_id);
    }
    if (rightCards.some(c => c.id === card_id)) {
      if (container === 'right') {
        return
      }
      return rightCards.find((c) => c.id === card_id);
    }
    if (nose.some(c => c.id === card_id)) {
      if (container === 'Nose') {
        return
      }
      return rightCards.find((c) => c.id === card_id);
    }
  }
  const Drop = (event, container) => {
    // 1. GETTING ONE PROPERTY -- ORIGINAL
    const card_id = event.dataTransfer.getData('card_id');

    //2.  JUST GET 2 PROPERTIES
    // const cardObj = {
    //   id: event.dataTransfer.getData('card_id'),
    //   prevLoc: event.dataTransfer.getData('location'),
    // }
  
    // 3. GETTING ENTIRE OBJECT
    const cardObj = JSON.parse(event.dataTransfer.getData('card'));

    
    // const card = cards.find((c) => c.id === card_id);
    const card = getPrevLoc(card_id, container);
    const newCards = cards.filter((c) => c.id !== card_id);

    if (container === 'left') {
      if (rightCards.find((c) => c.id === card.id)) {
        setRightCards(rightCards.filter((c) => c.id !== card.id));
      }
      setLeftCards([...leftCards, card]);
    } else {
      if (leftCards.find((c) => c.id === card.id)) {
        setLeftCards(leftCards.filter((c) => c.id !== card.id));
      }
      setRightCards([...rightCards, card]);
    }
    console.log(cardObj);
    setCards(newCards);
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
      id='left'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'left')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '40%',
        }}
      >
        <h3>Left Container</h3>
        {getCards(leftCards)}
      </div>
      <div
      id='right'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'right')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '40%',
        }}
      >
        <h3>Right Container</h3>
        {getCards(rightCards)}
      </div>
      {/* <div
        id='left'
        onDragOver={(event) => DragOver(event)}
        onDrop={(event) => Drop(event, 'Nose Comp.')}
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '40%',
        }}
      >
        <h3>Nose Comp</h3>
        {getCards(nose)}
      </div> */}
      <div
        style={{
          marginTop: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h3>Draggable Elements</h3>
      </div>
      <div
      id='start'
        style={{
          marginTop: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {getCards(cards)}
      </div>
    </div>
  );
};

export default Test;
