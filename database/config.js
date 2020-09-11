const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        });

        console.log('Db online');


    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    dbConnection
}