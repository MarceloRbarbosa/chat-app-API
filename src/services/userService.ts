import usersRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

async function postNewUser(username:string, password: string){
    const conflict = await usersRepository.findUserByUsername(username)
    if(conflict) {
      throw { type: "conflict", message: "this username already exists please choose a new one"}  
    } 
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await usersRepository.createUser( username, passwordHash);

        return newUser;
    }

async function findUsers(username:string, password: string){   
    
    const user = await usersRepository.findUserByUsername(username);    
    if(!user) throw { type: "NOT_FOUND", message: "User not found"}
    
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) throw { type: "unauthorized", message:"Invalid Password"}

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {expiresIn: "30"})

    return token
}

const userService = {
    postNewUser, findUsers
}

export default userService;

