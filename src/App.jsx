import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; // Importing the Navbar
import Homepage from './components/Homepage';
import Register from './authentication/Register';
import Login from './authentication/Login';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Adding the Navbar here */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
