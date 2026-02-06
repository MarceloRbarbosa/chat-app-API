import { Router } from "express";
import userRouter from "./usersRouter";
import healthRouter from "./healthRouters";
import messagesRouter from "./messagesRouters"


const routers = Router();
routers.use(healthRouter)
routers.use("/auth", userRouter)
routers.use(messagesRouter)

export default routers;