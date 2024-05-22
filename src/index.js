const express = require("express");
const { router: userRouter } = require("./router/user");
const {router: gameRouter} = require("./router/game")

const server = express();

server.use(express.json());

server.use('/user', userRouter);
server.use('/game', gameRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = 3000;

server.listen(port,() => {
    console.log("servidor rodando na porta: " + port);
})