'use client';

import { useState, useEffect } from 'react';

interface Code {
  id: string;
  instituteEmail: string;
  instituteNumber: number;
  code: string;
  receivedAt: string;
  emailSubject: string;
  used: boolean;
}

interface GroupedCodes {
  [date: string]: Code[];
}

export default function AdminCodesClient() {
  const [codes, setCodes] = useState<Code[]>([]);
  const [groupedCodes, setGroupedCodes] = useState<GroupedCodes>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [presenterMode, setPresenterMode] = useState<boolean>(false);
  const [presenterStartTime, setPresenterStartTime] = useState<Date | null>(null);
  const [newCodesCount, setNewCodesCount] = useState<number>(0);
  
  useEffect(() => {
    fetchCodes();
    
    // Set up auto-refresh every 15 seconds (more frequent for presenter mode)
    const intervalId = setInterval(fetchCodes, 15000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    // Group codes by date when codes change
    groupCodesByDate();
    
    // Count new codes if in presenter mode
    if (presenterMode && presenterStartTime) {
      const newCodes = codes.filter(code => 
        new Date(code.receivedAt) > presenterStartTime
      );
      setNewCodesCount(newCodes.length);
    }
  }, [codes, presenterMode, presenterStartTime]);
  
  const fetchCodes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/codes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch codes');
      }
      
      const data = await response.json();
      setCodes(data.codes);
    } catch (err) {
      setError('Error fetching codes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const groupCodesByDate = () => {
    const grouped: GroupedCodes = {};
    
    // Filter codes if in presenter mode
    const filteredCodes = presenterMode && presenterStartTime 
      ? codes.filter(code => new Date(code.receivedAt) > presenterStartTime)
      : codes;
    
    filteredCodes.forEach(code => {
      // Format date as YYYY-MM-DD
      const date = new Date(code.receivedAt).toISOString().split('T')[0];
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      
      grouped[date].push(code);
    });
    
    // Sort dates in descending order (newest first)
    const sortedGrouped: GroupedCodes = {};
    Object.keys(grouped)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .forEach(date => {
        // Sort codes by time (newest first)
        grouped[date].sort((a, b) => 
          new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
        );
        sortedGrouped[date] = grouped[date];
      });
    
    setGroupedCodes(sortedGrouped);
  };
  
  const togglePresenterMode = () => {
    if (!presenterMode) {
      // Starting presenter mode
      setPresenterMode(true);
      const now = new Date();
      setPresenterStartTime(now);
      // Reset new codes count
      setNewCodesCount(0);
    } else {
      // Stopping presenter mode
      setPresenterMode(false);
      setPresenterStartTime(null);
      setNewCodesCount(0);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          ChatGPT 2FA Kódy
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={togglePresenterMode}
            className={`px-6 py-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium ${
              presenterMode 
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
          >
            {presenterMode ? (
              <>
                <span className="mr-2">●</span>
                Ukončit sledování
              </>
            ) : (
              'Začít sledovat nové kódy'
            )}
          </button>
          
          <button
            onClick={fetchCodes}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            disabled={loading}
          >
            {loading ? 'Načítání...' : 'Obnovit'}
          </button>
        </div>
      </div>
      
      {presenterMode && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-md text-blue-800 font-medium">
                Režim prezentace aktivní
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Zobrazují se pouze kódy přijaté od {presenterStartTime?.toLocaleTimeString()}
              </p>
              {newCodesCount > 0 && (
                <p className="text-sm font-bold text-blue-800 mt-1">
                  Nové kódy od začátku sledování: {newCodesCount}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading && codes.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500 text-lg">Načítání kódů...</p>
        </div>
      ) : Object.keys(groupedCodes).length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          {presenterMode ? (
            <div>
              <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="mt-4 text-gray-500 text-xl">Zatím žádné nové kódy od začátku sledování.</p>
              <p className="mt-2 text-gray-400">Kódy se zobrazí automaticky, jakmile budou přijaty.</p>
            </div>
          ) : (
            <p className="text-gray-500 text-xl">Žádné kódy nebyly nalezeny.</p>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <p className="text-md text-gray-700">
              Celkem nalezeno: <span className="font-bold text-lg">{
                presenterMode && presenterStartTime 
                  ? codes.filter(code => new Date(code.receivedAt) > presenterStartTime).length
                  : codes.length
              }</span> kódů
            </p>
            <p className="text-md text-gray-700">
              Poslední aktualizace: <span className="font-bold">{new Date().toLocaleTimeString()}</span>
            </p>
          </div>
          
          {Object.entries(groupedCodes).map(([date, dateCodes]) => (
            <div key={date} className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                {formatDate(date)} <span className="text-gray-500 text-lg font-normal ml-2">({dateCodes.length} kódů)</span>
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Kód
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Čas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dateCodes.map((code) => (
                      <tr key={code.id} className="hover:bg-gray-50">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-lg font-medium text-gray-900">{code.instituteEmail}</span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="font-mono text-2xl font-bold text-blue-800">{code.code}</span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-lg text-gray-700">{new Date(code.receivedAt).toLocaleTimeString()}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
