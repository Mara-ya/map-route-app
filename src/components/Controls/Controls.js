import React, { useState } from 'react';
import './Controls.css';

function Controls({ onDeletePoint, onSpeedChange }) {
  const [speed, setSpeed] = useState('');

  const handleSpeedChange = (event) => {
    const newSpeed = event.target.value;
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="controls">
      <button onClick={() => onDeletePoint()}>Delete Points</button>
      <div>
        <label htmlFor="speedInput">Speed (mph): </label>
        <input
          type="text"
          id="speedInput"
          value={speed}
          onChange={handleSpeedChange}
          placeholder="Enter speed"
        />
      </div>
    </div>
  );
}

export default Controls;