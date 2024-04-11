import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Add from './pages/Add';
import Predict from './pages/Predict';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/predict' element={<Predict />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
