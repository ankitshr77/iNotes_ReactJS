import React, { useContext } from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag:""})
        props.showAlert("Added Successfully", "success");
        

    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (

      <div className='container'>
          <h2 className='text-center mt-4'>Add A Note</h2>
          <form className='form-control w-50 m-auto my-4'>

          <div className="mb-2">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
          </div>

          <div className="mb-2">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} minLength={5} required/>
          </div>

          <div className="mb-2">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange}/>
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add this Note</button>
          </form>

        </div> 
  )
}

export default AddNote
