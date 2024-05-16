const mongoose = require('mongoose');

const connectdb = async()=>{

    await mongoose.connect("mongodb+srv://hanatalbi87:9HevDdTYNte7bn6v@cluster0.cucvqei.mongodb.net/",{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connect to DB")

        
    })
    .catch((err) => console.log(err))
}

module.exports = connectdb;



