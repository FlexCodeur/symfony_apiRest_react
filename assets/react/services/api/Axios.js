import axios from 'axios';
import { AuthToken } from '../AuthToken'

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

axios.interceptors.request.use(request => {

  if (AuthToken.isLogged()) {
    request.headers.Authorization = 'Bearer ' + AuthToken.getToken();
  }
  return request;

});

export default Axios;
