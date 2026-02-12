import { Request , Response } from "express";
import  httpStatus  from "http-status";

 async function healthCheck(req: Request, res: Response) {
    res.status(httpStatus.OK).send(" I'm OK!");
}

async function realTimeChat(req: Request, res: Response){   
  res.status(200).json({
    name: "Realtime Chat API",
    status: "running",
    health: "/health",
    version: "1.0.0",
  });
}

const healthController = { healthCheck, realTimeChat}

export default healthController;