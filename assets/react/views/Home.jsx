import React from "react";
import bookList from './BookList'

const Home = () => {
  return (
    <div className="home-page">
      <h3>Ma bibliothèque en ReactJS et Symfony</h3>

      <a href="/books">Voir les livres</a>
      <a href="/authors">Voir les auteurs</a>
      <a href="/kinds">Voir les genres</a>

    </div>
  );
};

export default Home;