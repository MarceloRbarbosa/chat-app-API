import { Router } from "express"
import healthCheck from "../controllers/healthController"

const healthRouter = Router()
healthRouter.get("/health", healthCheck)

export default healthCheck