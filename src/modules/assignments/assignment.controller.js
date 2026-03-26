const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");
const assignmentService = require("./assignment.service");

exports.assignUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const assignment = await assignmentService.assignUser(
    req.params.taskId,
    userId,
    req.user.userId
  );

  return successResponse(res, assignment, "User assigned");
});

exports.getAssignees = asyncHandler(async (req, res) => {
  const data = await assignmentService.getAssignees(
    req.params.taskId,
    req.user.userId
  );

  return successResponse(res, data);
});

exports.removeAssignee = asyncHandler(async (req, res) => {
  await assignmentService.removeAssignee(
    req.params.taskId,
    req.params.userId,
    req.user.userId
  );

  return successResponse(res, null, "User removed");
});