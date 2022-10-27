import React from 'react'
import jwtDecode from 'jwt-decode'

const saveToken = (token) => {
  localStorage.setItem('token', token);
}

const logout = () => {
  localStorage.removeItem('token');
}

const isLogged = () => {
  let token = localStorage.getItem('token');
  return !!token;
}

const isGranted = () => {
  let token = localStorage.getItem('token')
  let decode = jwtDecode(token)
    return decode.roles;
}

export const AuthToken = {
  saveToken, logout, isLogged, isGranted
}