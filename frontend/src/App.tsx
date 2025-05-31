import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UploadClaim from './UploadClaim'; // Your original App.tsx (renamed)
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page as the main route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Your existing upload claim functionality (unchanged) */}
          <Route path="/app" element={<UploadClaim />} />
          <Route path="/upload" element={<UploadClaim />} />
          <Route path="/claim" element={<UploadClaim />} />
          
          {/* Redirect any unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;