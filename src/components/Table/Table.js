import './Table.css';

function Table({ points, speed }) {
  const relativeDistance = 0.0615234375;

  const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateTime = (distance, speed) => {
    if (!isNaN(distance) && !isNaN(speed) && speed !== '') {
      const time = (distance / relativeDistance) / parseFloat(speed);
      return time.toFixed(2);
    }
    return '-';
  };
  const pointsToDisplay = points.slice(1);

  return (
    <div className="table">
      {points.length > 1
      ? <table>
        <thead>
          <tr>
            <th>Points</th>
            <th> Hours</th>
          </tr>
        </thead>
        <tbody>
          {pointsToDisplay.map((point, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>
                {calculateTime(
                  calculateDistance(points[index], point),
                  speed
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      : "At least 2 points"}
    </div>
  );
}

export default Table;