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
    return Math.floor(Math.random() * 9999) + 1;
  };

  const pin = generateRandomPin();

  const handleValidate = () => {
    navigate(`/hub/${pin}?players=${selectedPlayers}`);
  };

  return (
    <div>
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
