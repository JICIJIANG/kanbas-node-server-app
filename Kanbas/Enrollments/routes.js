import * as dao from "./dao.js";
export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments/:userId", async (req, res) => { // get enrollments from a user
        const { userId } = req.params;
        const enrollments = await dao.getEnrollmentsByUser(userId);
        res.send(enrollments);
    });

    app.post("/api/enrollments/:courseId/:userId", async (req, res) => { // enroll a user in a course
        const { courseId, userId } = req.params;
        const status = await dao.enrollUserInCourse(courseId, userId);
        res.send(status);
    });

    app.delete("/api/enrollments/:courseId/:userId", async (req, res) => { // unenroll a user from a course
        const { courseId, userId } = req.params;
        const status = await dao.unenrollUserFromCourse(courseId, userId);
        res.send(status);
    });
}