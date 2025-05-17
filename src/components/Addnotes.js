import React, { useState } from "react";
import { useContext } from "react";
import contextvalue from "../context/notes/NoteContext";

export default function Addnotes(props) {
  const context = useContext(contextvalue);
  const { addNote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "general",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "3.1rem",
          color: "black",
        }}
        className="mt-1"
      >
        Save your notes with end to end encryption
      </h1>

      <div className="container my-5">
        <form
          className="my-6 p-4 container border border-secondary"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "black",
            width: "45%",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="mb-3">
            <label
              htmlFor="title"
              style={{
                fontWeight: "bold",
              }}
              className="form-label"
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              placeholder=""
              minLength={5}
              required
            />
            <label
              htmlFor="tag"
              style={{
                fontWeight: "bold",
              }}
              className="form-label"
            >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              aria-describedby="emailHelp"
              onChange={onChange}
              placeholder="general"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label"
              style={{
                fontWeight: "bold",
                margin: "10px 0px",
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              onChange={onChange}
              rows={4}
              value={note.description}
              style={{ width: "100%", border: "1px solid" }}
              minLength={5}
              required
            ></textarea>
          </div>

          <button
            style={{
              backgroundColor: "rgba(20, 4, 112, 0.95)",
              color: "white",
              padding: "10px",
              fontSize: "15px",
              margin: "25px 0px",
              border: "none",
              width: "100%",
            }}
            onClick={handleClick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
      
    </div>
  );
}
