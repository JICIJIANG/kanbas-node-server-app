import express from "express";
import {
  findEnrollmentsByUser,
  enrollUserInCourse,
  unenrollUserFromCourse,
  isUserEnrolledInCourse,
} from "./dao.js";

const router = express.Router();

router.get("/api/enrollments/:userId", (req, res) => {
  const { userId } = req.params;
  const enrollments = findEnrollmentsByUser(userId);
  res.status(200).json(enrollments || []);
});

router.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
  
    if (!userId || !courseId) {
      return res.status(400).json({ error: "User ID and Course ID are required." });
    }
  
    if (isUserEnrolledInCourse(userId, courseId)) {
      return res.status(400).json({ error: "User is already enrolled in this course." });
    }
  
    enrollUserInCourse(userId, courseId);
    res.status(200).json({ message: "Enrollment successful." });
  });

router.delete("/api/enrollments/:userId/:courseId", (req, res) => {
  const { userId, courseId } = req.params;

  if (!userId || !courseId) {
    return res.status(400).json({ error: "User ID and Course ID are required." });
  }

  if (!isUserEnrolledInCourse(userId, courseId)) {
    return res.status(404).json({ error: "Enrollment not found." });
  }

  unenrollUserFromCourse(userId, courseId);
  res.status(200).json({ message: "Unenrollment successful." });
});

export default router;
