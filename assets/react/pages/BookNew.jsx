import React from "react";
import Navbar from '../components/Navbar'
import BookCreate from '../components/books/BookCreate'

const BookNew = () => {
  return (
    <div>
      <Navbar/>
      <section>
        <h1 className={'container text-center text-uppercase pt-5 px-0 mb-0'}>Création d'un livre</h1>
        <BookCreate />
      </section>
    </div>
  );
}

export default BookNew;