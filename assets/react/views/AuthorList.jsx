import React from "react";
import Authors from "../components/Authors";
import Navbar from '../components/Navbar'

const AuthorList = () => {
  return (
    <div>
      <Navbar />
      <section className="authors">
        <Authors />
      </section>
    </div>

  );
}

export default AuthorList;