import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { favoriteAPI } from '../api/axios';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [favCount, setFavCount] = useState(0);

  const refreshFavCount = () => {
    if (!isAuthenticated) return;
    favoriteAPI
      .getIds()
      .then(({ data }) => setFavCount(data.length))
      .catch(() => setFavCount(0));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setFavCount(0);
      return;
    }
    refreshFavCount();
    const onUpdate = () => refreshFavCount();
    window.addEventListener('favorites-updated', onUpdate);
    return () => window.removeEventListener('favorites-updated', onUpdate);
  }, [isAuthenticated, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-indigo-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/templates" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow">
            TS
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">Template Store</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/templates" className={linkClass('/templates')}>
            Templates
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/favorites" className={`relative ${linkClass('/favorites')}`}>
                My Favorites
                {favCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {favCount}
                  </span>
                )}
              </Link>
              <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:inline">
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass('/login')}>
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
