import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map/Map';
import Controls from './components/Controls/Controls';
import Table from './components/Table/Table';


function App() {
const [points, setPoints] = useState([]);
const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
const [newMapSize, setNewMapSize] = useState({ width: 0, height: 0 });
const [speed, setSpeed] = useState(''); // State for speed value

useEffect(() => {
  const mapElement = document.getElementById('map-image');
  mapElement.onload = () => {
    const width = mapElement.clientWidth;
    const height = mapElement.clientHeight;
    setOriginalSize({ width, height });
  }

  const updateMapSize = () => {
    setNewMapSize({ width: mapElement.clientWidth, height: mapElement.clientHeight });
  };

  window.addEventListener('resize', updateMapSize);
  updateMapSize();

  return () => {
    window.removeEventListener('resize', updateMapSize);
  };
}, [points]);


const handleMapClick = (id, x, y) => {
 const left = newMapSize.width !== 0 ? (x * originalSize.width) / newMapSize.width: x;
 const top = newMapSize.height !== 0 ? (y * originalSize.height) / newMapSize.height : y;
  setPoints([...points, {id, x: left, y: top }]);
};


const handleDeleteBoat = (pointId) => {
  setPoints((prevPoints) => prevPoints.filter((point) => point.id !== pointId));
};


const handleDeletePoints = () => {
  setPoints([]);
};

const handleSpeedChange = (newSpeed) => {
  setSpeed(newSpeed);
};

return (
  <div className="app">
    <div className="wrapper">
      <Map
        points = {points}
        onMapClick = {handleMapClick}
        onDeletePoint = {handleDeleteBoat}
        originalSize = {originalSize}
        newMapSize = {newMapSize}
      />
      <div>
        <Controls
          onDeletePoint={handleDeletePoints}
          onSpeedChange={handleSpeedChange}
        />
        {speed 
          ? <Table
            points={points}
            originalSize = {originalSize}
            newMapSize = {newMapSize}
            speed={speed}
          />
          : "You need to enter the speed"
        }
      </div>
    </div>
   </div>
 );
}


export default App;
