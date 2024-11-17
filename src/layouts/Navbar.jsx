import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFirebaseAuth } from '../Auth/AuthProvider';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState(location.pathname);
  const { user, logOut, loading } = useFirebaseAuth();

  // Add effect to update activeLink when location changes
  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  // Add loading check
  if (loading) {
    return <div className="h-16" />; // Placeholder for navbar height
  }

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
          {/* Logo - Updated for better mobile display */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-8 w-auto sm:h-12" // Smaller on mobile
                src="https://t4.ftcdn.net/jpg/03/02/68/11/360_F_302681154_9HOWdvGLtCKpfwO5B85yESszG7MfmlUl.jpg"
                alt="Logo"
              />
              <span className="text-lg sm:text-xl font-bold text-blue-600 truncate">
                DentaCare-Connect
              </span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link to="/" className={getLinkStyle('/')} onClick={() => setActiveLink('/')}>
              Home
            </Link>
            <Link to="/treatments" className={getLinkStyle('/treatments')} onClick={() => setActiveLink('/treatments')}>
              All Treatments
            </Link>
            <Link to="/profile" className={getLinkStyle('/profile')} onClick={() => setActiveLink('/profile')}>
              Profile
            </Link>
            <Link to="/my-appointments" className={getLinkStyle('/my-appointments')} onClick={() => setActiveLink('/my-appointments')}>
              My Appointments
            </Link>
          </div>

          {/* User Profile/Login Button - Updated for mobile */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <img
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                    src={user.photoURL || user.providerData?.[0]?.photoURL || '/default-avatar.png'}
                    alt={user.displayName || 'Profile'}
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                      e.target.onerror = null; // Prevent infinite loop
                    }}
                  />
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
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
                className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button - Updated styling */}
          <div className="md:hidden flex items-center ml-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel - Fixed positioning and z-index */}
      <div 
        className={`
          md:hidden fixed  top-16 bg-white shadow-lg
          transform transition-all duration-300 ease-in-out z-100
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
        `}
      >
        {/* Add a solid background overlay */}
        <div className="absolute inset-0 bg-blue-50" />
        
        {/* Content container with relative positioning */}
        <div className="relative px-4 pt-2 pb-3 space-y-2">
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
            to="/my-appointments" 
            className={`block ${getLinkStyle('/my-appointments')}`}
            onClick={() => {
              setActiveLink('/my-appointments');
              setIsMobileMenuOpen(false);
            }}
          >
            My Appointments
          </Link>
          
          {/* Add login button for mobile */}
          {!user && (
            <Link 
              to="/login" 
              className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar