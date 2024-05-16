
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


const isAuth =async(req,res,next)=>{

    try {

        let token = req.header('Authorization');

        // console.log(token);
        let decoded = jwt.verify(token , process.env.SECRET_KEY);

        // console.log(decoded);
        if(!decoded){

            return res.status(400).json({msg:"you are not allowed to do this action"})
        }

        // else implicitement

        let user = await User.findById(decoded.id);

        req.user = user ;

        next()

        
    } catch (error) {
        
        res.status(500).json({msg:"server error from isAuth "})
    }


}

module.exports = isAuth