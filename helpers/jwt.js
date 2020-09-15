const jwt = require('jsonwebtoken');

const generateJwt =(uid)=>{
   return new Promise( (resolve, reject) => {

    const payload = { uid };

    jwt.sign( payload, process.env.JWT, {
        expiresIn: '24h'
    }, ( err, token ) => {

        if ( err ) {
            // no se pudo crear el token
            reject('Failed jwt generated');

        } else {
            // TOKEN!
            resolve( token );
        }

    })

});
}

module.exports ={
    generateJwt
}