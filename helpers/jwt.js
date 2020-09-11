const jwt = require('jsonwebtoken');

const generateJwt =(uid)=>{
   return new Promise((resolve, reject)=>{
    const paylaod = {
        uid
    }

    jwt.sign(paylaod, process.env.JWT,{
        expiresIn: '48h'
    },(err, token)=>{
        if(err){
            reject('No token generated')
        }else{
            resolve(token);
        }
    });
   });
}

module.exports ={
    generateJwt
}