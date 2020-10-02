const express = require("express");
const router = express.Router();

const {
  getEntry,
  saveEntry,
  getJournal,
  editEntry,
  editEntryPatch,
  deleteEntry,
} = require("../controllers/entries");

router
  .route("/")
  .get(getJournal)
  .post(saveEntry);

router
  .route("/:id")
  .get(getEntry)
  .put(editEntry)
  .patch(editEntryPatch)
  .delete(deleteEntry);

module.exports = router;
