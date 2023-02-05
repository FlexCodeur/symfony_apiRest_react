import Axios from '../Axios'

const authors = () => {
  return Axios.get('/api/v1/beta/authors')
}

const authorShow = (id) => {
  return Axios.get('/api/v1/beta/author/' + id)
}

const authorNew = (data) => {
  return Axios.post('api/v1/beta/author/new', data)
}

const authorEdit = (author) => {
  return Axios.put('api/v1/beta/author/' + author.id + '/edit' , author)
}

const authorDelete = (id) => {
  return Axios.delete('api/v1/beta/author/' + id + '/delete')
}

export const ApiAuthors = {
  authors, authorShow, authorNew, authorEdit, authorDelete
}
