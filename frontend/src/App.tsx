import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RulesetList from './pages/rules/RulesetList';
import RulesetDetail from './pages/rules/RulesetDetail';
import RuleEditor from './pages/rules/RuleEditor';
import DataDictionaryList from './pages/dataDictionary/DataDictionaryList';
import FeatureList from './pages/features/FeatureList';
import ModelList from './pages/models/ModelList';
import ChangeRequestList from './pages/makerChecker/ChangeRequestList';
import EfficacyDashboard from './pages/efficacy/EfficacyDashboard';
import UserManagement from './pages/admin/UserManagement';
import AuditLogs from './pages/admin/AuditLogs';

// Store
import { store } from './store';

// Create MUI theme with banking-appropriate colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
      light: '#4791db',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Protected Route Component (simplified for demo)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // For demo purposes, always authenticated
  const isAuthenticated = true;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Rule Management */}
              <Route path="/rulesets" element={<RulesetList />} />
              <Route path="/rulesets/:id" element={<RulesetDetail />} />
              <Route path="/rulesets/:rulesetId/rules/new" element={<RuleEditor />} />
              <Route path="/rulesets/:rulesetId/rules/:ruleId/edit" element={<RuleEditor />} />

              {/* Data Dictionary */}
              <Route path="/data-dictionary" element={<DataDictionaryList />} />
              <Route path="/data-dictionary/:id" element={<DataDictionaryList />} />

              {/* Features */}
              <Route path="/features" element={<FeatureList />} />

              {/* Models */}
              <Route path="/models" element={<ModelList />} />

              {/* Maker-Checker */}
              <Route path="/approvals" element={<ChangeRequestList />} />

              {/* Efficacy */}
              <Route path="/efficacy" element={<EfficacyDashboard />} />

              {/* Admin */}
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/audit-logs" element={<AuditLogs />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
