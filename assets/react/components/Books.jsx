import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {

  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     axios.get('http://127.0.0.1:8000/api/v1/beta/books')
      .then((response) =>
        setBooksData(response.data),
        setLoading(false)
      );
  }, []);

  return (
    <section>
      {loading && 'Chargement...'}
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