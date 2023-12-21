

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function PrivateRoute({ children, ...props }) {
//   const { authUser } = useAuth();

//   return authUser ? (
//     <Route {...props}>{children}</Route>
//   ) : (
//     <Navigate to="/" replace state={{ from: props.location }} />
//   );
// }

// export default PrivateRoute;

import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../loading/LoadingSpinner';

function PrivateRoute({ children}) {
  const { authUser, loading } = useAuth();

  const role = localStorage.getItem('userRole');

console.log("userRole from PrivateRoute is:" + role)
console.log("authUser from PrivateRoute is:", authUser);
console.log("loading from PrivateRoute is:", loading);

if (loading) {
  console.log("Loading, rendering spinner...");
  return <LoadingSpinner />;
}


  if (authUser || role === 'admin' || role === 'cashier' || role === 'boardMember') {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}



export default PrivateRoute;

