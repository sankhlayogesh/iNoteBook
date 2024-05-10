var jwt = require('jsonwebtoken');

const JWT_SECRET = 'inote$book'

const fatchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({status: "ERROR", message: "Please authenticate using valid token"})
    }
    try {
        // verify the token and recived decoded data (in data veriable) from token data
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).json({status: "ERROR", message: "Please authenticate using valid token"})
    }
}

module.exports = fatchUser;