import React, { useState } from 'react'
import axios from 'axios'
import { AuthToken } from '../services/AuthToken'
import { useNavigate, Navigate } from 'react-router-dom'
import Loading from '../components/loading'

const AuthFormType = () => {

  const navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);

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
        setLoading(true),
        setTimeout(() => {
          navigate('/')
        }, 2000)
      )
  };
  const isLoggedIn = AuthToken.isLogged();


  return (
    <div className="container-fluid pt-5">
      {loading && <Loading />}
      <div className={"row justify-content-center"}>
        {isLoggedIn && <Navigate to={'/'}/>}
        <form className={'col-4'} onSubmit={authHandler}>
          <div className="form-control bg-transparent mb-3">
            <label htmlFor={"username"} className={'form-label'}>Email</label>
            <input type="email" className={"form-control"} name={"username"} id={'username'} onChange={handleChange} value={user.username}/>
          </div>
          <div className="form-control bg-transparent mb-3">
            <label htmlFor={"password"} className={'form-label'}>Password</label>
            <input type="password" className={"form-control"} id={'password'} name={"password"} onChange={handleChange} value={user.password}/>
          </div>
          <div className={"col-3 mx-auto"}>
            <button className={"btn btn-secondary w-100"} type={"submit"}>Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthFormType;