const express = require('express');
const fatchUser = require('../middleware/fatchuser');
const { body, validationResult } = require('express-validator');
const Notes = require("../models/Notes");

const router = express.Router();

//ROUTE 1 : Get all the notes using GET "/api/notes/fatch_all_notes" . Login required ==========================================
router.get('/fatch_all_notes', fatchUser,  async (req, res ) => {
    try {
        const notes = await Notes.find({user_id: req.user._id})
        if(notes){
            res.json({success: true, records: notes});
        }else{
            res.json({success: false, message: "No Record Found!",  records: null});
        }
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

//ROUTE 1 : Add a new notes using POST "/api/notes/add_note" . Login required ==========================================
router.post('/add_note', fatchUser, [
    body('title' , 'Enter a valid title').isLength({min:3}),
    body('description' , 'Description must be atleast 5 characters').isLength({min:5}),
    ], async (req, res ) => {
        try {
            const {title, description,tag} = req.body;
                
            // if there are errors, return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({errors: errors.array()});
            }
    
            const note = new Notes({title,description, tag, user_id: req.user._id})
            const saveNote = await note.save();
            res.json({status: true, records: [saveNote]});
            
        } catch (error) {
            res.status(500).send("Internal server error")
        }
    })

//ROUTE 3 : Update an exiting notes Using Put "/api/notes/update_note" . Login required ==========================================
router.put('/update_note/:id', fatchUser,  async (req, res ) => {
    try {
        const {title, description,tag} = req.body;
        const  newNote = {};

        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;

        let note = await Notes.findById(req.params.id); 
        if(!note){ return res.status(404).json({status: "ERROR", message: "Not Found"})  }

        if(note.user_id.toString() !== req.user._id){
            return res.status(401).json({status: "ERROR", message: "Not Allowed"})
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        
        res.json({status: "SUCCESS", records: [note]});

    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

//ROUTE 4 : Delete an exiting notes Using DELETE "/api/notes/delete_note" . Login required ==========================================
router.delete('/delete_note/:id', fatchUser,  async (req, res ) => {
    try {
        
        console.log("id : ",req.params.id)
        let note = await Notes.findById(req.params.id); 
        if(!note){ return res.status(404).json({status: "ERROR", message: "Not Found"})  }

        if(note.user_id.toString() !== req.user._id){
            return res.status(401).json({status: "ERROR", message: "Not Allowed"})
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({status: "SUCCESS", message: "Note has been deleted"});

    } catch (error) {
        res.status(500).send("Internal server error")
    }
})
 
module.exports = router;