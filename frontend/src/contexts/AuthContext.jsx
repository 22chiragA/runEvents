// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(() => {
//     const savedToken = localStorage.getItem('token');
//     if (savedToken) {
//       try {
//         return jwtDecode(savedToken);
//       } catch (e) {
//         return null;
//       }
//     }
//     return null;
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Basic initialization
//     setLoading(false);
//   }, [token]);

//   const login = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//     try {
//       const decoded = jwtDecode(newToken);
//       setUser(decoded);
//     } catch (e) {
//       setUser(null);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   };

//   const value = {
//     token,
//     user,
//     setUser,
//     login,
//     logout,
//     isAuthenticated: !!token
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {

//   const [token, setToken] = useState(localStorage.getItem("token"));

//   const [user, setUser] = useState(() => {

//     const savedToken = localStorage.getItem("token");

//     if (savedToken) {

//       try {

//         const decoded = jwtDecode(savedToken);

//         // map sub → id for easier usage
//         return {
//           id: decoded.sub,
//           email: decoded.email,
//           role: decoded.role,

//         };

//       } catch (e) {

//         return null;

//       }

//     }

//     return null;

//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(false);
//   }, [token]);

//   /* ---------------------- */
//   /* LOGIN FUNCTION */
//   /* ---------------------- */

//   const login = (newToken) => {

//     localStorage.setItem("token", newToken);

//     setToken(newToken);

//     try {

//       const decoded = jwtDecode(newToken);

//       const userData = {
//         id: decoded.sub,
//         email: decoded.email,
//         role: decoded.role,
//         exp: decoded.exp
//       };

//       setUser(userData);

//     } catch (e) {

//       setUser(null);

//     }

//   };

//   /* ---------------------- */
//   /* LOGOUT FUNCTION */
//   /* ---------------------- */

//   const logout = () => {

//     localStorage.removeItem("token");

//     setToken(null);
//     setUser(null);

//   };

//   const value = {
//     token,
//     user,
//     setUser,
//     login,
//     logout,
//     isAuthenticated: !!token
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );

// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(() => {

    const savedToken = localStorage.getItem("token");

    if (savedToken) {

      try {

        const decoded = jwtDecode(savedToken);

        return {
          id: Number(decoded.userId),
          email: decoded.email,
          role: decoded.role
        };

      } catch (e) {
        return null;
      }

    }

    return null;

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [token]);

  /* LOGIN */

  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    try {

      const decoded = jwtDecode(newToken);

      const userData = {
        id: Number(decoded.userId),
        email: decoded.email,
        role: decoded.role,
        exp: decoded.exp
      };

      setUser(userData);

    } catch (e) {
      setUser(null);
    }

  };

  /* LOGOUT */

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
    setUser(null);

  };

  const value = {
    token,
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );

};