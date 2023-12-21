// import React, {useState, useContext, useEffect} from 'react'

// const AuthContext = React.createContext({
//     authUser: null,
//   setAuthUser: () => {},
//   isLoggedIn: false,
//   setisLoggedIn: () => {}
// })

// export function useAuth(){
//     return useContext(AuthContext);

// }

// export function AuthProvider(props){
//     const [authUser, setAuthUser] = useState(null)
//     const [isLoggedIn, setisLoggedIn] = useState(false)

//     const value = {
//         authUser,
//         setAuthUser,
//         isLoggedIn,
//         setisLoggedIn 
//     }

//     return(
//         <AuthContext.Provider value ={value}>{props.children}</AuthContext.Provider>
//     )
// }


import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* your login data */ }),
      });

      

      if (response.ok) {
        const userData = await response.json();

        console.log('User data after successful login:', userData);

        console.log("Userdata:" + userData)
        localStorage.setItem('authToken', userData.token);

        setAuthUser(userData.user);
        setLoggedIn(true);
      } else {
        // Handle login failure
        console.log("Error during login:", response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthUser(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      console.log('authToken:', authToken);
//       const decodedToken = jwt.decode(authToken);
// const expirationTime = decodedToken ? decodedToken.exp * 1000 : 0;
// console.log('Token expiration time:', new Date(expirationTime));



      if (authToken) {
        // Make a request to authenticate the user using the token
        try {
          const response = await fetch('/api/authenticate', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setAuthUser(userData.user);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        } catch (error) {
          console.error('Authentication error:', error);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  const contextValue = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setLoggedIn,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};