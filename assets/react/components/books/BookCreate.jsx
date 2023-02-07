import React, { useEffect, useState } from 'react'
import { ApiBooks } from '../../services/api/ApiBooks'
import {useNavigate} from 'react-router-dom'
import BookFormType from '../../formTypes/BookFormType'
import Loading from '../loading'

const BookCreate = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    title: '',
    description: '',
    publishedAt: '',
    editor: '',
    author: '',
    isbn: '',
    kinds: []
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(book);

    ApiBooks.bookNew(book)
      .then((response) =>
          console.log(response),
        // setTimeout(() => {
        //   setLoading(true)
        // }, 1000),
        navigate('/books')
      ).catch(error => {
      console.log(error)
    })
  };

  const handleSelectKinds = (e) => {
    let kindId = Array.from(e.target.selectedOptions, option => option.value)
    setBook({
      ...book,
      kinds: kindId
    })
  }

  const handleSelectAuthor = (e) => {
    let authorId = e.target.value
    setBook({
      ...book,
      author: authorId
    })
  }

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container-fluid pt-5">
      {loading && <Loading/> }
      <BookFormType
        handleChange={handleChange}
        handleSelectAuthor={handleSelectAuthor}
        handleSelectKinds={handleSelectKinds}
        handleSubmit={handleSubmit}
        title={book.title}
        description={book.description}
        publishedAt={book.publishedAt}
        editor={book.editor}
        isbn={book.isbn}
        author={book.author}
        kind={book.kinds} />
    </div>
  );
}

export default BookCreate;