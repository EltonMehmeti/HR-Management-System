import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getUserFromCookies = () => {
      const userData = Cookies.get('user');
      const token = Cookies.get('token');
      let parsedUser = null;
      let parsedToken = null;
  
      if (userData) {
        try {
          parsedUser = JSON.parse(userData); // Attempt to parse JSON
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }

      if (token) {
        parsedToken = token; // No parsing needed if it's a simple string
      }
  
      setUser(parsedUser); // Set the parsed user
      setToken(parsedToken); // Set the token
    };

    getUserFromCookies();
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
