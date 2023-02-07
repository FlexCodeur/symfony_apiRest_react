import React, { useEffect, useState } from 'react'
import { ApiAuthors } from '../services/api/ApiAuthors'
import { ApiKinds } from '../services/api/ApiKinds'

const BookFormType = (props) => {

  const [authorList, setAuthorList] = useState([]);
  const [kindList, setKindList] = useState([]);

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

  return (
    <div className="row justify-content-center">
      <form className={"col-4"} onSubmit={props.handleSubmit}>
        <div className={'form-control bg-transparent mb-3'}>
          <label htmlFor={"title"} className={"form-label"}>Titre</label>
          <input type="text" className={'form-control'} id={'title'} name={"title"} onChange={props.handleChange} value={props.title}/>
        </div>
        <div className={'form-control bg-transparent mb-3'}>
          <label htmlFor={"description"} className={"form-label"}>Description</label>
          <input type="textarea" className={'form-control'} name={"description"} id={'description'} onChange={props.handleChange} value={props.description}/>
        </div>
        <div className={'form-control bg-transparent mb-3'}>
          <label htmlFor={"editor"} className={"form-label"}>Editeur</label>
          <input type="text" className={'form-control'} id={'editor'} name={"editor"} onChange={props.handleChange} value={props.editor}/>
        </div>
        <div className={'form-control bg-transparent mb-3'}>
          <label htmlFor="{'publishedAt'}" className={"form-label px-2"}>Date de publication</label>
          <input type="date"  name={'publishedAt'} id={'publishedAt'} onChange={props.handleChange} value={props.publishedAt}/>
        </div>
        <div className="form-control bg-transparent mb-3">
          <select className="form-select" aria-label="Sélectionner un auteur" onChange={props.handleSelectAuthor} value={props.author}>
            {/*<option selected>Sélectionner un auteur</option>*/}
            {authorList.map((getAuthor) =>
              <option key={getAuthor.id} value={getAuthor.id}>{getAuthor.firstName + ' ' + getAuthor.lastName}</option>
            )}
          </select>
        </div>
        <div className="form-control bg-transparent mb-3">
          <select className="form-select" multiple={true} aria-label="Sélectionner les genres" onChange={props.handleSelectKinds} value={props.kind}  >
            {/*<option selected>Sélectionner le genre</option>*/}
            {kindList.map((getKind) =>
              <option key={getKind.id} value={getKind.id}>{getKind.name}</option>
            )}
          </select>
          <p>Plusieurs choix possible (CTRL + clic)</p>
        </div>
        <div className={'form-control bg-transparent mb-3'}>
          <label htmlFor={"ISBN"} className={"form-label"}>ISBN à 13 chiffres</label>
          <input type="text" className={'form-control'} id={'isbn'} name={"isbn"} onChange={props.handleChange} value={props.isbn}/>
        </div>
        <div className={"col-4 mx-auto"}>
          <button className={"btn btn-secondary w-100 p-2"} type={"submit"}>Enregistrer le livre</button>
        </div>
      </form>
    </div>
  )
}

export default BookFormType;