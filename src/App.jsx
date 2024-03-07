import React from "react";
import './App.css';
import Home from './Home';
import MarsRovers from './MarsRovers';
import { Route, Routes, Link } from 'react-router-dom'


function App() {
  return (
    <>
      <header>
        <img src="./images/header.png" />
      </header>

      <nav class="topnav" id="myTopnav">
        <Link to="/">Home</Link>
        <Link to="/rovers">View Mars Rovers</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rovers" element={<MarsRovers />} />
        <Route path="/*" element={<section>404 Page Not Found</section>} />
      </Routes>
    </>
  );
}

export default App;
