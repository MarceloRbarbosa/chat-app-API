import  prisma  from "../config/database";

async function createUser(username: string, passwordHash: string) {
    const newUser = prisma.user.create({
        data:{
            username,
            password: passwordHash,
        }
    })
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
    const user = prisma.user.findUnique({where: id})

    return user;
}

async function deleteUser(id:number) {
    await prisma.user.delete({where: id})
}

const usersRepository = {
    createUser, findAllUsers, findUserById, findUserByUsername, deleteUser
}

export default usersRepository;
