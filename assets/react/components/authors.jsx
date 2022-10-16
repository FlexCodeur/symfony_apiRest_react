import React, {Component} from 'react';
import axios from 'axios'

class Authors extends Component {
  constructor () {
    super();
    this.state = {authors : [], loading: true}
  }

  componentDidMount () {
    this.getAuthors();
  }

  getAuthors() {
    axios.get('http://127.0.0.1:8000/api/authors')
      .then(response => {
        this.setState({authors: response.data, loading: false})
      })
  }

  render () {
    const authors = this.state.authors;
    return (
      <section>
        { authors.map((author, index) =>
          <div className="authors" key={index}>
            <h1>{author.firstName + ' ' + author.lastName}</h1>
            <p>Date de naissance : {author.birthdayDate}</p>
            {author.books.map((book, index) =>
              <div className="books" key={index}>
                <p>Livres publié:</p>
                <ul>
                  <li>{book.title}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
    );
  }
}

export default Authors;
