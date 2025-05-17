import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];

  const [notes, setNotes] = useState(notesinitial);

  //* get all notes
  const getnotes = async () => {
    //? API CALL
    const url = `${host}/api/notes/fetchallnotes`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  //* add note
  const addNote = async (title, description, tag) => {
    //? API CALL
    const url = `${host}/api/notes/addnote`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const newnote = await response.json();
      if (!response.ok) {
        throw new Error(newnote.error || "Failed to add note");
      }
      setNotes(notes.concat(newnote));
    } catch (error) {
      console.error(error.message);
    }
  };

  //* delete note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Failed to delete note");
      }
      const newnote = notes.filter((note) => note._id !== id);
      setNotes(newnote);
    } catch (error) {
      console.error(error.message);
    }
  };

  //* update note
  const updateNote = async (id, title, description, tag) => {
    //? API CALL
    const url = `${host}/api/notes/updatenotes/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Failed to update note");
      }
    } catch (error) {
      console.error(error.message);
    }
    let nnotes = JSON.parse(JSON.stringify(notes));
    //? edit in client
    for (let index = 0; index < nnotes.length; index++) {
      const element = nnotes[index];
      if (element._id === id) {
        nnotes[index].title = title;
        nnotes[index].description = description;
        nnotes[index].tag = tag;
        break;
      }
    }
    setNotes(nnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
