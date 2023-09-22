const express = require('express');
const {
  createNote,
  getAllNotes,
  getSingleNote,
  deleteNote,
  updateSpecificNote,
} = require('../controllers/notesController');

const router = express.Router();

// Get all Notes
router.get('/', getAllNotes);

//  Notes
router.get('/:id', getSingleNote);

// Post a Note
router.post('/', createNote);

// Update a Note
router.patch('/:id', updateSpecificNote);

// Update a Note
router.delete('/:id', deleteNote);

module.exports = router;
