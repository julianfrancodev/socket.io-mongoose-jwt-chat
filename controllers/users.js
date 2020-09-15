const User = require("../models/user");


const getUsers = async (req, res)=>{

    const from  = Number(req.query.from) || 0;

    

    const users = await User.find({_id:{$ne:req.uid}})
    .sort('-online').skip(from).limit(20);

    res.json({
        msg: true,
        users:users
    });


}


module.exports ={
    getUsers
}