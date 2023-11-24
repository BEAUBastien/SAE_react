// ConfigPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ConfigPage() {
  const [selectedPlayers, setSelectedPlayers] = useState(8);
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedPlayers(parseInt(event.target.value, 10));
  };

  const generateRandomPin = () => {
    const min = 1000; // La valeur minimale pour un PIN à quatre chiffres
    const max = 9999; // La valeur maximale pour un PIN à quatre chiffres
    const pin = Math.floor(Math.random() * (max - min + 1)) + min;
    return pin.toString().padStart(4, '0'); // Ajoute des zéros à gauche si nécessaire
  };
  

  const pin = generateRandomPin();

  const handleValidate = () => {
    navigate(`/hub/${pin}?players=${selectedPlayers}`);
  };

  return (
    <div class="main-container">
      <h2>ConfigPage</h2>
      <form action="" method="get" className="form_config">
        <select name="nb_joueurs" id="nb_joueurs" onChange={handleSelectChange} value={selectedPlayers}>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <Link to={`/hub/${pin}?players=${selectedPlayers}`}>
          <input type="submit" value="Valider" />
        </Link>
      </form>
    </div>
  );
}

export default ConfigPage;
