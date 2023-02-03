import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Author = () => {

  const params = useParams();
  const id = params.id;

  const [authorData, setAuthorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/v1/beta/author/' + id)
      .then((response) =>

          setAuthorData(response.data),
          console.log(setAuthorData()),
          setLoading(false)
      );
  }, []);

  return (
    <section>
      { authorData.map((author) =>
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

export default Author;
