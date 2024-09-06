import React, { useState } from 'react'
import NoteContext from './noteContext' 


const NoteState = (props) => {

    const host = "http://localhost:5000";

    const notesData =[
      {
        "_id": "6620e98082cccf369ce7bcd5d",
        "user_id": "661f9a4889b6653c12c43eaf",
        "title": "My Title 3",
        "description": "This is Title description 3",
        "tag": "Personal",
        "date": "2024-04-18T09:36:00.561Z",
        "__v": 0
      },              
    ]

    const notedInitail = [];
    const [notes, setNotes] = useState(notedInitail);
  
    const getNotes = async () => {
      var url = `${host}/api/notes/fatch_all_notes`
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
          //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NTVhZDE4ZGE1MDEwMzAzZjE2NjkyYSIsIm5hbWUiOiJZb2dlc2giLCJlbWFpbCI6InlvZ2VzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRXSGJ5Q3F4Qm9KS2dkQlUzTi9NamwuNUZWTGxiSmJwR3o5Z3BvMXVXRlh5T3dyLlIzS1dKaSIsImRhdGUiOiIyMDI0LTA1LTI4VDEwOjA4OjI0LjgyNFoiLCJfX3YiOjB9LCJpYXQiOjE3MjA0MzIyNTB9.49_eeNfPZbJjMFGk15Y2Kpcyw32bjW7wlclma_Cxo9U"
        },
      });
      const res = await response.json();  
      setNotes(res['records'])
    }

//===================> Add note method <====================================
    const addNote = async (title,description ,tag) => {
      
      var url = `${host}/api/notes/add_note`
      try {
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NTVhZDE4ZGE1MDEwMzAzZjE2NjkyYSIsIm5hbWUiOiJZb2dlc2giLCJlbWFpbCI6InlvZ2VzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRXSGJ5Q3F4Qm9KS2dkQlUzTi9NamwuNUZWTGxiSmJwR3o5Z3BvMXVXRlh5T3dyLlIzS1dKaSIsImRhdGUiOiIyMDI0LTA1LTI4VDEwOjA4OjI0LjgyNFoiLCJfX3YiOjB9LCJpYXQiOjE3MTY4OTE5NTR9.cJqKbr401aUS16zPABEwegKwZUz0cNpW-LfCMIQXP88"
          },
          body: JSON.stringify({title,description, tag}), 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        var res = await  response.json(); 
        // const note = {
        //   _id: res._id,
        //   user_id: res.user_id,
        //   title: res.title,
        //   description: res.description,
        //   tag: res.tag,
        //   date: res.date,
        //   __v: res.__v,
        // };
    
        // setNotes((prevNotes) => prevNotes.concat(note));
       window.location.reload(false);
      } catch (error) {
        console.error("Error adding note:", error);
        alert(`Error adding note: ${error.message}`)
      }

    }

//==========> Upate note Method <===================================
    const updateNote = async (id, title, description , tag) => {
      var url = `${host}/api/notes/update_note/${id}`
      try {
        const response = await fetch(url, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NTVhZDE4ZGE1MDEwMzAzZjE2NjkyYSIsIm5hbWUiOiJZb2dlc2giLCJlbWFpbCI6InlvZ2VzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRXSGJ5Q3F4Qm9KS2dkQlUzTi9NamwuNUZWTGxiSmJwR3o5Z3BvMXVXRlh5T3dyLlIzS1dKaSIsImRhdGUiOiIyMDI0LTA1LTI4VDEwOjA4OjI0LjgyNFoiLCJfX3YiOjB9LCJpYXQiOjE3MTY4OTE5NTR9.cJqKbr401aUS16zPABEwegKwZUz0cNpW-LfCMIQXP88"
          },
          body: JSON.stringify({title,description, tag}),                        
        });
        var res =  await  response.json(); 
        setNotes(prevNotes => prevNotes.map(note =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
      } catch (error) {
        console.log('update error ', error);
      }

    }
    const deleteNote = async (id) => {
      var url = `${host}/api/notes/delete_note/${id}`
      const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
          //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NTVhZDE4ZGE1MDEwMzAzZjE2NjkyYSIsIm5hbWUiOiJZb2dlc2giLCJlbWFpbCI6InlvZ2VzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRXSGJ5Q3F4Qm9KS2dkQlUzTi9NamwuNUZWTGxiSmJwR3o5Z3BvMXVXRlh5T3dyLlIzS1dKaSIsImRhdGUiOiIyMDI0LTA1LTI4VDEwOjA4OjI0LjgyNFoiLCJfX3YiOjB9LCJpYXQiOjE3MTY4OTE5NTR9.cJqKbr401aUS16zPABEwegKwZUz0cNpW-LfCMIQXP88"
        },                
      });
      var res =   response.json();
       
      setNotes(notes.filter((note)=> note._id !== id) );
    }
   
  return(
    <NoteContext.Provider value={{notes , setNotes,addNote,updateNote,deleteNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;