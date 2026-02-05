import  prisma  from "../config/database";

type CreateUserData = {
    username: string,
    password: string,
}

async function createUser(data: CreateUserData) {
    const newUser = prisma.user.create({
        data,
        select: {
            id: true,
            username: true,
            password:true,
        },
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
