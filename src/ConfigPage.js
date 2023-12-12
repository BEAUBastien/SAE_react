import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataSnapshot, getDatabase, onValue, ref, set, update } from 'firebase/database';
import 'firebase/database';

function ConfigPage() {
  const [selectedPlayers, setSelectedPlayers] = useState(8);
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedPlayers(parseInt(event.target.value, 10));
  };

  const generateRandomPin = () => {
    const min = 1000; // Valeur minimale pour un PIN à quatre chiffres
    const max = 9999; // Valeur maximale pour un PIN à quatre chiffres
    const pin = Math.floor(Math.random() * (max - min + 1)) + min;
    return pin.toString().padStart(4, '0'); // Ajoute des zéros à gauche si nécessaire
  };

  const pin = generateRandomPin();

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    creationPartie(pin); 
    navigate(`/hub/${pin}?players=${selectedPlayers}`);
  };

  return (
    <div className='main-container'>
    <h1 id='Titre'>ROARRR !</h1>
      <h2>ConfigPage</h2>
      <form onSubmit={handleSubmit} method="get" >
        <select name="nb_joueurs" id="nb_joueurs" onChange={handleSelectChange} value={selectedPlayers}>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <input type="submit" value="Valider" />
      </form>
      <Link to="/">
          <button type="button" className="back-button">Retour</button>
        </Link>
    </div>
  );
}


function creationPartie(partieId) {
    const db = getDatabase();
    const reference = ref(db, 'Partie' + partieId);

    set(reference,{
      Joueurs : {
        nbjouer : 0
      },
      deroulement : "att",
      pin : partieId
    });
}

export default ConfigPage;
