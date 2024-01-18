import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LaunchPage from './LaunchPage';
import ConfigPage from './ConfigPage';
import GameHub from './GameHub';
import Game from './Game';

function App() {

  return (
    <Router>
      <div>
        <Routes>
        {/* Définissez vos routes avec le composant Route */}
        <Route path="/" element={<LaunchPage/>} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/hub/:pin" element={<GameHub />} />
        <Route path="/game/:pin/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
        
    );
}
export default App;

//CALIBRATION GIT
