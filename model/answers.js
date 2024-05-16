

const mongoose = require('mongoose');


const answer = new mongoose.Schema({

    contenu :{
        type : String ,
        required : true
    },
    answerdBy :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    }
})


module.exports = mongoose.model('Answer' , answer)