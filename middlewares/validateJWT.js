const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => { 

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:true,
            message:"Unauthorized"
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT);

        req.uid = uid;


        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:true,
            message:"Invalid Token"
        });
    }

}

module.exports = {
    validateJWT
}