import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LaunchPage from './LaunchPage';
import ConfigPage from './ConfigPage';
import GameHub from './GameHub';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
    //     <Router>
    //   <div>
    //     <Routes>
    //     {/* Définissez vos routes avec le composant Route */}
    //     <Route path="/" element={<LaunchPage/>} />
    //     <Route path="/config" element={<ConfigPage />} />
    //     <Route path="/hub/:pin" element={<GameHub />} />
    //     {/* <Route path="/game/:pin" element={<Game />} /> */}
    //     </Routes>
    //   </div>
    // </Router>
        
    );
}
export default App;
