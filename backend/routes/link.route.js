const express = require("express");
const {
  addLink,
  getLinks,
  updateLink,
  deleteLink,
  handleRedirect,
} = require("../controllers/link.controller");
const auth = require("../middleware/auth.middleware");
const { getAnalytics } = require("../controllers/analytics.controller");

const router = express.Router();

// Create a new link
router.post("/", auth, addLink);

// Get all links for a user
router.get("/", auth, getLinks);

// Update a link
router.put("/:id", auth, updateLink);

// Delete a link
router.delete("/:id", auth, deleteLink);

// Redirect to link
router.get("/redirect/:id", handleRedirect);

router.get("/analytics", auth, getAnalytics);

module.exports = router;
