const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const projectRoutes = require("../modules/projects/project.routes");

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working"
  });
});

module.exports = router;