import React, {Component} from 'react';
import axios from 'axios'

class Books extends Component {
  constructor () {
    super();
    this.state = {books : [], loading: true}
  }

  componentDidMount () {
    this.getBooks();
  }

  getBooks() {
    axios.get('http://127.0.0.1:8000/api/books')
      .then(response => {
        this.setState({books: response.data, loading: false})
      })
  }

  render () {
    const books = this.state.books;
    return (
      <section>
        { books.map((book, index) =>
          <div className="books" key={index}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <p>{book.publishedAt}</p>
            <p>{book.isbn}</p>
            <p>{book.editor}</p>
          </div>
        )}
      </section>
    );
  }
}

export default Books;
