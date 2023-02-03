import React from 'react'
import jwtDecode from 'jwt-decode'
import Axios from './api/Axios'

const login = (data) => {
  return Axios.post('/api/login', data)
}

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

const getToken = () => {
  return localStorage.getItem('token');
}

const isGranted = () => {
  let token = localStorage.getItem('token')
  let decode = jwtDecode(token)
    return decode.roles;
}

export const AuthToken = {
  login, saveToken, logout, isLogged, getToken, isGranted
}