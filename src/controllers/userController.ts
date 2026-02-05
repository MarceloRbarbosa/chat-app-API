import { Request, Response } from "express";
import userService from "../services/userService";
import  httpStatus  from "http-status";


async function signUp(req: Request, res: Response ) {
    const { username, password} = req.body;
    await userService.postNewUser( username, password );

     res.status(httpStatus.CREATED).send({
        message: "User created successfully",
    })
}

async function signIn(req: Request, res: Response) {
    const loginUsername = req.body.username
    const loginPassword = req.body.password;

    const result = await userService.findUsers(loginUsername, loginPassword);
    res.status(httpStatus.OK).json(result);
}

const userController = {
    signUp, signIn
}

export default userController;
