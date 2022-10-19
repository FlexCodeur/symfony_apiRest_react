import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Kinds = () => {

  const [kindsData, setkindsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/beta/kinds')
      .then((response) =>
          setkindsData(response.data),
          setLoading(false)
      );
  }, []);

  return (
    <section>
      {loading && 'Chargement...'}
      { kindsData.map((kind) =>
        <div className="kinds" key={kind.id}>
          <h1>{kind.name}</h1>
          <p>Livre disponible :</p>
          {kind.books.map((book) =>
            <div className="books" key={book.id}>
              <ul>
                <li><a href={"/book/" + book.id}>{book.title}</a></li>
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Kinds;