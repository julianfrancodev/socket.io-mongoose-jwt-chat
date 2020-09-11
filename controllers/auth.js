const { json } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');
const { validationResult } = require('express-validator');

const createUser = async (req, res)=>{

    const {email, password} = req.body;

    try {

        const validateEmail = await User.findOne({email:email});

        if(validateEmail){
            return res.status(400).json({
                ok:false,
                message: "Email already registered"
            });
        }

        const user = new User(req.body);

        // crypt password   

        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password,salt);  

        await user.save();

        const token = await generateJwt(user.id);
        
        res.send({
            ok: true,
            user: user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            message:"Unexpected Error"
        })
    }

 
}

const login = async (req, res)=>{
    const {email,password} = req.body;

    try {

        const userDB = await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok:false,
                message: "Email not found"
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword){
            return res.status(404).json({
                ok:false,
                message: "Password invalid"
            });
        }

        // Genrate JWT

        const token = await generateJwt(userDB.id);

        res.send({
            ok: true,
            user: userDB,
            token
        })
    } catch (error) {
        console.log(error);
    }
}

const renewToken = async (req, res,)=>{

    const {uid} = req;

    const token = await generateJwt(uid);

    const userDB = await User.findOne({uid});

    if(!userDB){
        res.json({
            ok: false,
            message: 'User not found'
        })
    }


    res.json({
        ok: true,
        user: userDB,
        token
    })
}

module.exports ={
    createUser,
    login,
    renewToken
}