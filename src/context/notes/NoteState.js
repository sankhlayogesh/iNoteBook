import React, { useState } from 'react'
import NoteContext from './noteContext' 


const NoteState = (props) => {
    const notesData =[
      {
        "_id": "6620d798d3bc5ca9e4b53aad",
        "user_id": "661f9a4889b6653c12c43eaf",
        "title": "My Title 1",
        "description": "This is Title description 1",
        "tag": "Personal",
        "date": "2024-04-18T08:19:36.395Z",
        "__v": 0
      },
      {
        "_id": "6620e98082cccf369ce7bcd5",
        "user_id": "661f9a4889b6653c12c43eaf",
        "title": "My Title 2",
        "description": "This is Title description 2",
        "tag": "Personal",
        "date": "2024-04-18T09:36:00.561Z",
        "__v": 0
      },
      {
        "_id": "6620e98082cccf369ce7bcd5",
        "user_id": "661f9a4889b6653c12c43eaf",
        "title": "My Title 3",
        "description": "This is Title description 3",
        "tag": "Personal",
        "date": "2024-04-18T09:36:00.561Z",
        "__v": 0
      },
      {
        "_id": "6620e98082cccf369ce7bcd5",
        "user_id": "661f9a4889b6653c12c43eaf",
        "title": "My Title 3",
        "description": "This is Title description 3",
        "tag": "Personal",
        "date": "2024-04-18T09:36:00.561Z",
        "__v": 0
      },
      {
        "_id": "6620e98082cccf369ce7bcd5",
        "user_id": "661f9a4889b6653c12c43eaf",
        "title": "My Title 3",
        "description": "This is Title description 3",
        "tag": "Personal",
        "date": "2024-04-18T09:36:00.561Z",
        "__v": 0
      },
    ]
    const [notes, setNotes] = useState(notesData);

   
  return(
    <NoteContext.Provider value={{notes , setNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;