import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;

  return (
    <>
      {/* {note.title}
      {note.description} */}

        <div className="col-md-4 my-2">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                <h5 className="card-title geek">{note.title}</h5>
                <p className="card-text">{note.description} </p>
                <p className="card-text geek">{note.tag}</p>
                <i className="fas fa-trash me-3" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}}></i>
                <i className="fas fa-edit" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    
    </>
  );
};

export default Noteitem;
