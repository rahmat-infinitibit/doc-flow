import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Documents from './pages/Documents';
import Upload from './pages/Upload';
import KnowledgeStore from './pages/KnowledgeStore';
import FileExplorer from './pages/FileExplorer';
import Chat from './pages/Chat';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Help from './pages/Help';
import DocumentParsing from './pages/DocumentParsing';
import ProposalGeneration from './pages/ProposalGeneration';
import Templates from './pages/Templates';
import DocumentValidation from './pages/DocumentValidation';
import Notifications from './pages/Notifications';
import ActivityLog from './pages/ActivityLog';
import Profile from './pages/Profile';
import Salesforce from './pages/Salesforce';
import Editor from './pages/Editor';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { DarkModeToggle } from './components/DarkModeToggle';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <MainLayout>
            <DarkModeToggle />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/document-parsing" element={<DocumentParsing />} />
              <Route path="/document-validation" element={<DocumentValidation />} />
              <Route path="/proposal-generation" element={<ProposalGeneration />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/knowledge-store" element={<KnowledgeStore />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/file-explorer" element={<FileExplorer />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/team" element={<Team />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/activity" element={<ActivityLog />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/salesforce" element={<Salesforce />} />
            </Routes>
          </MainLayout>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;