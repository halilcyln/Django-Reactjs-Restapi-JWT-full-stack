import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';



function Navbar() {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState("")
  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    setToken(isLoggedIn);
    if(token){
      const decodedToken = jwtDecode(token)
      const username = decodedToken.username
      setUsername(username)
    }
  }, [location.pathname, token]); // Sayfa değişikliği veya token değişikliği olduğunda useEffect çalışır

  const handleClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setToken(''); // Token'ı sıfırla
    navigate("Card/")
  };

  return (
    <div>
      <nav className="bg-gray-950 border-gray-200 dark:bg-gray-900 h-16">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
           
          <span className="flex text-white items-center self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
  <img src="../public/logo.jpg" className="h-8 mr-2" alt="Flowbite Logo" />
  FilmVerse
</span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto "
            id="navbar-default"
          >
            <ul className="font-medium bg-dark flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token ? (
                <li className='flex items-center  '>
                <h2 className='mx-8 text-white' > Merhaba {username}  </h2>
                  <button onClick={handleClick} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-white">Logout</button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/Login" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                  </li>
                  <li>
                    <Link to="/Register" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/Card" className="block py-2 px-3 text-white  rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
