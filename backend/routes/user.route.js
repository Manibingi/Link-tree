const express = require("express");
const User = require("../schema/user.schema");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
} = require("../controllers/user.controller");

const router = express.Router();

// Register a user
router.post(
  "/register",
  [
    check("firstName", "firstName is required").not().isEmpty(),
    check("lastName", "lastName is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// Login a user
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

// get user details
router.get("/getUser", auth, getUser);

// Update a user
router.put(
  "/updateUser",
  auth,
  [
    // Validate fields only if they are present in the request
    check("firstName")
      .optional()
      .not()
      .isEmpty()
      .withMessage("firstName is required"),
    check("lastName")
      .optional()
      .not()
      .isEmpty()
      .withMessage("lastName is required"),
    check("email")
      .optional()
      .isEmail()
      .withMessage("Please include a valid email"),
    check("newPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the updateUser controller function
    updateUser(req, res);
  }
);

module.exports = router;
