import React, { useEffect, useState, useRef } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import { toggleGptSearchView } from './utils/GptSlice';
import { changeLanguage } from './utils/configSlice';
import { LOGO, PROFILELOGO } from './utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);
  const isGptOpen = useSelector((store) => store.gpt.showGptSearch);
  const currentLanguage = useSelector((store) => store.config.lang);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (window.location.pathname === '/' || window.location.pathname === '/login') {
          navigate('/browse');
        }
      } else {
        dispatch(removeUser());
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
          navigate('/');
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).catch(console.error);
  };

  const handleGptClick = () => {
    dispatch(toggleGptSearchView());
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-2  bg-opacity-90 flex justify-between items-center">
      <img className="w-28 sm:w-36 md:w-44" src={LOGO} alt="Netflix Logo" />

      {user && (
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
          
          <a
            href="#"
            className="hidden sm:inline text-white text-sm sm:text-base hover:underline"
          >
            Children
          </a>

          
          <button
            className="hidden sm:inline text-white text-xl hover:text-gray-400"
            title="Notifications"
          >
            🔔
          </button>

          
          {isGptOpen && (
            <select
              onChange={handleLangChange}
              value={currentLanguage}
              className="p-2 text-sm rounded-lg border border-gray-300 bg-white text-black shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hindi">Hindi</option>
              <option value="french">French</option>
              <option value="spanish">Spanish</option>
            </select>
          )}

        
          <button
            onClick={handleGptClick}
            className="py-2 px-3 bg-red-600 text-white text-sm sm:text-base whitespace-nowrap rounded-lg hover:bg-red-700 transition duration-200"
          >
            {isGptOpen ? "Homepage" : "GPT Search"}
          </button>

        
          <div className="relative" ref={dropdownRef}>
            <img
              src={PROFILELOGO}
              alt="Profile"
              onClick={toggleDropdown}
              className="w-10 h-10 md:w-11 md:h-11 rounded cursor-pointer border-2 border-white hover:border-red-500"
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded shadow-lg text-white py-2 z-50">
                <p className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Manage Profiles</p>
                <p className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Transfer Profile</p>
                <p className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Account</p>
                <p className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Help Centre</p>
                <hr className="border-gray-700 my-1" />
                <p
                  onClick={handleSignOut}
                  className="px-4 py-2 hover:bg-red-700 cursor-pointer"
                >
                  Sign Out
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
