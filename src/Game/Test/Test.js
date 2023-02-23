// import React, {createContext, useContext, useState} from 'react';
// import NumberAnglesAndLevels from './NumberAnglesAndLevels';
// import { Row, Col, Card } from 'antd';
// import GameContext from '../GameContext';
// import { getNewFileHandle, saveToFile, writeFile, chooseFile } from '../../Utilities/UseFileSystem';

// const DraggableElement = ({ id, containerId, subContainerId }) => {
//   const [currentLoc, setCurrentLoc] = useState(null);

//   const handleDragStart = (e) => {
//     e.dataTransfer.setData('text/plain', id);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e, containerId, subContainerId) => {
//     e.preventDefault();
//     setCurrentLoc(subContainerId);
//   };

//   return (
//     <Card
//       draggable
//       onDragStart={handleDragStart}
//       onDragOver={handleDragOver}
//       onDrop={(e) => handleDrop(e, containerId, subContainerId)}
//     >
//       <p>{id}</p>
//       {currentLoc && <p>Current Location: {currentLoc}</p>}
//     </Card>
//   );
// };

// const Test = () => {
//   const ctx = useContext(GameContext);
//   const [locations, setLocations] = useState({});

//   const handleSubContainerDrop = (elementId, subContainerId) => {
//     setLocations((prevLocations) => ({
//       ...prevLocations,
//       [elementId]: subContainerId,
//     }));
//   };

//   return (
//     <Row gutter={[16, 16]}>
//       {[0, 1, 2, 3, 4].map((containerId) => (
//         <Col span={4} key={containerId}>
//           <div className="container" id={containerId}>
//             <h2>Container {containerId}</h2>
//             <Row gutter={[16, 16]}>
//               {[0, 1].map((subContainerId) => (
//                 <Col span={12} key={subContainerId}>
//                   <div style={{border: '1px solid grey', width: 50, height: 50}}
//                     className="sub-container"
//                     id={`sub-${containerId}-${subContainerId}`}
//                     onDrop={(e) =>
//                       handleSubContainerDrop(
//                         e.dataTransfer.getData('text/plain'),
//                         `sub-${containerId}-${subContainerId}`
//                       )
//                     }
//                     onDragOver={(e) => e.preventDefault()}
//                   ></div>
//                 </Col>
//               ))}
//             </Row>
//           </div>
//         </Col>
//       ))}
//       <Col span={24}>
//         <h2>Draggable Elements</h2>
//         <Row gutter={[16, 16]}>
//           {[...Array(10)].map((_, index) => (
//             <Col span={4} key={index}>
//               <DraggableElement id={index} />
//             </Col>
//           ))}
//         </Row>
//       </Col>
//     </Row>
//   );

// }

// export default Test;


// 
import React, { useState } from 'react';
import { Card } from 'antd';
const theCards = [
  { id: 'card1', content: 'Card 1', location: 'start' },
  { id: 'card2', content: 'Card 2', location: 'start' },
  { id: 'card3', content: 'Card 3', location: 'start' },
]

const App = () => {
  const [cards, setCards] = useState([
    { id: 'card1', content: 'Card 1', location: 'start' },
    { id: 'card2', content: 'Card 2', location: 'start' },
    { id: 'card3', content: 'Card 3', location: 'start' },
  ]);
  const [leftCards, setLeftCards] = useState([]);
  const [rightCards, setRightCards] = useState([]);

  const DragStart = (event, card) => {
    event.dataTransfer.setData('card_id', card.id);
  };

  const DragOver = (event) => {
    event.preventDefault();
  };

  const getPrevLoc = (card_id) => {
    if (cards.some(c => c.id === card_id))
      return cards.find((c) => c.id === card_id);
    if (leftCards.some(c => c.id === card_id))
      return leftCards.find((c) => c.id === card_id);
    if (rightCards.some(c => c.id === card_id))
      return rightCards.find((c) => c.id === card_id);
  }
  const Drop = (event, container) => {
    const card_id = event.dataTransfer.getData('card_id');

    // const card = cards.find((c) => c.id === card_id);
    const card = getPrevLoc(card_id);
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
        {card.content}
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

export default App;
