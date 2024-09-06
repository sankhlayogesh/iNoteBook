import React ,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const { note, handleUpdateNote } = props;
  const context = useContext(noteContext)
  const {deleteNote} = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        {/* <img src="..." class="card-img-top" alt="..." /> */}
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <div className="card-div">
            <h5 className="card-title">{note.title}</h5>
            </div>
            <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id); props.showAlert('Note Deleted Successfully' , 'success')  }}></i>
            <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { handleUpdateNote(note._id, note.title, note.description, note.tag); }}></i>
          </div>
          <p className="card-text">
            {note.description}
          </p>
        </div>
    </div>
      
    </div>
  );
}

export default Noteitem;
