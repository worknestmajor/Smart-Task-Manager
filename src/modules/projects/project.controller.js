const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");
const projectService = require("./project.service");

exports.createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body, req.user.userId);

  return successResponse(res, project, "Project created");
});

exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getProjects(req.user.userId);

  return successResponse(res, projects);
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(
    req.params.id,
    req.user.userId
  );

  return successResponse(res, project);
});