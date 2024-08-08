// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '@material-tailwind/react'; // Ensure you import the Button component from Material Tailwind
import logo from '../assets/zenithlogo3.png';

const Navbar = ({ isAuthenticated, connectWallet, disconnectWallet }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="mx-auto flex items-center justify-between py-3">
      <div className="flex flex-shrink-0 items-center">
        <img src={logo} alt="MyLogo" className="mx-2 w-24 h-24" />
      </div>
      <div className="hidden md:flex m-8 items-center justify-center gap-4 text-xl">
        {isAuthenticated ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/marketplace"
              className={({ isActive }) =>
                `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
              }
            >
              MarketPlace
            </NavLink>
            <NavLink
              to="/stream"
              className={({ isActive }) =>
                `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
              }
            >
              Stream
            </NavLink>
            <NavLink
              to="/achievements"
              className={({ isActive }) =>
                `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
              }
            >
              Achievements
            </NavLink>
            <Button
              variant="filled"
              color="blue"
              onClick={disconnectWallet}
              className="p-2 bg-red-600"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            color="blue"
            onClick={connectWallet}
            className="p-2"
          >
            Connect Wallet
          </Button>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={toggleSidebar}>
          <FaBars className="text-3xl text-white" />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-neutral-950 text-white z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <img src={logo} alt="MyLogo" className="w-24 h-24" />
          <button onClick={toggleSidebar}>
            <FaTimes className="text-2xl text-white" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col space-y-4">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
                }
                onClick={toggleSidebar}
              >
                Profile
              </NavLink>
              <NavLink
                to="/marketplace"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
                }
                onClick={toggleSidebar}
              >
                MarketPlace
              </NavLink>
              <NavLink
                to="/stream"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
                }
                onClick={toggleSidebar}
              >
                Stream
              </NavLink>
              <NavLink
                to="/achievements"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`
                }
                onClick={toggleSidebar}
              >
                Achievements
              </NavLink>
              <Button
                variant="filed"
                color="blue"
                onClick={disconnectWallet}
                className="p-2 bg-red-600 text-base"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="blue"
              onClick={connectWallet}
              className="p-2"
            >
              Connect Wallet
            </Button>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
