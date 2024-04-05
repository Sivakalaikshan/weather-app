import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SimpleMap from './SimpleMap';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  
  const handleLogin = () => {
    
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />
        
        <Route
          path="/simplemap"
          element={isLoggedIn ? <SimpleMap /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
