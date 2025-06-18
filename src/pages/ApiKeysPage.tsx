import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Icons
const KeyIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"></path>
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path>
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
  </svg>
);

const ApiKeysPage: React.FC = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // API key states
  const [gptApiKey, setGptApiKey] = useState('');
  const [perplexityApiKey, setPerplexityApiKey] = useState('');
  const [scoreboardApiKey, setScoreboardApiKey] = useState('');
  
  // Show/hide password states
  const [showGptKey, setShowGptKey] = useState(false);
  const [showPerplexityKey, setShowPerplexityKey] = useState(false);
  const [showScoreboardKey, setShowScoreboardKey] = useState(false);
  
  // Status message
  const [statusMessage, setStatusMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Initialize dark mode based on user preference
  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Fetch existing API keys if available
    fetchApiKeys();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Fetch existing API keys
  const fetchApiKeys = async () => {
    try {
      // In a real implementation, this would make an API call to your backend
      // For demo purposes, we'll simulate fetching masked keys
      setTimeout(() => {
        // These would be masked keys from your backend
        setGptApiKey('sk-••••••••••••••••••••••••');
        setPerplexityApiKey('pplx-••••••••••••••••••••••••');
        setScoreboardApiKey('sb-••••••••••••••••••••••••');
      }, 500);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };
  
  // Save API keys
  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    
    try {
      // In a real implementation, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatusMessage({
        type: 'success',
        text: 'API keys saved successfully!'
      });
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to save API keys. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src="/assets/logo.png" alt="Logo" className="h-8" />
          {!sidebarCollapsed && <span className="ml-2 text-lg font-medium">Program Pal</span>}
        </div>
        
        <nav className="mt-6">
          <a href="/dashboard" className="sidebar-item">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
            </svg>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </a>
          <a href="/documents" className="sidebar-item">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
            </svg>
            {!sidebarCollapsed && <span>Documents</span>}
          </a>
          <a href="/emails" className="sidebar-item">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            {!sidebarCollapsed && <span>Emails</span>}
          </a>
          <a href="/api-keys" className="sidebar-item sidebar-item-active">
            <KeyIcon />
            {!sidebarCollapsed && <span>API Keys</span>}
          </a>
          <a href="/settings" className="sidebar-item">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
            </svg>
            {!sidebarCollapsed && <span>Settings</span>}
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'content-expanded' : 'content'}`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">API Keys</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="theme-toggle">
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>
              
              <div className="relative">
                <button className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* API Keys content */}
        <main className="p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Manage API Keys</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Your API keys are stored securely and used to power the AI features of Program Pal Pathfinder.
                </p>
              </div>
              
              {statusMessage && (
                <div className={`px-6 py-4 ${statusMessage.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'}`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {statusMessage.type === 'success' ? (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{statusMessage.text}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSaveKeys} className="px-6 py-4">
                <div className="space-y-6">
                  {/* GPT API Key */}
                  <div>
                    <label htmlFor="gpt-api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      OpenAI GPT API Key
                    </label>
                    <div className="relative">
                      <input
                        id="gpt-api-key"
                        type={showGptKey ? 'text' : 'password'}
                        value={gptApiKey}
                        onChange={(e) => setGptApiKey(e.target.value)}
                        className="input pr-10"
                        placeholder="sk-..."
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => setShowGptKey(!showGptKey)}
                      >
                        {showGptKey ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">OpenAI's dashboard</a>
                    </p>
                  </div>
                  
                  {/* Perplexity API Key */}
                  <div>
                    <label htmlFor="perplexity-api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Perplexity.ai API Key
                    </label>
                    <div className="relative">
                      <input
                        id="perplexity-api-key"
                        type={showPerplexityKey ? 'text' : 'password'}
                        value={perplexityApiKey}
                        onChange={(e) => setPerplexityApiKey(e.target.value)}
                        className="input pr-10"
                        placeholder="pplx-..."
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => setShowPerplexityKey(!showPerplexityKey)}
                      >
                        {showPerplexityKey ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Get your API key from <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Perplexity's API settings</a>
                    </p>
                  </div>
                  
                  {/* Scoreboard API Key */}
                  <div>
                    <label htmlFor="scoreboard-api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Scoreboard API Key
                    </label>
                    <div className="relative">
                      <input
                        id="scoreboard-api-key"
                        type={showScoreboardKey ? 'text' : 'password'}
                        value={scoreboardApiKey}
                        onChange={(e) => setScoreboardApiKey(e.target.value)}
                        className="input pr-10"
                        placeholder="sb-..."
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => setShowScoreboardKey(!showScoreboardKey)}
                      >
                        {showScoreboardKey ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Get your API key from the Scoreboard dashboard
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save API Keys'}
                  </button>
                </div>
              </form>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Security Information</h3>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li className="flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Your API keys are encrypted before being stored in our database
                  </li>
                  <li className="flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Keys are only used server-side and never exposed to other users
                  </li>
                  <li className="flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    All API requests are made over HTTPS with TLS encryption
                  </li>
                  <li className="flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-1.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    You can revoke and update your API keys at any time
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiKeysPage;
