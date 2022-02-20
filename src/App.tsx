import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Global/Footer';
//Import modules
import Header from "./components/Global/Header"
import Home from './components/Home';
import Calendar from './components/Calendar';
import UserProfile from './components/User/UserProfile';
import Diseases from 'components/Diseases';
import Doctors from 'components/Doctors';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/diseases" element={<Diseases />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
