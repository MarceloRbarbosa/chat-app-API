import { Router } from "express";
import userRouter from "./usersRouter";
import healthCheck from "./healthRouters";


const routers = Router();
routers.use(healthCheck)
routers.use(userRouter)

export default routers;