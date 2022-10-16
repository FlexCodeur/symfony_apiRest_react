import React from "react";
import bookList from './bookList'

const Home = () => {
  return (
    <div className="home-page">
      <h3>Ma bibliothèque en ReactJS et Symfony</h3>

      <a href="/books">Voir les livres</a>
      <a href="/authors">Voir les auteurs</a>

    </div>
  );
};

export default Home;