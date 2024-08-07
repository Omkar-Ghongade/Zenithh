// src/components/Stream.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Stream() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stream</h1>
      <nav className="mb-4">
        <NavLink
          to="/stream/music"
          className={({ isActive }) => `mr-4 p-2 ${isActive ? 'text-blue-500' : 'text-white'}`}
        >
          Stream Music
        </NavLink>
        <NavLink
          to="/stream/upload"
          className={({ isActive }) => `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`}
        >
          Upload Music
        </NavLink>
      </nav>
    </div>
  );
}
