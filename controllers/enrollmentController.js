const Enrollment = require("../models/Enrollment");

exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "User already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.params.userId,
    }).populate("course");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
