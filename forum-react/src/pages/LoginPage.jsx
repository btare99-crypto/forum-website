import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(username, password);
      navigate('/');
    } catch (error) {
      setErrorVisible(true);
    }
  };

  return (
    <div className="login-viewport">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="username-input">
            <p id="incorrectusername" style={{ visibility: errorVisible ? 'visible' : 'hidden' }}>
              Incorrect Username or Password
            </p>
            <label htmlFor="username"></label><br />
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Username" 
              required 
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrorVisible(false); }}
            /><br />
          </div>

          <div className="password-input">
            <label htmlFor="password"></label><br />
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorVisible(false); }}
            /><br />
          </div>

          <div className="checkbox-container">
            <div className='remember-container'>
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="forgot-link">
            <a href="#">Forgot password?</a>
          </div>
        </form>

        <div className="register-or">
          <div className="dash-register"></div>
          <p>or</p>
          <div className="dash-register"></div>
        </div>

        <div className="register-icons">
          <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#"><i className="fa-brands fa-google"></i></a>
          <a href="#"><i className="fa-brands fa-apple"></i></a>
        </div>

        <div className="login-link">
          <p>Don’t have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
