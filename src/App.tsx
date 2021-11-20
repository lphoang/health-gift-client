import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Import modules
import Header from "./components/Global/Header"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
