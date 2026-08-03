import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reflection from './pages/Reflection';
import Stats from './pages/Stats';
import Widget from './pages/Widget';

// Simple auth gate (always authenticated for this standalone version)
function AdminRoute({ children }) {
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/reflection" element={<AdminRoute><Reflection /></AdminRoute>} />
        <Route path="/stats" element={<AdminRoute><Stats /></AdminRoute>} />
        <Route path="/widget" element={<Widget />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
