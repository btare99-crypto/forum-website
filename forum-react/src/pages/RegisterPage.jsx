import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    passwordMatch: false,
    usernameFormat: false
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { username, email, password, confirmPassword } = formData;
    let newErrors = { passwordMatch: false, usernameFormat: false };

    // Check password match
    if (password !== confirmPassword) {
      newErrors.passwordMatch = true;
      setErrors(newErrors);
      return;
    }

    // Check username format
    const usernameRegex = /^[A-Z][A-Za-z0-9._\- ]{2,}$/;
    if (!usernameRegex.test(username)) {
      newErrors.usernameFormat = true;
      setErrors(newErrors);
      return;
    }

    // Check password format
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 6 characters long, include 1 uppercase letter and 1 number.');
      return;
    }

    try{
      register(username, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-viewport">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <p id="username-requirements" style={{ visibility: errors.usernameFormat ? 'visible' : 'hidden' }}>
            Username requirements do not met
          </p>

          <div className="username-input">
            <label htmlFor="username"></label><br />
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Username" 
              required 
              value={formData.username}
              onChange={(e) => { 
                setFormData({ ...formData, username: e.target.value }); 
                setErrors({ ...errors, usernameFormat: false });
              }}
            /><br />
          </div>

          <div className="email-input">
            <label htmlFor="email"></label><br />
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              value={formData.password}
              onChange={(e) => { 
                setFormData({ ...formData, password: e.target.value }); 
                setErrors({ ...errors, passwordMatch: false });
              }}
            /><br />
          </div>

          <div className="password-input">
            <label htmlFor="confirm-password"></label><br />
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              placeholder="Confirm Password" 
              required 
              value={formData.confirmPassword}
              onChange={(e) => { 
                setFormData({ ...formData, confirmPassword: e.target.value }); 
                setErrors({ ...errors, passwordMatch: false });
              }}
            /><br />
          </div>

          <p id="password-match" style={{ visibility: errors.passwordMatch ? 'visible' : 'hidden' }}>
            Passwords do not match!
          </p>

          <button type="submit" className="login-btn">Register</button>
          <p id="error"></p>
        </form>

        <div className="register-or">
          <div className="dash-register"></div>
          <p>or</p>
          <div className="dash-register"></div>
        </div>

        <div className="register-icons">
          <a href=""><i className="fa-brands fa-facebook-f"></i></a>
          <a href=""><i className="fa-brands fa-google"></i></a>
          <a href=""><i className="fa-brands fa-apple"></i></a>
        </div>
        
        <div className="register-link">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
