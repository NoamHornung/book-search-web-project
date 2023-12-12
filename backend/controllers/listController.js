const axios = require("axios");

const List = require("../models/listModel");
const mongoose = require("mongoose");

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

// Get all the lists, sort them by creation time
const getLists = async (req, res) => {
  const user_id = req.user._id;

  const lists = await List.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(lists);
};

// Create a list of books, given a list title ans a book id
const createList = async (req, res) => {
  const { title, bookId } = req.body;
  if (!title || !bookId) {
    return res.status(400).json({ error: "Please fill in the title" });
  }
  // add list to the database
  try {
    const user_id = req.user._id;
    const response = await axios.get(`${BASE_URL}/${bookId}`); // get the book from the google books api
    const book = response.data;
    const list = await List.create({ title, user_id, books: [book] });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a list of books
const deleteList = async (req, res) => {
  const { listId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return res.status(404).json({ error: "No such list" });
  }

  const list = await List.findOneAndDelete({ _id: listId });

  if (!list) {
    return res.status(400).json({ error: "No such list" });
  }

  res.status(200).json(list);
};

// Add a book to a list
const addToList = async (req, res) => {
  const { listId, bookId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return res.status(404).json({ error: "No such list" });
  }

  const response = await axios.get(`${BASE_URL}/${bookId}`); // get the book from the google books api
  const book = response.data;

  const list = await List.findByIdAndUpdate(
    listId,
    { $push: { books: book } },
    { new: true }
  );

  if (!list) {
    return res.status(400).json({ error: "No such list" });
  }

  res.status(200).json(list);
};

// Remove a book from a list
const removeFromList = async (req, res) => {
  const { listId, bookId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return res.status(404).json({ error: "No such list" });
  }

  const list = await List.findByIdAndUpdate(
    listId,
    { $pull: { books: { id: bookId } } },
    { new: true }
  );

  if (!list) {
    return res.status(400).json({ error: "No such list" });
  }

  res.status(200).json(list);
};

module.exports = {
  getLists,
  createList,
  deleteList,
  addToList,
  removeFromList,
};
