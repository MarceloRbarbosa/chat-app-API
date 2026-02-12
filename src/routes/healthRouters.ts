import { Router } from "express"
import healthController from "../controllers/healthController"

const healthRouter = Router()
healthRouter.get("/health", healthController.healthCheck)
healthRouter.get("/", healthController.realTimeChat)

export default healthRouter