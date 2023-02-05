import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthService } from '../services/AuthService'

const RequireAuth = ({ rolesGranted }) => {
  const isGranted = AuthService.isGranted();
  const location = useLocation();
  console.log(isGranted);

  return (
    isGranted?.find(roles => rolesGranted.includes(roles))
    ? <Outlet/>
    : <Navigate to={"/"}  state={{ form: location }} replace={true} />
  );
}

export default RequireAuth;