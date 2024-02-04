import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CardDetail from './components/CardDetil';


function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/Card" element={<Card />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/CardDetail/:id" element={<CardDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
