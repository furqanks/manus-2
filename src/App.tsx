import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './App.css';

// Import actual Page components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import EmailPage from './pages/EmailPage'; // Import EmailPage

const NotFoundPage = () => <div>404 Not Found</div>;

// Component to handle protected routes
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Component to handle public routes (redirect if already logged in)
const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Redirect from login/register to dashboard if already authenticated
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

function App() {
  // Check if we have an initial path from the SPA routing script
  React.useEffect(() => {
    if (window.__INITIAL_PATH__) {
      // Use history to navigate to the saved path
      window.history.replaceState(null, '', window.__INITIAL_PATH__);
      delete window.__INITIAL_PATH__;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (redirect if logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected routes (require authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/emails" element={<EmailPage />} /> {/* Add route for EmailPage */}
          {/* Add other protected routes here */}
        </Route>

        {/* Redirect root path - check auth status before redirecting */}
        <Route
          path="/"
          element={
            <NavigateToDashboardOrLogin />
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Helper component to handle root path redirection based on auth state
const NavigateToDashboardOrLogin: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

// Add this to make TypeScript happy with our custom window property
declare global {
  interface Window {
    __INITIAL_PATH__?: string;
  }
}

export default App;
