const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//* ROUTE 1 : get logedin user details using : GET "/api/notes/fetchAllnotes"
router.get("/fetchAllnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//* ROUTE 2 : adding notes of user : POST "/api/notes/addnote" login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 chars").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//* ROUTE 3 : update an existing note using PUT "/api/notes/updatenotes" login required
router.put("/updatenotes/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  //* create a new note object
  let newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }
  //* find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.json({ note });
});

//* ROUTE 4 : delete an existing note using DELETE "/api/notes/deletenote" login required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  //* find the note to be deleted and delete it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }
  //* allow deletion only if use own this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ ok: "Note has been deleted", note });
});

module.exports = router;
