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
      { booksData.map((book) =>
        <div className="books" key={book.id}>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <p>{new Date(book.publishedAt).toLocaleString()}</p>
          <p>{book.isbn}</p>
          <p>{book.editor}</p>

        </div>
      )}
    </section>
  );
}

export default Books;