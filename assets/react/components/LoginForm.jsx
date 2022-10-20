import React, {useEffect, useState} from 'react';
import axios from 'axios'

const LoginForm = () => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post('http://127.0.0.1:8000/api/login')
      .then((response) =>
          setUserData(response.data),
          setLoading(false)
      );
  }, []);

  return (
    <section>
      {loading && 'Chargement...'}
    </section>
  );
}

export default LoginForm;
