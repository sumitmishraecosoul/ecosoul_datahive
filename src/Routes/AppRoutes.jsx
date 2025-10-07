import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../Pages/Login.jsx'
import EcoSoulDashboard from '../Pages/EcoSoulDashboard.jsx'
import SCOverview from '../Pages/SCOverview.jsx'
import MarketingDashboard from '../Pages/MarketingDashboard.jsx'
import SalesDashboard from '../Pages/SalesDashboard.jsx'
import DemandProjection from '../Pages/DemandProjection.jsx'

const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true'
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes */}
      <Route
        path="/path-select"
        element={isAuthenticated() ? <EcoSoulDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated() ? <EcoSoulDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/ecosouldashboard"
        element={isAuthenticated() ? <EcoSoulDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/supplychain"
        element={isAuthenticated() ? <SCOverview /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/marketing"
        element={isAuthenticated() ? <MarketingDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/sales"
        element={isAuthenticated() ? <SalesDashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/demand"
        element={isAuthenticated() ? <DemandProjection /> : <Navigate to="/login" replace />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}


