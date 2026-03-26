const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");
const taskService = require("./task.service");

exports.createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user.userId);
  return successResponse(res, task, "Task created");
});

exports.getTasksByProject = asyncHandler(async (req, res) => {
  const tasks = await taskService.getTasksByProject(
    req.query.projectId,
    req.user.userId
  );

  return successResponse(res, tasks);
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(
    req.params.id,
    req.user.userId
  );

  return successResponse(res, task);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.id,
    req.body,
    req.user.userId
  );

  return successResponse(res, task, "Task updated");
});

exports.deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user.userId);

  return successResponse(res, null, "Task deleted");
});