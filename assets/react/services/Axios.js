import axios from 'axios';
import { AuthService } from './AuthService'

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

Axios.interceptors.request.use(request => {

  if (AuthService.isLogged()) {
    request.headers.Authorization = 'Bearer ' + AuthService.getToken();
  }
  return request;

});

export default Axios;
