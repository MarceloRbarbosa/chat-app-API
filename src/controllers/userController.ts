import { Request, Response } from "express";
import userService from "../services/userService";
import  httpStatus  from "http-status";


async function SignUp(req: Request, res: Response ) {
    const { username, password} = req.body;
    await userService.postNewUser( username, password );

     res.status(httpStatus.CREATED).send({
        message: "User created successfully",
    })
}

const userController = {
    SignUp
}

export default userController;
