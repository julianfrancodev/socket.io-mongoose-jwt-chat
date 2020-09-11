const express = require('express');
const path = require('path');
const app = express();

// bodyparse

app.use(express.json());


require('dotenv').config();

const {dbConnection} = require('./database/config');
dbConnection();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');
const publicPath =  path.resolve(__dirname,'public');



app.use(express.static(publicPath));

// Routes

app.use('/api/signin', require('./routes/auth'));

server.listen(process.env.PORT,(err)=>{
    if(err){
        throw new Error(err);
    }
    console.log('Server Running!!!')
})