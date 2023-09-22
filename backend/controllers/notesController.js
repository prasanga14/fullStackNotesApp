const Note = require('../models/notesModel');
const mongoose = require('mongoose');

// Get all notes

const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

// Get single note

const getSingleNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Note' });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: 'No such Note' });
  }
  res.status(200).json(note);
};

// Create a  note

const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await Note.create({ title, description });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a note

const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Note' });
  }

  const note = await Note.deleteOne({ _id: id });

  if (!note) {
    return res.status(404).json({ error: 'No such Note' });
  }
  res.status(200).json(note);
};

// update a note

const updateSpecificNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Note' });
  }
  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  );
  if (!note) {
    return res.status(404).json({ error: 'No such Note' });
  }
  res.status(200).json(note);
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  deleteNote,
  updateSpecificNote,
};
