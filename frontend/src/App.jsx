// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Achievements from './components/Achievements';
import Login from './components/Login';
import MarketPlace from './components/MarketPlace';
import Profile from './components/Profile';
import Stream from './components/Stream';

export default function App() {
  const [balance, setBalance] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const balanceResponse = await window.fewcha.getBalance();
        if (balanceResponse.data !== undefined) {
          setBalance(balanceResponse.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error connecting or fetching balance:', error);
        setIsAuthenticated(false);
      }
    }
    fetchBalance();
  }, []);

  const connectWallet = async () => {
    try {
      await window.fewcha.connect();
      window.location.reload();
    } catch (error) {
      console.error('Error connecting or fetching balance:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.fewcha.disconnect();
      setIsAuthenticated(false);
      window.location.reload();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  return (
    <BrowserRouter>
      <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        <div className='container mx-auto px-8'>
          <Navbar isAuthenticated={isAuthenticated} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
        </div>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Profile /> : <Login connectWallet={connectWallet} />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login connectWallet={connectWallet} />} />
          <Route path="/marketplace" element={isAuthenticated ? <MarketPlace /> : <Login connectWallet={connectWallet} />} />
          <Route path="/stream" element={isAuthenticated ? <Stream /> : <Login connectWallet={connectWallet} />} />
          <Route path="/achievements" element={isAuthenticated ? <Achievements /> : <Login connectWallet={connectWallet} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
