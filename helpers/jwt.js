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

const validateDartJwt =(token = '') =>{


   
    try {

        const {uid} = jwt.verify(token, process.env.JWT);
        const id = uid;
        return [true, id];        
    } catch (error) {
       return [false, null];
    }


}

module.exports ={
    generateJwt,
    validateDartJwt
}