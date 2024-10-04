const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create a new user
router.post('/', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, address } = req.body;
  try {
    const newUser = new User({ firstName, lastName, phoneNumber, email, address });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber, email, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { firstName, lastName, phoneNumber, email, address }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
