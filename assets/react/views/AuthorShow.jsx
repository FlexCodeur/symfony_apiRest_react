import React from "react";
import Author from "../components/Author";
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AuthorShow = () => {

  return (
    <div>
      <Navbar />
      <div className="author">
        <Author />
      </div>
    </div>

  );
}

export default AuthorShow;