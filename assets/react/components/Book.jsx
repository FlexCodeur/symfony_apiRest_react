import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import BookList from '../views/BookList'


const Book = () => {

const params = useParams();

  const [bookData, setBookData] = useState([]);
  const [bookError, setBookError] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/beta/book/' + params.id)
      .then((response) =>
          setBookData(response.data),
          setLoading(false)

      ).catch((error) =>
        setBookError(error.response.data),
        setLoading(false))
  }, []);

  return (
    <section>
      {
        <div className={"alert alert-warning alert-dismissible fade show"} role={"alert"}>
          {bookError.message && bookError.message.content}
          {/*<button className={"close"} type={"button"} data-dismiss={"alert"} aria-label={"Close"}>*/}
          {/*  <span aria-hidden="true">&times;</span>*/}
          {/*</button>*/}
        </div>
      }
      {!bookData.id ? <BookList/> :
        <div className="book">
          <h1>{bookData.title}</h1>
          <p>{bookData.description}</p>
          <p>{new Date(bookData.publishedAt).toDateString()}</p>
          <p>{bookData.isbn}</p>
          <p>{bookData.editor}</p>
          <p>Auteur : {bookData.author && bookData.author.firstName + ' ' + bookData.author.lastName}</p>
          {/*<p>Genre :*/}
          {/*  {book.kinds.map((kind) =>*/}
          {/*    <span className="kinds" key={kind.id}>*/}
          {/*      {kind.name ? " " + kind.name : "Aucun genre"}*/}
          {/*    </span>*/}
          {/*  )}*/}
          {/*</p>*/}
        </div>
      }
    </section>
  );
}

export default Book;