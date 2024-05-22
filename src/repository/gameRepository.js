const { prisma } = require("./prisma")

const findAllGame = async (userId) => {
    return await prisma.game.findMany({
        where: {
            userId: userId
        }
    });
}

const findByIdGame = async (idGame, userId) => {
    return await prisma.game.findUnique({
        where: {
            id: idGame,
            userId: userId
        }
    });
}

const registerGame = async (game, userId) => {
    return await prisma.game.create({
        data: {
            name: game.name,
            plataform: game.plataform,
            description: game.description,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
}

const updateGame = async  (game, id) => {
    return await prisma.game.update({
        where: {id: id},
        data: game
    });
}

const deleteGame = async (idGame) => {
    return await prisma.game.delete({
        where: { id: idGame}
    })
}

module.exports = {
    findAllGame,
    findByIdGame,
    registerGame,
    updateGame,
    deleteGame
}