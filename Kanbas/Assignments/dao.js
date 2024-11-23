import Database from "../Database/index.js";

// 创建作业
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

// 查找所有作业
export function findAssignments() {
  return Database.assignments;
}

// 更新作业
export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = Database.assignments.find((a) => a._id === assignmentId);
  if (!assignment) throw new Error("Assignment not found");
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}

// 删除作业
export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
}
