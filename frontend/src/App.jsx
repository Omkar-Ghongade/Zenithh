import React, { useState, useEffect } from 'react';
import Achievements from './components/Achievements';
import Login from './components/Login';
import MarketPlace from './components/MarketPlace';
import Profile from './components/Profile';
import Stream from './components/Stream';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const balanceResponse = await window.fewcha.getBalance();
        // console.log('Balance:', balanceResponse);
        if(balanceResponse.data !== undefined) 
          setBalance(balanceResponse.data);
      } catch (error) {
        console.error('Error connecting or fetching balance:', error);
      }
    }
    fetchBalance();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={balance !== null ? <Profile /> : <Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/stream" element={<Stream />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </BrowserRouter>
  );
}