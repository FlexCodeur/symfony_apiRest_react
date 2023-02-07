import React from "react";
import AuthFormType from '../formTypes/AuthFormType'
import Navbar from '../components/Navbar'

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="login">
        <AuthFormType />
      </div>
    </div>
  );
}

export default Login;