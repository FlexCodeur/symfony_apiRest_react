import React from "react";
import Navbar from '../components/Navbar'
import BookFormType from '../formTypes/BookFormType'

const BookNew = () => {
  return (
    <div>
      <Navbar/>
      <section>
        <h1 className={'container text-center text-uppercase pt-5 px-0 mb-0'}>Création d'un livre</h1>
        <BookFormType />
      </section>

    </div>
  );
}

export default BookNew;