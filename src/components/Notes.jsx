import React, {useContext} from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext'

function Notes() {
    const context = useContext(noteContext)
    const {notes, setNotes} = context
    return (
        <div className="row my-3">
            <h2>Your a Note</h2>
            {
                notes.map( item => {
                        return <Noteitem note = {item}/>
                    })
            }
        </div>
    )
}

export default Notes
