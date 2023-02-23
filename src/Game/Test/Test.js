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


import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';

const DraggableElement = ({ id, onDrop }) => {
  const [currentTool, setCurrentTool] = useState(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const containerId = e.target.id;
    setCurrentTool(containerId);
    onDrop(id, containerId);
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>Element {id}</p>
      {currentTool && <p>Current Tool: {currentTool}</p>}
    </Card>
  );
};

const Container = ({ id, elementsInContainer, onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const elementId = e.dataTransfer.getData('text/plain');
    onDrop(elementId, id);
  };

  return (
    <div className="container" id={id} onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2>Container {id}</h2>
      {elementsInContainer.map((id) => (
        <div key={id}>{`Element ${id}`}</div>
      ))}
    </div>
  );
};

const DragAndDrop = () => {
  const [locations, setLocations] = useState({});

  const handleDrop = (elementId, containerId) => {
    setLocations((prevLocations) => ({
      ...prevLocations,
      [elementId]: containerId,
    }));
  };

  const getElementsInContainer = (containerId) => {
    return Object.entries(locations)
      .filter(([_, id]) => id === containerId)
      .map(([id]) => id);
  };

  return (
    <Row gutter={[16, 16]}>
      {[0, 1, 2, 3, 4].map((containerId) => (
        <Col span={4} key={containerId}>
          <Container id={containerId} elementsInContainer={getElementsInContainer(containerId)} onDrop={handleDrop} />
        </Col>
      ))}
      <Col span={24}>
        <h2>Draggable Elements</h2>
        <Row gutter={[16, 16]}>
          {[...Array(10)].map((_, index) => (
            <Col span={4} key={index}>
              <DraggableElement id={index} onDrop={handleDrop} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default DragAndDrop;
