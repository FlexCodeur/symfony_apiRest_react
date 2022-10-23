import React, { useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { AuthToken } from '../services/AuthToken'
import { useNavigate } from 'react-router-dom'

const AuthFormType = () => {

  const navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(true);


  const decodeToken = (token) => {
    let decode;
    if (token) {
      decode = jwtDecode(token)
      return console.log(decode.roles);
    }
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const authHandler = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login', user)
      .then((response) =>
        AuthToken.saveToken(response.data.token),
        // console.log(response.data.token),
        setLoading(false),
        navigate("/")
      )
  };


  return (
    <div className="container">
      <form onSubmit={authHandler}>
        <div className="form-control bg-transparent">
          <label htmlFor={"username"}>Email</label>
          <input type="email" name={"username"} id={'username'} onChange={handleChange} value={user.username}/>
        </div>
        <div className="form-control bg-transparent">
          <label htmlFor={"password"}>Password</label>
          <input type="password" id={'password'} name={"password"} onChange={handleChange} value={user.password}/>
        </div>
        <button className={"btn btn-secondary"} type={"submit"}>Envoyer</button>
      </form>
    </div>
  );
}

export default AuthFormType;