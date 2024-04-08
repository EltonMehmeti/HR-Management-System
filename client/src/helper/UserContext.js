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
    if(userData){

        setUser(JSON.parse(userData));
    }
    if(token){

        setToken(token);
    }
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
