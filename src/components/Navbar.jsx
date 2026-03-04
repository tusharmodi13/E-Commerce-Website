import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">ShopEase</Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition">Products</Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 transition">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                {isAdmin && <Link to="/admin" className="text-gray-700 hover:text-indigo-600 transition">Admin</Link>}
                <span className="text-sm text-gray-500">Hi, {user.name}</span>
                <button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition">Login</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link to="/" className="text-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" className="text-gray-700" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/cart" className="text-gray-700" onClick={() => setMenuOpen(false)}>🛒 Cart ({cartCount})</Link>
            {user ? (
              <>
                {isAdmin && <Link to="/admin" className="text-gray-700" onClick={() => setMenuOpen(false)}>Admin</Link>}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="text-indigo-600 font-semibold" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
