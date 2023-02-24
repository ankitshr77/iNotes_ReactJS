import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    
  ];

  const [notes, setNotes] = useState(notesInitial);



  // ...................................................................................//

    // FETCH ALL NEW NOTE
    const getNotes = async () => {
      //TODO : API CALL
      // API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOGFiYWVlZjA3N2I0MWYxMTlkODYzIn0sImlhdCI6MTY3NjQ0NTU1M30.dfR09yocIrP2rh76f-0Rr9ANBga2b3Q3XgmVTHPb6sg"
        },
      });
      const json = await response.json();
      setNotes(json)
    };



// ..................................................................................//

  // ADD A NEW NOTE
  const addNote = async (title, description, tag) => {
    //TODO : API CALL
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOGFiYWVlZjA3N2I0MWYxMTlkODYzIn0sImlhdCI6MTY3NjQ0NTU1M30.dfR09yocIrP2rh76f-0Rr9ANBga2b3Q3XgmVTHPb6sg"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json;
    console.log(json)
  };


// .....................................................................................//


  // DELETE A NEW NOTE
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOGFiYWVlZjA3N2I0MWYxMTlkODYzIn0sImlhdCI6MTY3NjQ0NTU1M30.dfR09yocIrP2rh76f-0Rr9ANBga2b3Q3XgmVTHPb6sg"
      }
    });
    const json = response.json();
    console.log(json)

    // if note._id is not equal to id, then it will remain in notes else not
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


// .....................................................................................//

  // EDIT A NEW NOTE
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOGFiYWVlZjA3N2I0MWYxMTlkODYzIn0sImlhdCI6MTY3NjQ0NTU1M30.dfR09yocIrP2rh76f-0Rr9ANBga2b3Q3XgmVTHPb6sg"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json)

    
    let newNotes = JSON.parse(JSON.stringify(notes))

    // LOGIC TO EDIT A NOTE
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
  }
  setNotes(newNotes);
}

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
  }
export default NoteState;