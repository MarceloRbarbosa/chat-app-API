import usersRepository from "../repositories/userRepository";
import bcrypt from "bcrypt"

async function postNewUser(username:string, password: string){
    const conflict = await usersRepository.findUserByUsername(username)
    if(conflict) {
      throw { type: "conflict", message: "this username already exists please choose a new one"}  
    } 
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await usersRepository.createUser( username, passwordHash);

        return newUser;
    }


const userService = {
    postNewUser
}

export default userService;

