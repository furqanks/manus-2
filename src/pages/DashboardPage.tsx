import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Import icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
  </svg>
);

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

  // Mock data for dashboard
  const stats = [
    { label: 'Programs Shortlisted', value: 8 },
    { label: 'Documents Uploaded', value: 5 },
    { label: 'Emails Received', value: 12 },
    { label: 'Applications Submitted', value: 8 }
  ];

  const recentActivity = [
    { type: 'email', description: 'Email received from example@email.com', time: '1h ago' },
    { type: 'program', description: 'New program added to shortlist', time: '10h ago' },
    { type: 'document', description: 'Document "transcript.pdf" uploaded', time: '10h ago' }
  ];

  const shortlistedPrograms = [
    { name: 'Program A', institution: 'University X' },
    { name: 'Program B', institution: 'University Y' },
    { name: 'Program C', institution: 'University X' },
    { name: 'Program D', institution: 'University Z' }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src="/assets/logo.png" alt="Logo" className="h-8" />
          {!sidebarCollapsed && <span className="ml-2 text-lg font-medium">Program Pal</span>}
        </div>
        
        <nav className="mt-6">
          <a href="/dashboard" className="sidebar-item sidebar-item-active">
            <DashboardIcon />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </a>
          <a href="/documents" className="sidebar-item">
            <DocumentIcon />
            {!sidebarCollapsed && <span>Documents</span>}
          </a>
          <a href="/emails" className="sidebar-item">
            <EmailIcon />
            {!sidebarCollapsed && <span>Emails</span>}
          </a>
          <a href="/settings" className="sidebar-item">
            <SettingsIcon />
            {!sidebarCollapsed && <span>Settings</span>}
          </a>
          
          <button onClick={logout} className="sidebar-item mt-auto">
            <LogoutIcon />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
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
              <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="theme-toggle">
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
              
              <div className="relative">
                <button className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="ml-2">{user?.email || 'User'}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          {/* Welcome banner */}
          <div className="bg-primary-600 text-white rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold">Welcome, {user?.email?.split('@')[0] || 'User'}!</h2>
            <p className="mt-1">Here's an overview of your progress.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent activity and shortlisted programs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent activity */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
              </div>
              <div className="card-body">
                {recentActivity.length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {activity.type === 'email' && <EmailIcon />}
                            {activity.type === 'program' && <DashboardIcon />}
                            {activity.type === 'document' && <DocumentIcon />}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-700 dark:text-gray-300">{activity.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>

            {/* Shortlisted programs */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shortlisted Programs</h3>
              </div>
              <div className="card-body">
                {shortlistedPrograms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {shortlistedPrograms.map((program, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white">{program.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{program.institution}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No programs shortlisted</p>
                )}
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">View all programs</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
