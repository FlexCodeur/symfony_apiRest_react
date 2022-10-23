import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthToken } from '../services/AuthToken'

const SecurityAuthenticator = ({children}) => {

  if(!AuthToken.isLogged()){
    return <Navigate to={"/"} />
  }

  return children
};

export default SecurityAuthenticator;