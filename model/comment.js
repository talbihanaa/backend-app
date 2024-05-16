const mongoose = require('mongoose');


const comment  = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    contenu :{
        type: String ,
        require : true
    },
    postedBy :{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"
    },
    answers :[
        {
            answer :{
                type: mongoose.Schema.Types.ObjectId ,
                ref :"Answer"
            }
        }
    ]
})



module.exports = mongoose.model('Comment',comment)