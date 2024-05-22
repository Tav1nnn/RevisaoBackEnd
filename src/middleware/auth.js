const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send("Access Denied");
    }

    try {
        const jwtVerify = jwt.verify(token, "shhh");
        req.user = jwtVerify;
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
    
}

module.exports = {
    auth
}