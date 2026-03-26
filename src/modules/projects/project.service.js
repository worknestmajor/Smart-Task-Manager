const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

async function createProject(data, userId) {
  const { name, description } = data;

  const project = await prisma.project.create({
    data: {
      name,
      description,
      createdBy: userId
    }
  });

  return project;
}

async function getProjects(userId) {
  return await prisma.project.findMany({
    where: {
      createdBy: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

async function getProjectById(projectId, userId) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      createdBy: userId
    }
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
}

module.exports = {
  createProject,
  getProjects,
  getProjectById
};