// GameHub.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function GameHub() {
  const location = useLocation();
  const params = useParams();
  const searchParams = new URLSearchParams(location.search);
  const numberOfPlayers = parseInt(searchParams.get('players'), 10) || 8;

  const pinFromHub = params.pin;
  const [pin, setPin] = useState(pinFromHub || '');

  useEffect(() => {
    if (!pinFromHub) {
      setPin(generateRandomPin());
    }
  }, [pinFromHub]);

  const generateRandomPin = () => {
    return Math.floor(Math.random() * 9999) + 1;
  };

  return (
    <div class="main-container">
      <h1 id="Titre">ROARRR !</h1>
      <h3 id="pin_game">Pin : {pin}</h3>
      <div>
        <ul>
          {Array.from({ length: numberOfPlayers }, (_, index) => (
            <li key={index}>{`Joueur ${index + 1}`}</li>
          ))}
        </ul>
      </div>
      <Link to={`/game/${pin}/game`}>
        <input type="submit" value="Lancer la partie" />
      </Link>
    </div>
  );
}

export default GameHub;
