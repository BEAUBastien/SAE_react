import React, { useState, useEffect } from 'react';


function App() {
  const [participants, setParticipants] = useState(7
  ); // Nombre de participants, peut être dynamique
  const [squares, setSquares] = useState([]);
  const [columnCount, setColumnCount] = useState(3); // Nombre initial de colonnes

  useEffect(() => {
    setSquares(new Array(participants).fill({ status: 'vie' }));
    // Calculer le nombre de colonnes pour un maximum de deux lignes
    const cols = Math.ceil(participants / 2);
    setColumnCount(cols);
  }, [participants]);

  const toggleStatus = index => {
    const newSquares = squares.map((square, i) => {
      if (i === index) {
        return { ...square, status: square.status === 'vie' ? 'mort' : 'vie' };
      }
      return square;
    });
    setSquares(newSquares);
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`
  };

  return (
    <div className='main-container'>
      <div className="card">
        <div className="grid_card" style={gridStyle}>
          {squares.map((square, index) => (
            <div
              key={index}
              className={`square ${square.status === 'mort' ? 'dead' : ''}`}
              onClick={() => toggleStatus(index)}

            >
              <p>Pseudo</p>
              <div className={`icon-card ${square.status === 'mort' ? 'dead' : ''}`}><img className="icones" src={square.status === 'mort' ? 'img/dead.png' : 'img/fourche.png'} alt={square.status} /></div>

              <p>Statut: {square.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
