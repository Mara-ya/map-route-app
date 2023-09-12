import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaSailboat } from 'react-icons/fa6';
import piratesMap from '../../piratesMap.png';
import './Map.css';


function Map({ points, onMapClick, onDeletePoint, originalSize, newMapSize }) {
const [coordPolyline, setCoordPolyline] = useState([]);

useEffect(() => {
  if (points.length > 1) {
  const newCoordPolyline = points.map(({ x, y }) => `${(x * newMapSize.width) / originalSize.width} ${(y * newMapSize.height) / originalSize.height}`);
  setCoordPolyline(newCoordPolyline);
  }
}, [points, originalSize, newMapSize]);

return (
  <div className="map">
    <div className="image-container">
      <img
        id="map-image"
        src={piratesMap}
        alt="pirates map"
        onClick={(e) => onMapClick(uuidv4(), e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      />
      {points.length > 1 && (
        <div className='line-container'>
          <svg>
            <polyline
              points={coordPolyline}
              style={{fill: 'none', stroke:'black', strokeWidth: 3}}
            />
          </svg>
        </div>
      )}
      {points.length > 0 && (
        <ul className="point-list">
          {points.map(({id, x, y}) => (
            <li key={id} onClick={() => onDeletePoint(id)}>
              <FaSailboat
                className='point'
                style={{
                  position: 'absolute',
                  left: (x * newMapSize.width) / originalSize.width - 7,
                  top: (y * newMapSize.height) / originalSize.height - 7,
                  cursor: 'pointer'
                }}
                onClick={() => onDeletePoint(id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}


export default Map;
