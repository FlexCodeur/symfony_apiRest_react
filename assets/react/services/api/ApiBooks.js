import Axios from '../Axios'

const books = () => {
  return Axios.get('/api/v1/beta/books')
}

const bookShow = (id) => {
  return Axios.get('/api/v1/beta/book/' + id)
}

const bookNew = (data) => {
  return Axios.post('api/v1/beta/book/new', data)
}

const bookEdit = (book) => {
  return Axios.put('api/v1/beta/book/' + book.id + '/edit' , book)
}

const bookDelete = (id) => {
  return Axios.delete('api/v1/beta/book/' + id + '/delete')
}

export const ApiBooks = {
  books, bookShow, bookNew, bookEdit, bookDelete
}
