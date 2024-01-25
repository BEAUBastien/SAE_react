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
    const min = 1000;
    const max = 9999;
    const pin = Math.floor(Math.random() * (max - min + 1)) + min;
    return pin.toString().padStart(4, '0');
  };

  const pin = generateRandomPin();

  const handleSubmit = (event) => {
    event.preventDefault();
    creationPartie(pin);
    navigate(`/hub/${pin}?players=${selectedPlayers}`);
  };

    return (
      <div className='main-container main-container-deroule'>
        <h1 id='Titre'>ROARRR !</h1>
        <form onSubmit={handleSubmit} method="get" className="form-config">
          <label class="checkbox-container">Classique
            <input type="checkbox" name="style"></input>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-container">Vampires
            <input type="checkbox" name="style"></input>
            <span class="checkmark"></span>
          </label>
          <div className="button-container">
            <input type="submit" value="Valider" className="button-common-style" />
            <Link to="/" className="button-common-style">
              <button type="button" className="button-common-style">Retour</button>
            </Link>
          </div>
        </form>
      </div>
    );  
  }



function creationPartie(partieId) {
  const db = getDatabase();
  const reference = ref(db, 'Partie' + partieId);

  set(reference, {
    Joueurs: {
      "Joueur1": {
        "etat": "vivant",
        "id": 1,
        "pseudo": "   ",
        "role": "villageois",
        "vote": 0
      }
    },
    deroulement: "att",
    pin: partieId
  });
}

export default ConfigPage;
