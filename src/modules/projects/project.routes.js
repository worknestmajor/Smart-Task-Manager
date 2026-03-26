const express = require("express");
const router = express.Router();

const projectController = require("./project.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/", authMiddleware, projectController.createProject);
router.get("/", authMiddleware, projectController.getProjects);
router.get("/:id", authMiddleware, projectController.getProjectById);

module.exports = router;