const { prisma } = require("./prisma")

const register = async (user) => {
    return await prisma.user.create({
        data: user
    });
}

const findByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { 
            email: email 
        }
    });
}

module.exports = {
    register,
    findByEmail
}