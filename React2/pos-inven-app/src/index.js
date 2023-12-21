// import React, {useEffect} from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { AuthProvider } from './context/AuthContext';
// import { verifyToken } from '../src/authutil/authUtils';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// const Root = () => {
//   useEffect(() => {
//     // Check if the user is authenticated on page load
//     const token = localStorage.getItem('authToken');

//     const checkAuthStatus = async () => {
//       if (token) {
//         const isAuthenticated = await verifyToken(token);

//         if (!isAuthenticated) {
//           // Handle the case where the token is invalid
//           // For example, redirect to the login page
//           window.location.href = '/';
//         }
//       }
//     };

//     checkAuthStatus();
//   }, []);

// root.render(
//   <AuthProvider>
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
//   </AuthProvider>
// );

// };
// root.render(<Root />);
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { verifyToken } from '../src/authutil/authUtils';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Root = () => {
  useEffect(() => {
    // Check if the user is authenticated on page load
    const token = localStorage.getItem('authToken');

    const checkAuthStatus = async () => {

      console.log('Checking authentication status');
      if (token) {
        const isAuthenticated = await verifyToken(token);
        console.log('Is Authenticated:', isAuthenticated);

        if (!isAuthenticated) {
          // Handle the case where the token is invalid
          // For example, redirect to the login page
          console.log('Redirecting to login page');
          window.location.href = '/';
        }
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  );
};

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
