const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt");
const { register, findByEmail } = require("../repository/userRepository");
const zod  = require("zod");

const router = express.Router();

const UserSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/register", async (req, res) => {
    try {
        const {email, password} = UserSchema.parse(req.body);
        
        const user = await findByEmail(email);

        if(user) {
            res.status(400).json({message: "User already exists."});
            return;
        }

        const hash = bcrypt.hashSync(password, 10);

        const savedUser = await register({email, password: hash});

        delete savedUser.password;

        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({error});
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = UserSchema.parse(req.body);

        const user = await findByEmail(email);

        if(!user){
            res.status(400).json({message: "credenciais invalidas"});
            return;
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            res.status(400).json({message: "credenciais invalidas"});
            return;
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, "shhh");

        res.status(200).json({Token: token});

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = {
    router: router,
}