import React, { useEffect, useState } from 'react';
import { ApiBooks } from '../../services/api/ApiBooks'
// import { AuthService } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import Loading from '../loading'

const Books = () => {

  const navigate = useNavigate();

  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     ApiBooks.books()
      .then((response) =>
        setBooksData(response.data),
        setTimeout(() => {
         setLoading(false)
        }, 800)
      );
  }, []);

  const handlerClick = () => {
    navigate("/book/new")
  }

  // const isLoggedIn = AuthService.isLogged();
  // const isGranted = AuthService.isGranted();

  return (
    <section>
      {loading && <Loading />}
      {/*{*/}
      {/*  ((isLoggedIn) && (isGranted[0] === "ROLE_ADMIN" || isGranted[0] === "ROLE_EDITOR"))*/}
      {/*  &&*/}
        <div className="container-fluid pt-3">
          <div className="row justify-content-center">
            <div className="col-12 mx-auto">
              <button onClick={handlerClick} className={"d-flex justify-content-center btn btn-success mx-auto"}>Ajouter un livre</button>
            </div>
          </div>
        </div>
       {/*}*/}
      { booksData.map((book) =>
        <div className="books" key={book.id}>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <p>{new Date(book.publishedAt).toDateString()}</p>
          <p>{book.isbn}</p>
          <p>{book.editor}</p>
          <p>Auteur : {book.author && book.author.firstName + ' ' + book.author.lastName}</p>
          <p>Genre :
            {book.kinds.map((kind) =>
              <span className="kinds" key={kind.id}>
                {kind.name ? " " + kind.name : "Aucun genre"}
              </span>
            )}
          </p>
        </div>
      )}

    </section>
  );
}

export default Books;