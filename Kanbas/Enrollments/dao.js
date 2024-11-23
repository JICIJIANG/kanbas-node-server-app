import Database from "../Database/index.js";

// 查询某个用户的所有选课
export function findEnrollmentsByUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

// 检查用户是否已经选了某门课
export function isUserEnrolledInCourse(userId, courseId) {
  const { enrollments } = Database;
  return enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
}

// 为用户选课
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  if (!isUserEnrolledInCourse(userId, courseId)) {
    enrollments.push({ _id: Date.now(), user: userId, course: courseId });
  }
}

// 为用户退课
export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}
