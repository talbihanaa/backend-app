
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectdb= require('./config/connectdb');

const userSchema = require('./model/userModel');
const userRoute = require('./Routes/userRouter');
// const comment = require('./config/connectdb');

require('dotenv').config();

const app = express();

connectdb();
const secret='secret123';

app.use(cors());
// app.use(express.json())
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded());
app.use(cookieParser());


app.use('/auth', userRoute)
const port = process.env.PORT;

app.listen(port, () => {
    console.log('listening on port: ' + port);
});
