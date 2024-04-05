import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import './SignupForm.css';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://weather-api-kf7o.onrender.com/user/signup', { username, password, email });
      setMessage(response.data.message);
      setShowPopup(true);
      navigate('/login');
    } catch (error) {
      setMessage('Email is already in use. Please use a different email address.');
      setShowPopup(true); 
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <div className="login-link">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
      {showPopup && (
        <div className="popup">
          <p>{message}</p>
          <button onClick={() => setShowPopup(false)} className="close-button">Close</button>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
