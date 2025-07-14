
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminLoginDialog from './AdminLoginDialog';

export const Header = () => {
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Check admin login status from localStorage on component mount
    const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminStatus);
    
    // Listen for storage changes to update state
    const handleStorageChange = () => {
      const newAdminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
      setIsAdminLoggedIn(newAdminStatus);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
    // Force immediate UI update
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ff41cd41-c103-4fdd-b5f3-6c59c42f131f.png" 
              alt="Bank Bthorna" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-green-600">Bank Bthorna</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/seeds" 
              className={`transition-colors ${isActive('/seeds') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
            >
              Seeds
            </Link>
            <Link 
              to="/farmers" 
              className={`transition-colors ${isActive('/farmers') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
            >
              Farmers
            </Link>
            <Link 
              to="/experts" 
              className={`transition-colors ${isActive('/experts') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
            >
              Experts
            </Link>
            <Link 
              to="/search" 
              className={`transition-colors ${isActive('/search') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
            >
              Search
            </Link>
            {isAdminLoggedIn && (
              <Link 
                to="/dashboard" 
                className={`transition-colors ${isActive('/dashboard') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-600 font-medium">Admin Panel</span>
                <Button variant="outline" size="sm" onClick={handleAdminLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <AdminLoginDialog onAdminLogin={handleAdminLogin} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
