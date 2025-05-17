import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote2 } = props;

  return (
    <div className="col-md-4">
      <div className="card my-3 border " style={{ backgroundColor: "#afeeee" }}>
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              fontWeight: "bold",
              fontFamily: "inherit",
            }}
          >
            {note.title}
          </h5>
          <div
            className="rounded-5 "
            style={{ fontSize: "15px", fontWeight: "bold", color: "" }}
          >
            {note.tag}
          </div>
          <hr />
          <p
            className="card-text"
            style={{
              fontFamily: "cursive",
            }}
          >
            {note.description}
          </p>
          <i
            className="fa-sharp fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("note deleted", "success");
            }}
          ></i>
          <i
            className="fa-sharp fa-solid fa-pen-to-square mx-2 "
            onClick={() => {
              updateNote2(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
