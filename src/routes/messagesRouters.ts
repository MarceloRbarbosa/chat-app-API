import { Router } from "express"
import messagesController from "../controllers/messagesController"
import { authenticateToken } from "../middlewares/tokenMiddleware"

const messageRouter = Router();

messageRouter.post("/chat", authenticateToken, messagesController.postMessage)
messageRouter.get("/chat", authenticateToken, messagesController.getMessages)

export default messageRouter