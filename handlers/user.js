const userSchema = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// inscription

const register = async(req , res)=>{

  try{
    const {username , email , password} = req.body ;

    // first test looking if the email is already existed
    let exist = await userSchema.findOne({email: email});

    if(exist){
        return res.status(400).json({msg:"email already exist"})
    }

      if(!email || !username || !password){
        return res.status(400).json({msg:"all fields are required"})
      }
     let newUser= await new userSchema(req.body) ;
     const saltRounds = 10;
     
     const salt = bcrypt.genSaltSync(saltRounds);
     const hash = bcrypt.hashSync(newUser.password, salt);

     newUser.password = hash ;
     newUser.save()

     res.status(200).json({msg:"user created " , newUser})

}catch(err){

    res.status(500).json({msg:"can not  created a new user"})

}



}

const login =async(req,res)=>{

  try {
      const {email , password} = req.body ;
      // find if the email exist

      const exist = await userSchema.findOne({email});

      if(!exist){

          return res.status(400).json({msg:"there is no account with this email"})
      }

      let pwdMatch = bcrypt.compareSync( password ,exist.password );

      if(!pwdMatch){

          return res.status(400).json({msg:"wrong email or password"})
      }
      let payload = {id: exist._id , email : exist.email}
      let token = jwt.sign(payload, process.env.SECRET_KEY );
      res.status(200).json({msg:"logged with sucess" , token , exist})
     
  } catch (error) {
     
      res.status(500).json({msg:"server error while log in"})
  }

}

// const Question = async()=>{
//   await 
// }




module.exports = {register, login}