import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Hide header and footer on login and register pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          {/* Logo/Brand */}
          <div className="header-logo">
            <Link to="/" className="logo-link">
              <h1>ForumHub</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <ul>
              <li><Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Link></li>
              <li><Link to="/posts" className={location.pathname === '/posts' ? 'nav-link active' : 'nav-link'}>Posts</Link></li>
              <li><Link to="/create-post" className={location.pathname === '/create-post' ? 'nav-link active' : 'nav-link'}>Create Post</Link></li>
              <li><Link to="/profile" className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}>Profile</Link></li>
            </ul>
          </nav>

          {/* User Section */}
          <div className="header-user">
            {currentUser ? (
              <div className="user-logged-in">
                <div className="user-info">
                  <i className="fa-solid fa-circle-user"></i>
                  <span className="username">{currentUser}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout} title="Log out">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <div className="user-guest">
                <i className="fa-regular fa-user"></i>
                <span className="username">Guest</span>
                <Link to="/login" className="login-btn">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="header-menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        <div 
          className="mobile-overlay" 
          style={{ display: isMenuOpen ? 'block' : 'none' }}
          onClick={toggleMenu}
        ></div>
        
        <nav className="mobile-menu" style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
          <div className="mobile-menu-header">
            <h2>Menu</h2>
            <button className="mobile-menu-close" onClick={toggleMenu}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="mobile-menu-content">
            <div className="mobile-user-info">
              {currentUser ? (
                <>
                  <div className="mobile-user">
                    <i className="fa-solid fa-circle-user"></i>
                    <span>{currentUser}</span>
                  </div>
                </>
              ) : (
                <div className="mobile-user">
                  <i className="fa-regular fa-user"></i>
                  <span>Guest</span>
                </div>
              )}
            </div>

            <ul className="mobile-nav-links">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/posts" onClick={toggleMenu}>Posts</Link></li>
              <li><Link to="/create-post" onClick={toggleMenu}>Create Post</Link></li>
              <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
            </ul>

            <div className="mobile-auth-links">
              {!currentUser ? (
                <>
                  <Link to="/login" className="mobile-auth-btn" onClick={toggleMenu}>Log In</Link>
                  <Link to="/register" className="mobile-auth-btn" onClick={toggleMenu}>Register</Link>
                </>
              ) : (
                <button className="mobile-auth-btn logout" onClick={handleLogout}>Log Out</button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-wrapper">
          {/* Footer Brand */}
          <div className="footer-section footer-brand">
            <h3 className="footer-logo">ForumHub</h3>
            <p className="footer-tagline">Connecting minds, sharing ideas</p>
          </div>

          {/* Footer Links */}
          <div className="footer-section footer-links-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Posts</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Footer Information */}
          <div className="footer-section footer-info">
            <h4>Information</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          {/* Footer Social */}
          <div className="footer-section footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" className="social-link facebook" title="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link linkedin" title="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link instagram" title="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="social-link twitter" title="Twitter">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2026 ForumHub. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
