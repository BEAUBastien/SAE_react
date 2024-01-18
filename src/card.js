import React, { useState } from 'react';


function Cards() {
  // Initialiser l'état avec 8 carrés ayant le statut 'vie'
  const [squares, setSquares] = useState(new Array(7).fill({ status: 'vie' }));

  // Fonction pour changer le statut de vie à mort et vice versa
  const toggleStatus = index => {
    const newSquares = squares.map((square, i) => {
      if (i === index) {
        return { ...square, status: square.status === 'vie' ? 'mort' : 'vie' };
      }
      return square;
    });
    setSquares(newSquares);
  };

  return (
    <div className='main-container'>
    <div className="card">
      <div className="grid_card">
        {squares.map((square, index) => (
          <div
            key={index}
            className={`square ${square.status === 'mort' ? 'dead' : ''}`}
            onClick={() => toggleStatus(index)}
          >
            <p>Pseudo</p>
            <p>Statut: {square.status}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Cards;
