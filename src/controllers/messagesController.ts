import { Response } from "express";
import  httpStatus  from "http-status";
import messagesService from "../services/messagesService";
import { AuthenticatedRequest } from "../protocols/protocolTypes"

async function postMessage(req: AuthenticatedRequest, res: Response){
    const userId = req.userId!;
    const { to, text, type } = req.body

    const message = await messagesService.createMessage({ userId, to, text, type });

    return res.status(httpStatus.CREATED).send(message);
}

async function getMessages(req: AuthenticatedRequest, res: Response) {
    const messages = await messagesService.listMessages();
    return res.status(httpStatus.OK).send(messages);
}

const messagesController = { postMessage, getMessages}

export default messagesController;