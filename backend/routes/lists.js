const express = require("express");
const cors = require("cors");

// controller functions
const {
  getLists,
  createList,
  deleteList,
  addToList,
  removeFromList,
} = require("../controllers/listController");

const router = express.Router();
router.use(cors());

// DELETE a list
router.delete("/deleteList", deleteList);

// REMOVE from a list
router.patch("/removeFromList", removeFromList);

const requireAuth = require("../middleware/requireAuth");

// require auth for the list routes
router.use(requireAuth);

// GET all lists
router.get("/getall", getLists);

// CREATE a new list
router.post("/create", createList);

// UPDATE a list
router.patch("/add", addToList);

module.exports = router;