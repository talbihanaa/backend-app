
const comment = require('../model/comment');
const Comment = require('../model/comment');
const User = require('../model/userModel');

const Answer = require('../model/answers');


// create a new comment 

const NewComment = async(req,res)=>{

    try{
        let {_id} = req.user ;
        let {title , contenu} = req.body ;

        const comment = new Comment({title,contenu , postedBy: _id});

        comment.save();

        res.status(200).json({msg:"comment inserted" , comment})
    }catch(err){

        res.status(500).json({msg:"server error while creating a new comment"})
    }
}

//get all comments


const getAll = async(req, res)=>{
    
    try{
       const comments= await comment.find({})
        res.status(200).json({msg:"get all the comments", comments})
    }catch(err){
        res.stauts(500).json({msg:"server error"})
    }
}


// create an anwser for a comment

const addAnswer = async(req,res)=>{

try {
    let {_id} = req.user ;
    let {id} = req.params ;
    console.log(id);
    let {contenu} = req.body ;

   let newAnswer =  await new Answer({contenu , answerdBy : _id})
   let answerID = newAnswer._id ;
   

  console.log(newAnswer);
   let comment = await Comment.findByIdAndUpdate({_id:id}, {
    answers:{
        $push :{
            answer: answerID
        }
    }

},{new:true});
console.log(comment);
newAnswer.save();
res.status(200).json({msg:"answer created with sucess", comment})
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"server error while creating an answer"})
  
}
}

//get a comment by id 


const singleComment = async(req,res)=>{
    const {id} = req.params ;
console.log(id);
   let data =  await Comment.findById({_id : id})
   data.populate('answers._id')
//    console.log(data)
    .then((doc)=>{
        res.status(200).json(doc)
    })
    .catch((err)=>{
        res.status(500).json({msg:"error server" , err})
    })
} 


const getAllAnswer = async(req,res)=>{

    await Answer.find({})
    .then((doc)=>{
        res.status(200).json(doc)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
}
module.exports = {NewComment, getAll,addAnswer,singleComment,getAllAnswer}