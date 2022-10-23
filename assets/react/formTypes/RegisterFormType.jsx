import React, { useCallback, useState } from 'react'
import axios from 'axios'

const RegisterFormType = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [loading, setLoading] = useState(true);

  const createOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      'username': username,
      'email': email,
      'password': password,
      'agreeTerms': checkbox
    }
    console.log(data);

      axios.post('http://127.0.0.1:8000/api/register', data)
        .then((response) =>
            console.log(response),
          // console.log(response),
          setLoading(false)
        )
  };


  return (
    <div className="container">
      <form onSubmit={createOnSubmit}>
        <div className="form-control bg-transparent">
          <label htmlFor={"username"}>Pseudo</label>
          <input type="text" id={'username'} name={"username"} onChange={(e) => setUsername(e.target.value)} value={username}/>
        </div>
        <div className="form-control bg-transparent">
          <label htmlFor={"email"}>Email</label>
          <input type="email" name={"email"} id={'email'} onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <div className="form-control bg-transparent">
          <label htmlFor={"password"}>Password</label>
          <input type="password" id={'password'} name={"password"} onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        <div className="form-control bg-transparent">
          <input type="checkbox" name={'agreeTerms'} id={'agreeTerms'} onChange={(e) => setCheckbox(e.target.checked)} value={checkbox}/>
          <label htmlFor="{'agreeTerms'}">Accepter les terms</label>
        </div>
        <button className={"btn btn-secondary"} type={"submit"}>Envoyer</button>
      </form>
    </div>
  );
}

export default RegisterFormType;