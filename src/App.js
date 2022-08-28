import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Main from './pages/Main';
import Home from './pages/Home';
import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token)
      setIsLoggedIn(true);
    else 
      setIsLoggedIn(false);
  }, [])
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userLogIn = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div className='App'>
      <Header userLogIn={userLogIn} isLoggedIn={isLoggedIn} />
      <div className='pages'>
        <Routes>
          <Route path='/main' element={<Main />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
