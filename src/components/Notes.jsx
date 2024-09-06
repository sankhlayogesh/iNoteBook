import React, {useContext , useEffect, useRef , useState} from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const context = useContext(noteContext);
    const {notes, getNotes, updateNote} = context;
    const [note, setNote] = useState({uid: '', utitle: '', udescription:'', utag: ''});
    const ref = useRef(null);
    const closeRef = useRef(null);
    let navigate = useNavigate();
    
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }else{
        navigate('/login');
      }
    }, [])

  //==========> it is use to fill values in fields to update <============================
   const  handleUpdateNote= (uid, utitle , udescription, utag) => {
        setNote({uid , utitle, udescription, utag})
        ref.current.click();
    }

    const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value});
    }

    const handleUpdateClick = (e) => {
      
      e.preventDefault()   // it uses of not reload page 
      if(note.utitle.length >= 3 && note.udescription.length >=5){
        updateNote(note.uid, note.utitle , note.udescription, note.utag);
        closeRef.current.click(); 
        props.showAlert('Note Updated Successfully' , 'success') 
      }else{
        alert('Please enter valid values');
      }
  
    }
    return (
        <>
            <AddNote  showAlert= {props.showAlert}/>
        
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    open
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                         value={note.utitle}
                        className="form-control" id="utitle" name='utitle' aria-describedby="emailHelp"
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input value={note.udescription}  type="text" className="form-control"  id="udescription"  name='udescription'
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">
                      Tag
                      </label>
                      <input value={note.utag}  type="text" className="form-control" id="utag" name='utag'
                        onChange={onChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                    <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button  type="button" className="btn btn-primary"   onClick={handleUpdateClick}>Update</button>
                </div>
                </div>
            </div>
            </div>

            <div className="row my-3">  
                <h2>Your Notes</h2>
                <div className="container" align= "center">{notes.length === 0 && 'No Record Found!'}</div>
                {
                 
                    notes.map( item => {
                            return <Noteitem key={item._id} handleUpdateNote ={handleUpdateNote} note = {item} showAlert= {props.showAlert}/>
                        })
                }
            </div>
        </>
    )
}

export default Notes
