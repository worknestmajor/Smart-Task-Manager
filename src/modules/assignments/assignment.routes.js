const express = require("express");
const router = express.Router();

const controller = require("./assignment.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/:taskId", authMiddleware, controller.assignUser);
router.get("/:taskId", authMiddleware, controller.getAssignees);
router.delete("/:taskId/:userId", authMiddleware, controller.removeAssignee);

module.exports = router;