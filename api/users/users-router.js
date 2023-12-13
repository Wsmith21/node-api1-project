const express = require('express');
const router = express.Router();
const Users = require('./model'); // Import the database access functions

// POST /api/users
router.post('/', async (req, res) => {
  const { name, bio } = req.body;

  try {
    if (!name || !bio) {
      return res.status(400).json({ message: "Please provide name and bio for the user" });
    }

    const newUser = await Users.insert({ name, bio });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was an error while saving the user to the database" });
  }
});

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The users information could not be retrieved" });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "The user with the specified ID does not exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The user information could not be retrieved" });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "The user with the specified ID does not exist" });
    }

    await Users.remove(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The user could not be removed" });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  try {
    if (!name || !bio) {
      return res.status(400).json({ message: "Please provide name and bio for the user" });
    }

    const updatedUser = await Users.update(id, { name, bio });

    if (!updatedUser) {
      return res.status(404).json({ message: "The user with the specified ID does not exist" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The user information could not be modified" });
  }
});

module.exports = router;
