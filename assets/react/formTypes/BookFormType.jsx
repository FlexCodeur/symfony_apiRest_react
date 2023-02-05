import React, { useEffect, useState } from 'react'
import { ApiBooks } from '../services/api/ApiBooks'
import {useNavigate} from 'react-router-dom'
import Loading from '../components/loading'
import { ApiAuthors } from '../services/api/ApiAuthors'
import authors from '../components/Authors'
import { ApiKinds } from '../services/api/ApiKinds'
import { ctoi } from 'core-js/internals/base64-map'
import { iterator } from 'core-js/stable/dom-collections'
import { toArray } from 'core-js/internals/async-iterator-iteration'
import { array } from 'prop-types'
import { indexOf } from 'core-js/internals/array-includes'

const BookFormType = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [isbn, setIsbn] = useState('');
  const [editor, setEditor] = useState('');
  const [author, setAuthor] = useState('');
  const [authorList, setAuthorList] = useState([]);
  const [kinds, setKinds] = useState([]);
  const [kindList, setKindList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ApiAuthors.authors()
      .then((response) => {
        setAuthorList(response.data)
      })
      .catch((error => {
        console.log(error)
      }))
    }, [])

  useEffect(() => {
    ApiKinds.kinds()
      .then((response) => {
        setKindList(response.data)
      })
      .catch((error => {
        console.log(error)
      }))
  }, [])

  const createOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      'title': title,
      'description': description,
      'publishedAt': publishedAt,
      'isbn': isbn,
      'editor': editor,
      'author': author,
      'kinds': kinds
    }
    console.log(data);


        ApiBooks.bookNew(data)
          .then((response) =>
              console.log(response),
            // setLoading(true),
            // navigate('/books')
          ).catch(error => {
          console.log(error)
        })

  };

  const handleSelect = (e) => {
    let kindId = Array.from(e.target.selectedOptions, option => option.value)
    setKinds(kindId)
  }

  return (
    <div className="container-fluid pt-5">
      {loading && <Loading />}
      <div className="row justify-content-center">
        <form className={"col-4"} onSubmit={createOnSubmit}>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor={"title"} className={"form-label"}>Titre</label>
            <input type="text" className={'form-control'} id={'title'} name={"title"} onChange={(e) => setTitle(e.target.value)} value={title}/>
          </div>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor={"description"} className={"form-label"}>Description</label>
            <input type="textarea" className={'form-control'} name={"description"} id={'description'} onChange={(e) => setDescription(e.target.value)} value={description}/>
          </div>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor={"editor"} className={"form-label"}>Editeur</label>
            <input type="text" className={'form-control'} id={'editor'} name={"editor"} onChange={(e) => setEditor(e.target.value)} value={editor}/>
          </div>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor="{'publishedAt'}" className={"form-label px-2"}>Date de publication</label>
            <input type="date"  name={'publishedAt'} id={'publishedAt'} onChange={(e) => setPublishedAt(e.target.value)} value={publishedAt}/>
          </div>
          <div className="form-control bg-transparent mb-3">
            <select className="form-select" aria-label="Sélectionner un auteur" onChange={(e) => setAuthor(e.target.value)} value={author}>
              {/*<option selected>Sélectionner un auteur</option>*/}
              {authorList.map((getAuthor) =>
                <option key={getAuthor.id} value={getAuthor.id}>{getAuthor.firstName + ' ' + getAuthor.lastName}</option>
              )}
            </select>
          </div>
          <div className="form-control bg-transparent mb-3">
            <select className="form-select" multiple={true} aria-label="Sélectionner les genres" onChange={handleSelect} value={kinds}  >
              {/*<option selected>Sélectionner le genre</option>*/}
              {kindList.map((getKind) =>
                <option key={getKind.id} value={getKind.id}>{getKind.name}</option>
              )}
            </select>
            <p>Plusieurs choix possible (CTRL + clic)</p>
          </div>
          <div className={'form-control bg-transparent mb-3'}>
            <label htmlFor={"ISBN"} className={"form-label"}>ISBN à 13 chiffres</label>
            <input type="text" className={'form-control'} id={'isbn'} name={"isbn"} onChange={(e) => setIsbn(e.target.value)} value={isbn}/>
          </div>
          <div className={"col-4 mx-auto"}>
            <button className={"btn btn-secondary w-100 p-2"} type={"submit"}>Enregistrer le livre</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookFormType;