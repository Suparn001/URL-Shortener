import './App.css'
import React from 'react'
import LandingPage from './components/LandingPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import RegisterPage from './components/RegisterPage.jsx'
import { Toaster } from 'react-hot-toast'
import LoginPage from './components/LoginPage.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Toaster position="bottom-order" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}
export default App
