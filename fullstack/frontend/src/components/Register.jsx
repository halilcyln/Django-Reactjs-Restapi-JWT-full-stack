import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();



  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifreleri karşılaştır
    if (password !== repeatPassword) {
      console.error("Şifreler eşleşmiyor");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/users/register/", {
        username,
        password,
        email,
      });
      console.log(response.data);
      navigate("/login")
      
    } catch (error) {
      console.error("Kayıt sırasında bir hata oluştu");
    }
  }

  return (
    <div>
      <div className="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
        <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
          {/* Diğer JSX kodları */}
          <form className="p-12 md:p-24" onSubmit={handleSubmit}>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                {/* ... */}
              </svg>
              <input
                onChange={handleUsername}
                type="text"
                id="username"
                value={username}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Username"
              />
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                {/* ... */}
              </svg>
              <input
                onChange={handleEmail}
                type="text"
                id="email"
                value={email}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                {/* ... */}
              </svg>
              <input
                onChange={handlePassword}
                type="password"
                id="password"
                value={password}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                {/* ... */}
              </svg>
              <input
                onChange={handleRepeatPassword}
                type="password"
                id="repeatPassword"
                value={repeatPassword}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Repeat Password"
              />
            </div>
            {/* Diğer JSX kodları */}
            <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
