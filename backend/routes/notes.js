const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult} = require('express-validator')


// Route 1 : GET ALL THE NOTES using: GET "/api/notes/getuser" (Login Required)

router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
    
})

// -----------------------------------------------------------------------------------------------------// 

// Route 2 : ADD A NEW NOTE using: POST "/api/notes/addnote" (Login Required)

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description must be atleast 5 characters').isLength({ min:5 })
], async (req,res)=>{
    try {
        const { title, description, tag} = req.body;
        // If there are errors during validation:
        const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const note = new Note({
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote) 

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
    
})

// -----------------------------------------------------------------------------------------------------// 

// Route 3 : UPDATE AN EXISTING NOTE using: PUT "/api/notes/updatenote" (Login Required)

router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    const { title, description, tag} = req.body;

    try {
        // Create a new note object 
    const newNote = {};
    if(title){newNote.title = title};  // if title is added, make newNote title = title 

    if(description){newNote.description = description};  // if description is added, makez newNote description = description 

    if(tag){newNote.tag = tag};  // if tag is added, make newNote tag = tag 

    // Find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // if the id of user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }

    
})


//------------------------------------------------------------------------------------//

// Route 4 : DELETE AN EXISTING NOTE using: DELETE "/api/notes/deletenote" (Login Required)

router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    const { title, description, tag} = req.body;

    try {
        // Find the note and delete it

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // if the id of user owns this note to allow
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json("Success: Note has been deleted successfully.");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }

})

module.exports = router
