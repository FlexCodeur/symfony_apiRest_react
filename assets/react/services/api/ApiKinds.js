import Axios from '../Axios'

const kinds = () => {
  return Axios.get('/api/v1/beta/kinds')
}

const kindShow = (id) => {
  return Axios.get('/api/v1/beta/kind/' + id)
}

const kindNew = (data) => {
  return Axios.post('api/v1/beta/kind/new', data)
}

const kindEdit = (kind) => {
  return Axios.put('api/v1/beta/kind/' + kind.id + '/edit' , kind)
}

const kindDelete = (id) => {
  return Axios.delete('api/v1/beta/kind/' + id + '/delete')
}

export const ApiKinds = {
  kinds, kindShow, kindNew, kindEdit, kindDelete
}
