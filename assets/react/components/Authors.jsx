import React, {useEffect, useState} from 'react';
import { ApiAuthors } from '../services/api/ApiAuthors'

const Authors = () => {

  const [authorsData, setAuthorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiAuthors.authors()
      .then((response) =>
          setAuthorsData(response.data),
          setLoading(false)
      );
  }, []);

    return (
      <section>
        {loading && 'Chargement...'}
        { authorsData.map((author) =>
          <div className="authors" key={author.id}>
            <h1>{author.firstName + ' ' + author.lastName.toUpperCase()}</h1>
            <p>Date de naissance : {new Date(author.birthdayDate).toDateString()}</p>
            <p>Livres publié:</p>
            {author.books.map((book) =>
              <div className="books" key={book.id}>
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

export default Authors;
