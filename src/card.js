import React, { useState } from 'react';


function App() {
  // Supposons que vous avez un état qui tient compte du nombre de participants
  const [participants, setParticipants] = useState(5);
  const squares = Array.from({ length: participants }, (_, i) => ({ id: i, status: 'vie' }));

  const toggleStatus = id => {
    setParticipants(prevSquares =>
      prevSquares.map(square =>
        square.id === id ? { ...square, status: square.status === 'vie' ? 'mort' : 'vie' } : square
      )
    );
  };

  return (
    <div className='main-container'>
    <div className="flex-container">
      {squares.map(square => (
        <div
          key={square.id}
          className={`card ${square.status}`}
          onClick={() => toggleStatus(square.id)}
        >
          <p>Pseudo</p>
          <p>Statut: {square.status}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
