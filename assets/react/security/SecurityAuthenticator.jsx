import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthService } from '../services/AuthService'

const SecurityAuthenticator = ({children}) => {

  if(!AuthService.isLogged()){
    return <Navigate to={"/"} />
  }

  return children
};

export default SecurityAuthenticator;