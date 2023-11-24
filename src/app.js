import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LaunchPage from './LaunchPage';
import ConfigPage from './ConfigPage';
import GameHub from './GameHub';

function App() {
    return (
        <Router>
      <div>
        <Routes>
        {/* Définissez vos routes avec le composant Route */}
        <Route path="/" element={<LaunchPage/>} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/hub/:pin" element={<GameHub />} />
        {/* <Route path="/game/:pin" element={<Game />} /> */}
        </Routes>
      </div>
    </Router>
        
    );
}
export default App;
