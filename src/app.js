import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LaunchPage from './LaunchPage';
import ConfigPage from './ConfigPage';
function App() {
    return (
        <Router>
      <div>
      <nav>
          {/* Utilisez le composant Link pour créer des liens vers vos pages */}
          <Link to="/">Launch</Link>
          <Link to="/config">Config</Link>
        </nav>
        <Routes>
        {/* Définissez vos routes avec le composant Route */}
        <Route path="/" element={<LaunchPage/>} />
        <Route path="/config" element={<ConfigPage />} />
        </Routes>
      </div>
    </Router>
        
    );
}
export default App;
