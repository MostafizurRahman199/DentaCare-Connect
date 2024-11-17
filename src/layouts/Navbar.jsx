import React from 'react'
import { Link } from 'react-router-dom'
import { useFirebaseAuth } from '../Auth/AuthProvider';

const Navbar = () => {
  // Add state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  // Add active link state
  const [activeLink, setActiveLink] = React.useState(window.location.pathname);
  const { user, logOut } = useFirebaseAuth();

  // Add link style helper
  const getLinkStyle = (path) => `
    relative px-3 py-2 text-sm font-medium transition-colors duration-200
    ${activeLink === path 
      ? 'text-blue-600' 
      : 'text-gray-700 hover:text-blue-600'
    }
    before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
    before:bg-blue-600 before:transform before:scale-x-0 before:transition-transform
    before:duration-300 hover:before:scale-x-100
    ${activeLink === path ? 'before:scale-x-100' : ''}
  `;

  // Add logout handler
  const handleLogout = async () => {
    try {
      await logOut();
      // Optionally redirect to home or login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/path-to-your-logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={getLinkStyle('/')} onClick={() => setActiveLink('/')}>
              Home
            </Link>
            <Link to="/treatments" className={getLinkStyle('/treatments')} onClick={() => setActiveLink('/treatments')}>
              All Treatments
            </Link>
            <Link to="/profile" className={getLinkStyle('/profile')} onClick={() => setActiveLink('/profile')}>
              Profile
            </Link>
            <Link to="/appointments" className={getLinkStyle('/appointments')} onClick={() => setActiveLink('/appointments')}>
              My Appointments
            </Link>
          </div>

          {/* User Profile/Login Button - Right */}
          <div className="flex items-center">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.displayName || 'Profile'}
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.displayName}
                  </span>
                </button>
                <div className="absolute right-0 w-48 pt-2">
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button - Updated with onClick handler */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel - Updated with transitions */}
      <div 
        className={`
          md:hidden absolute top-16 left-0 w-full bg-white/80 backdrop-blur-md
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className={`block ${getLinkStyle('/')}`}
            onClick={() => {
              setActiveLink('/');
              setIsMobileMenuOpen(false);
            }}
          >
            Home
          </Link>
          <Link 
            to="/treatments" 
            className={`block ${getLinkStyle('/treatments')}`}
            onClick={() => {
              setActiveLink('/treatments');
              setIsMobileMenuOpen(false);
            }}
          >
            All Treatments
          </Link>
          <Link 
            to="/profile" 
            className={`block ${getLinkStyle('/profile')}`}
            onClick={() => {
              setActiveLink('/profile');
              setIsMobileMenuOpen(false);
            }}
          >
            Profile
          </Link>
          <Link 
            to="/appointments" 
            className={`block ${getLinkStyle('/appointments')}`}
            onClick={() => {
              setActiveLink('/appointments');
              setIsMobileMenuOpen(false);
            }}
          >
            My Appointments
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar