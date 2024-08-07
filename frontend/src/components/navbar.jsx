import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/zenithlogo.png';
import Achievements from '../components/Achievements';
import Login from '../components/Login';
import MarketPlace from '../components/MarketPlace';
import Profile from '../components/Profile';
import Stream from '../components/Stream';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <nav className="mx-auto mb-12 flex items-center justify-between py-3">
        <div className="flex flex-shrink-0 items-center">
          <img src={logo} alt="MyLogo" className="mx-2 w-10 h-10" />
        </div>
        <div className="hidden md:flex m-8 items-center justify-center gap-4 text-xl">
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
        </div>
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            <FaBars className="text-3xl text-white" />
          </button>
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-neutral-950 text-white z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <img src={logo} alt="MyLogo" className="w-10 h-10" />
          <button onClick={toggleSidebar}>
            <FaTimes className="text-2xl text-white" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col space-y-4">
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
        </nav>
      </div>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/stream" element={<Stream />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
