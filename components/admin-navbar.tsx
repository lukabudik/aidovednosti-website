'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminNavbar() {
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    setLoggingOut(true);
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      
      // Redirect to the login page
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };
  
  return (
    <header className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="font-bold text-xl">AI Dovednosti</a>
            <span className="mx-2">|</span>
            <span className="text-sm font-medium">Admin</span>
          </div>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="/admin/codes" className="hover:text-blue-200 transition-colors">
                    2FA Kódy
                  </a>
                </li>
              </ul>
            </nav>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-white hover:text-blue-200 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L15.586 9H12V5.414zM4 4h5v5h5v6H4V4z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 12a1 1 0 00-1-1H4a1 1 0 000 2h5a1 1 0 001-1z" clipRule="evenodd" />
              </svg>
              {loggingOut ? 'Odhlašování...' : 'Odhlásit se'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
