const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const projectRoutes = require("../modules/projects/project.routes");
const taskRoutes = require("../modules/tasks/task.routes");
const assignmentRoutes = require("../modules/assignments/assignment.routes");

router.use("/assignments", assignmentRoutes);
router.use("/tasks", taskRoutes);
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working"
  });
});

module.exports = router;