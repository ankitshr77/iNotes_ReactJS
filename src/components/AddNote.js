import React, { useContext } from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag:"Default"})

    const handleClick = (e)=>{
        // e.preventDefault();
        addNote(note.title, note.description, note.tag);
        

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
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
          </div>

          <div className="mb-2">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>

          <div className="mb-2">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add this Note</button>
          </form>

        </div> 
  )
}

export default AddNote
