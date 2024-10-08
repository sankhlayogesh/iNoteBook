import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote,} = context

 const [note, setNote] = useState({title: "", description: "", tag: "Default"})
   
 const handleClick = (e) =>{
      e.preventDefault()   // it uses of not reload page 
      if(note.title.length >= 3 && note.description.length >=5){
          addNote(note.title, note.description, note.tag);
          setNote({ title: "", description: "", tag: "" }); 
          props.showAlert('Note Added Successfully' , 'success') 
      }else{
        alert('Please Fill Valid Details');
      }
        
    }

   const onChange = (e) =>{
        setNote({...note,[e.target.name]:  e.target.value})
        console.log(note);
    }
  return (
    <div className="container">
        <h2 style={{ marginTop: "70px" }}>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={note.title}
              className="form-control"
              id="title"
              name='title'
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              value={note.description}
              type="text"
              className="form-control"
              id="description"
              name='description'
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
            value={note.tag}
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
  )
}
