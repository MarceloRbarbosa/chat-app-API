import { asyncHandler } from "../utils/asyncHandler";
import httpStatus from "http-status";
import userService from "../services/userService";

const signUp = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  await userService.postNewUser(username, password);
  res.sendStatus(httpStatus.CREATED);
});

const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const token = await userService.findUsers(username, password);
  res.status(httpStatus.OK).json({ token });
});

export default { signUp, signIn };
