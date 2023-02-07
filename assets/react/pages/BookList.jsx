import React from "react";
import Books from "../components/books/Books";
import Navbar from '../components/Navbar'

const BookList = () => {
  return (
    <div>
      <Navbar/>
      <div className="books">
        <Books />
      </div>
    </div>

  );
}

export default BookList;
