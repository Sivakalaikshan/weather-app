import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    
    document.body.classList.add('login-page');
  
    
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []); 
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://weather-api-kf7o.onrender.com/user/login', { email, password });
      setMessage(response.data.message);
      if (response.data.message === "Login successful") {
        
        navigate('/simplemap');
        onLogin();
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">Login</button>
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginForm;
