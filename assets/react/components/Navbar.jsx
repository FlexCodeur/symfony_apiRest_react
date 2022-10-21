import React from 'react'

const Navbar = () => {

  return (
    <div className="container-fluid p-0 text-white">
      <nav className="navbar navbar-expand-lg bg-light text-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/books">Livres</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/authors">Auteurs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/kinds">Genres</a>
              </li>
            </ul>
            <span className="navbar-text">
              <div className="container">
                <ul className={"row list-unstyled mb-0"}>
                  <li className="col-6 nav-item">
                    <a className="nav-link" href="/login">Connexion</a>
                  </li>
                  <li className="col-6 nav-item">
                    <a className="nav-link" href="/register">Inscription</a>
                  </li>
                </ul>
              </div>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar