const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");
const authService = require("./auth.service");

exports.signup = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.body);

  return successResponse(res, user, "User created successfully");
});

exports.login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);

  return successResponse(res, data, "Login successful");
});