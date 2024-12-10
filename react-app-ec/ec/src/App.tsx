import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Entrada from './pages/entrada'
function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/comprar-entrada" element={<Entrada />} />
          </Routes>
        </Router>
  );
}

export default App;