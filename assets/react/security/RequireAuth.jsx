import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthToken } from '../services/AuthToken'

const RequireAuth = ({ rolesGranted }) => {
  const isGranted = AuthToken.isGranted();
  const location = useLocation();
  console.log(isGranted);

  return (
    isGranted?.find(roles => rolesGranted.includes(roles))
    ? <Outlet/>
    : <Navigate to={"/"}  state={{ form: location }} replace={true} />
  );
}

export default RequireAuth;