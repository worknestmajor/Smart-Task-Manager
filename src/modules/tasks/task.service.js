const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

async function createTask(data, userId) {
  const { title, description, projectId, dueDate } = data;

  // check project exists and belongs to user
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      createdBy: userId
    }
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      createdBy: userId,
      dueDate: dueDate ? new Date(dueDate) : null
    }
  });

  return task;
}

async function getTasksByProject(projectId, userId) {
  return await prisma.task.findMany({
    where: {
      projectId,
      project: {
        createdBy: userId
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

async function getTaskById(taskId, userId) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        createdBy: userId
      }
    }
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
}

async function updateTask(taskId, data, userId) {
  const existingTask = await getTaskById(taskId, userId);

  if (data.dueDate) {
    data.dueDate = new Date(data.dueDate);
  }

  return await prisma.task.update({
    where: { id: taskId },
    data
  });
}

async function deleteTask(taskId, userId) {
  await getTaskById(taskId, userId);

  await prisma.task.delete({
    where: { id: taskId }
  });

  return true;
}

module.exports = {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask
};