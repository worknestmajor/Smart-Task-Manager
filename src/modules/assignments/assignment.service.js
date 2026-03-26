const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

async function assignUser(taskId, userId, currentUserId) {
  // check task belongs to current user
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      project: {
        createdBy: currentUserId
      }
    }
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  // check user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // create assignment
  try {
    return await prisma.taskAssignment.create({
      data: {
        taskId,
        userId
      }
    });
  } catch (err) {
    throw new AppError("User already assigned", 400);
  }
}

async function getAssignees(taskId, currentUserId) {
  return await prisma.taskAssignment.findMany({
    where: {
      taskId,
      task: {
        project: {
          createdBy: currentUserId
        }
      }
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

async function removeAssignee(taskId, userId, currentUserId) {
  const assignment = await prisma.taskAssignment.findFirst({
    where: {
      taskId,
      userId,
      task: {
        project: {
          createdBy: currentUserId
        }
      }
    }
  });

  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }

  await prisma.taskAssignment.delete({
    where: {
      id: assignment.id
    }
  });

  return true;
}

module.exports = {
  assignUser,
  getAssignees,
  removeAssignee
};