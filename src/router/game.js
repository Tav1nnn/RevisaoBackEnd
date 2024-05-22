const express = require("express");
const { auth } = require("../middleware/auth")
const zod = require("zod");
const { findByIdGame,findAllGame,updateGame,deleteGame,registerGame } = require("../repository/gameRepository")

const router = express.Router();

const SchemaGame = zod.object({
    name: zod.string(),
    plataform: zod.string(),
    description: zod.string()
})

router.use(auth);

router.post("/register", async (req, res) => {
    try {
        const game = SchemaGame.parse(req.body);

        const newGame = await registerGame(game, req.user.id);

        if(!newGame.id){
            res.status(400).json({"erro": "erro criação de user"});
            return;
        }

        res.status(201).json(newGame);

    } catch (error) {
        res.status(400).json(error)
    }
});

router.get("/allGames", async (req,res) => {
    try {
        const games = await findAllGame(req.user.id);

        res.status(200).json(games)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", async (req,res) => {
    try{
        const id = Number(req.params.id);

        const game = await findByIdGame(id, req.user.id);

        if(!game){
            res.status(404).json({"erro": "game não encontrado"});
            return
        }

        const putGame = await updateGame(game, id);

        res.status(200).json(putGame)
    }
    catch(error){
        res.status(500).json(error);
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);

        const game = await findByIdGame(id, req.user.id);

        if(!game){
            res.status(404).json({"erro": "game não encontrado"});
            return
        }

        const putGame = await deleteGame( id);

        res.sendStatus(200)
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = {
    router: router,
}