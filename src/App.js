import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Add from './pages/Add';
import Predict from './pages/Predict';
import { Navigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import RootLayout from './pages/RootLayout';

function App() {
  const token = localStorage.getItem('token');
  // let user = null;
  // if (token) {
  //   const decodedToken = jwtDecode(token);
  //   user = decodedToken;
  // }
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/auth/login' element={!token ? <Login /> : <Navigate to='/' />} />
        <Route path='/auth/signup' element={<Signup />} />
        {/* <Route path='/' element={<RootLayout />}>
          <Route path='/' element={token ? <Home /> : <Navigate to='/auth/login' />} />
          <Route path='/predict' element={token ? <Predict /> : <Navigate to='/auth/login' />} />
          <Route path="/add" element={token && user && user.username === 'admin' ? <Add /> : <Navigate to='/' />} />
        </Route> */}
        <Route path='/' element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/predict' element={<Predict />} />
          <Route path="/add" element={<Add />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
