import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
import { useEffect, useRef } from "react";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null); 

  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag:"Default"})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleClick = (e)=>{
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();

}

const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}

      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          
          {/* ---------------------------MODAL BODY -----------------------------------------------------*/}
            <div className="modal-body">
            <form className='form-control w-50 m-auto my-4'>

              <div className="mb-2">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
              </div>

              <div className="mb-2">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
              </div>

              <div className="mb-2">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
              </div>

            </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row my-3">
          <h2 className="text-center">Your Notes</h2>
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
