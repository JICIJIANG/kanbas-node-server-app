import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // 创建作业
  app.post("/api/assignments", (req, res) => {
    const newAssignment = assignmentsDao.createAssignment(req.body);
    res.status(201).json(newAssignment);
  });

  // 获取所有作业
  app.get("/api/assignments", (req, res) => {
    const assignments = assignmentsDao.findAssignments();
    res.json(assignments);
  });

  // 更新作业
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, req.body);
    res.json(updatedAssignment);
  });

  // 删除作业
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    assignmentsDao.deleteAssignment(assignmentId);
    res.status(204).send();
  });
}
