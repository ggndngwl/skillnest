const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  getUserEnrollments,
} = require("../controllers/enrollmentController");

router.post("/", enrollCourse);
router.get("/:userId", getUserEnrollments);

module.exports = router;