import { Router } from "express";
import userController from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import { signUpSchema } from "../schemas/userSchema";

const userRouter = Router()
userRouter.post("/signup", validateSchema(signUpSchema), userController.SignUp)


export default userRouter