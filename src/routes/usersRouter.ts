import { Router } from "express";
import userController from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";
import { signUpSchema, signInSchema } from "../schemas/userSchema";

const userRouter = Router()
userRouter.post("/auth/signup", validateSchema(signUpSchema), userController.signUp)
userRouter.get("/auth/signin", validateSchema(signInSchema), userController.signIn)

export default userRouter