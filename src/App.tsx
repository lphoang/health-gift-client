import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Global/Footer';
//Import modules
import Header from "./components/Global/Header"
import Home from './components/Home';
import Research from './components/Research';
import Calendar from './components/Calendar';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diseases" element={<Research />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;
