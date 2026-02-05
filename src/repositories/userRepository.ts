import  prisma  from "../config/database";

async function createUser(username: string, password: string) {
    const newUser = prisma.user.create({
        data:{ username, password },
    });
    return newUser;
}

async function findAllUsers(){
const users = prisma.user.findMany();

return users
}

async function findUserByUsername(username:string) {
    const user = prisma.user.findUnique({where: {username}})

    return user;
}

async function findUserById(id:number){
    const user = prisma.user.findUnique({where: {id}})

    return user;
}



const usersRepository = {
    createUser, findAllUsers, findUserById, findUserByUsername
}

export default usersRepository;
