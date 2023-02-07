import React from "react";
import Book from '../components/books/Book'
import Navbar from '../components/Navbar'
import Books from '../components/books/Books'

const BookShow = () => {
  return (
    <div>
      <Navbar />
      <div className="book">
        <Book />
      </div>
    </div>

  );
}

export default BookShow;