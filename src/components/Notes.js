import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import Addnote from "./Addnotes";
import noteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getnotes, updateNote } = context;
  const navigation = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigation("/login");
    } else {
      getnotes();
    }
    // eslint-disable-next-line
  }, []);

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote2 = (currnote) => {
    if (ref.current) {
      ref.current.click();
    }
    setnote({
      id: currnote._id,
      etitle: currnote.title,
      edescription: currnote.description,
      etag: currnote.tag,
    });
    props.showAlert("note updated", "success");
  };

  const handleClick = (e) => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showAlert("note deleted", "success");
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert}></Addnote>
      <hr
        style={{
          marginTop: "30px",
          height: "5px",
          border: "none",
          backgroundColor: "white",
        }}
      />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Update Note
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ padding: "0px 0px" }}>
              <form
                className="my-6 container border border-1"
                style={{
                  backgroundColor: "rgba(199, 195, 195, 0.68)",
                  color: "black",
                  width: "80%",
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
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
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
                    id="etag"
                    name="etag"
                    value={note.etag}
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
                    name="edescription"
                    id="edescription"
                    onChange={onChange}
                    rows={4}
                    value={note.edescription}
                    style={{ width: "100%", border: "1px" }}
                    minLength={5}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
      <h1
        className="my-3 ms-5"
        style={{ fontWeight: "bold",  color: "black" }}
      >
        {notes.length !== 0 && "Your notes"}
      </h1>
      <h1 style={{ fontWeight: "bold",  color: "black" }}>
        {notes.length === 0 && "No notes to display"}
      </h1>
      </div>
      <div className="container row my-3" style={{}}>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              note={note}
              updateNote2={updateNote2}
              showAlert={props.showAlert}
            ></Noteitem>
          );
        })}
      </div>
    </>
  );
}
