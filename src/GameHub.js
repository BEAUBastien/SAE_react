// GameHub.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, off } from 'firebase/database';

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

  const joueurs = useJoueurs(pin);
  console.log(joueurs);

  return (
    <div class="main-container main-container-deroule">
      <h1 id="Titre">ROARRR !</h1>
      <h3 id="pin_game">Pin : {pin}</h3>
      <div>
        <h3>Liste des Joueurs</h3>
        <ul className='liste_player'>
          {joueurs.map((joueur, index) => (
            <li key={index}>{joueur}</li>
          ))}
        </ul>
      </div>
      <Link to={`/game/${pin}/game`}>
        <input className='cartoon-button' type="submit" value="Lancer la partie" />
      </Link>
    </div>
  );
}

function useJoueurs( partieId ) {
  const [joueurs, setJoueurs] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const joueursRef = ref(db, 'Partie' + partieId + '/Joueurs');

    const unsubscribe = onValue(joueursRef, (snapshot) => {
      const joueursData = snapshot.val();
      const joueursList = joueursData
        ? Object.keys(joueursData).map(key => joueursData[key].pseudo || "Inconnu")
        : [];
      setJoueurs(joueursList);
    }, (error) => {
      // Gérer l'erreur
      console.error(error);
    });

    // Se désabonner de l'écouteur lors du démontage du composant
    return () => off(joueursRef, 'value', unsubscribe);
  }, [partieId]);

  return joueurs;
}

export default GameHub;
