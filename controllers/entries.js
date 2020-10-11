const Entry = require("../models/Entry");

// POST Create an entry
// @desc Create an entry
// @route POST /api/entry/
// @access private - only users can create an entry
exports.saveEntry = async (req, res) => {
  try {
    const newEntry = await Entry.create(req.body); // req.body should be an object that has author, body(optional), and moodcolor properties

    return res.status(201).json({
      success: true,
      message: "Entry successfully created",
      data: newEntry,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc Get all entries by the same author
// @route GET /api/entry/
// @access private - should only be able to access the entries if you are the author
exports.getJournal = async (req, res) => {
  try {
    const entries = await Entry.find({ author: req.user.username });

    if (!entries) {
      return res.status(404).json({
        success: false,
        error: "No entries found with that author",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Entries successfully found",
      data: entries,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Get an entry with its id
// @route GET /api/entry/:id
// @access private - should only be able to access an entry if you are the author
exports.getEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: "No entry found with that id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Entry found",
      data: entry,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Edit an entry
// @route PUT /api/entry/:id
// @access private - should only be able to access the entry if you are the author
exports.editEntry = async (req, res) => {
  try {
    const { body, moodColor } = req.body;
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: "No entry found with that id",
      });
    }

    entry.body = body; // or is it JSON.parse(body) ?
    entry.moodColor = moodColor;
    await entry.save();

    return res.status(200).json({
      success: true,
      message: "Entry successfully edited",
      data: entry,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc modify the mood or body of the entry
// @route PATCH /api/entry/:id
// @access private - should only be able to change the entry if you are the author
exports.editEntryPatch = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // replaces the value in the req.body object, ends up being the entry moodcolor or entry body
      { new: true, useFindAndModify: false } // returns the new updated entry
    );

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: "No entry found with that id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated the article (PATCH)",
      data: entry,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// DELETE remove an entry from the database
// @desc remove an entry from the database
// @route DELETE /api/entry/:id
// @access private - only the author should be able to access this route
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: "No entry found with that id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Entry successfully deleted",
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
// check if req.user matches entry author
