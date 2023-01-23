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
    const user = {
      'username': username,
      'email': email,
      'password': password,
      'agreeTerms': checkbox
    }
    console.log(data);

      axios.post('http://127.0.0.1:8000/api/register', user)
        .then((response) =>
            console.log(response),
          // console.log(response),
          setLoading(false)
        )
  };


  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <form className={"col-6"} onSubmit={createOnSubmit}>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor={"username"} className={"form-label"}>Pseudo</label>
            <input type="text" className={'form-control'} id={'username'} name={"username"} onChange={(e) => setUsername(e.target.value)} value={username}/>
          </div>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor={"email"} className={"form-label"}>Email</label>
            <input type="email" className={'form-control'} name={"email"} id={'email'} onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor={"password"} className={"form-label"}>Password</label>
            <input type="password" className={'form-control'} id={'password'} name={"password"} onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
          <div className={'form-control bg-transparent mb-3'}>
            <input type="checkbox"  name={'agreeTerms'} id={'agreeTerms'} onChange={(e) => setCheckbox(e.target.checked)} value={checkbox}/>
            <label htmlFor="{'agreeTerms'}" className={"form-label px-2"}>Accepter les terms</label>
          </div>
          <div className={"col-3 mx-auto"}>
            <button className={"btn btn-secondary w-100"} type={"submit"}>S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterFormType;