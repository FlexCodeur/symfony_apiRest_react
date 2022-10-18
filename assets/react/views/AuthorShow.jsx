import React from "react";
import Author from "../components/Author";
import { useParams } from 'react-router-dom'

const AuthorShow = () => {

  return (
    <div className="author">
      <Author />
    </div>
  );
}

export default AuthorShow;