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

const ComposeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
  </svg>
);

const ReplyIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
  </svg>
);

const EmailPage: React.FC = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    body: ''
  });

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

  // Handle compose form change
  const handleComposeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComposeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle compose form submit
  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the email
    console.log('Sending email:', composeData);
    setShowComposeModal(false);
    setComposeData({ to: '', subject: '', body: '' });
  };

  // Mock email data
  const emails = [
    {
      id: '1',
      from: 'john.smith@example.com',
      fromName: 'John Smith',
      subject: 'Meeting Reminder',
      body: 'Hi,\n\nConfirming our meeting tomorrow at 2pm. Let us know if there are any issues.\n\nBest regards,\nJohn Smith',
      date: '2025-05-28T10:21:00',
      read: false,
      folder: 'inbox'
    },
    {
      id: '2',
      from: 'david.brown@example.com',
      fromName: 'David Brown',
      subject: 'Contract Review',
      body: 'Hello,\n\nPlease find attached the contract for your review. Let me know if you have any questions.\n\nRegards,\nDavid Brown',
      date: '2025-05-27T14:35:00',
      read: true,
      folder: 'inbox'
    },
    {
      id: '3',
      from: 'emily.wilson@example.com',
      fromName: 'Emily Wilson',
      subject: 'Project Update',
      body: 'Hi team,\n\nHere\'s the latest update on the project. We\'re on track to meet our deadline.\n\nEmily',
      date: '2025-05-25T09:12:00',
      read: true,
      folder: 'inbox'
    },
    {
      id: '4',
      from: 'terry.hammon@example.com',
      fromName: 'Terry Hammon',
      subject: 'Question about Program',
      body: 'Hello,\n\nI have a question about the program requirements. Can you clarify the prerequisites?\n\nThanks,\nTerry',
      date: '2025-05-22T16:45:00',
      read: true,
      folder: 'inbox'
    },
    {
      id: '5',
      from: 'tim.stortk@example.com',
      fromName: 'Tim Stortk',
      subject: 'Education Resources',
      body: 'Hi,\n\nI wanted to share some educational resources that might be helpful for your program search.\n\nBest,\nTim',
      date: '2025-05-20T11:30:00',
      read: true,
      folder: 'inbox'
    },
    {
      id: '6',
      from: 'richard.howan@example.com',
      fromName: 'Richard Howan',
      subject: 'Technical Interview',
      body: 'Hello,\n\nI\'d like to schedule a technical interview for next week. Please let me know your availability.\n\nRegards,\nRichard',
      date: '2025-05-19T08:15:00',
      read: true,
      folder: 'inbox'
    },
    {
      id: '7',
      from: 'you@example.com',
      fromName: 'You',
      subject: 'Application Status',
      body: 'Hello,\n\nI\'m writing to inquire about the status of my application submitted last week.\n\nThank you,\nYour Name',
      date: '2025-05-26T15:20:00',
      read: true,
      folder: 'sent'
    },
    {
      id: '8',
      from: 'you@example.com',
      fromName: 'You',
      subject: 'Request for Information',
      body: 'Hello,\n\nI\'m interested in learning more about your program. Could you please send me additional information?\n\nThank you,\nYour Name',
      date: '2025-05-24T10:10:00',
      read: true,
      folder: 'sent'
    }
  ];

  // Filter emails based on selected folder and search query
  const filteredEmails = emails.filter(email => 
    email.folder === selectedFolder && 
    (email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
     email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
     email.body.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get selected email
  const selectedEmailData = emails.find(email => email.id === selectedEmail);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // AI reply suggestions
  const getAIReplySuggestions = () => {
    if (!selectedEmailData) return [];
    
    // In a real app, these would come from an AI service
    return [
      "Thank you for the information. I'll review it and get back to you soon.",
      "I'm available for a meeting tomorrow. What time works best for you?",
      "Could you please provide more details about this request?",
      "I've received your email and will look into this matter promptly."
    ];
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
            <DashboardIcon />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </a>
          <a href="/documents" className="sidebar-item">
            <DocumentIcon />
            {!sidebarCollapsed && <span>Documents</span>}
          </a>
          <a href="/emails" className="sidebar-item sidebar-item-active">
            <EmailIcon />
            {!sidebarCollapsed && <span>Emails</span>}
          </a>
          <a href="/settings" className="sidebar-item">
            <SettingsIcon />
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
              <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">Email</h1>
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
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Email content */}
        <div className="flex h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
          {/* Email sidebar */}
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="p-4">
              <button
                onClick={() => setShowComposeModal(true)}
                className="btn btn-primary w-full"
              >
                <ComposeIcon />
                <span>Compose</span>
              </button>
            </div>
            
            <nav className="mt-2">
              <button
                onClick={() => setSelectedFolder('inbox')}
                className={`flex items-center justify-between w-full px-4 py-2 text-left ${
                  selectedFolder === 'inbox'
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span>Inbox</span>
                </div>
                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-medium px-2 py-0.5 rounded-full">
                  {emails.filter(email => email.folder === 'inbox' && !email.read).length}
                </span>
              </button>
              
              <button
                onClick={() => setSelectedFolder('sent')}
                className={`flex items-center w-full px-4 py-2 text-left ${
                  selectedFolder === 'sent'
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                <span>Sent</span>
              </button>
              
              <button
                onClick={() => setSelectedFolder('drafts')}
                className={`flex items-center w-full px-4 py-2 text-left ${
                  selectedFolder === 'drafts'
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                </svg>
                <span>Drafts</span>
              </button>
              
              <button
                onClick={() => setSelectedFolder('trash')}
                className={`flex items-center w-full px-4 py-2 text-left ${
                  selectedFolder === 'trash'
                    ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <span>Trash</span>
              </button>
            </nav>
          </div>

          {/* Email list */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              {filteredEmails.length > 0 ? (
                filteredEmails.map(email => (
                  <button
                    key={email.id}
                    onClick={() => setSelectedEmail(email.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-200 dark:border-gray-700 ${
                      selectedEmail === email.id
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : email.read
                        ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                        : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm ${email.read ? 'font-normal text-gray-900 dark:text-white' : 'font-semibold text-gray-900 dark:text-white'}`}>
                        {selectedFolder === 'sent' ? email.fromName : email.fromName}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(email.date)}
                      </span>
                    </div>
                    <p className={`text-sm ${email.read ? 'font-normal text-gray-900 dark:text-white' : 'font-semibold text-gray-900 dark:text-white'}`}>
                      {email.subject}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                      {email.body.split('\n')[0]}
                    </p>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No emails found
                </div>
              )}
            </div>
          </div>

          {/* Email content */}
          <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
            {selectedEmailData ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedEmailData.subject}
                    </h2>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
                        {selectedEmailData.fromName.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedEmailData.fromName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedEmailData.from}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedEmailData.date).toLocaleString()}
                  </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-6">
                  {selectedEmailData.body.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex space-x-2 mb-4">
                    <button className="btn btn-primary">
                      <ReplyIcon />
                      <span>Reply</span>
                    </button>
                    <button className="btn btn-outline">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"></path>
                      </svg>
                      <span>Forward</span>
                    </button>
                    <button className="btn btn-outline text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <DeleteIcon />
                      <span>Delete</span>
                    </button>
                  </div>
                  
                  {/* AI Reply Suggestions */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      AI Reply Suggestions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getAIReplySuggestions().map((suggestion, index) => (
                        <button
                          key={index}
                          className="text-left p-3 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No email selected</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Select an email from the list to view its contents.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                New Message
              </h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleComposeSubmit}>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    To
                  </label>
                  <input
                    type="email"
                    id="to"
                    name="to"
                    className="input"
                    placeholder="recipient@example.com"
                    value={composeData.to}
                    onChange={handleComposeChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="input"
                    placeholder="Email subject"
                    value={composeData.subject}
                    onChange={handleComposeChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    rows={8}
                    className="input"
                    placeholder="Write your message here..."
                    value={composeData.body}
                    onChange={handleComposeChange}
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="btn btn-outline mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailPage;
