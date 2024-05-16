
const express = require('express');
const { register , login } = require('../handlers/user');
const { NewComment, getAll, addAnswer, singleComment, getAllAnswer } = require('../handlers/blog');
const isAuth = require('../middelwares/isAuth')

const userRoute = express.Router();


userRoute.post('/inscription', register);
userRoute.post('/signIn' , login)


// route for creating a new comment 

userRoute.post('/create', isAuth, NewComment)
userRoute.get('/comments' , getAll)
userRoute.post('/addAnswer/:id' , isAuth , addAnswer)
userRoute.get('/singleCom/:id', singleComment)
userRoute.get('/answers', getAllAnswer)








// userRoute.get('/questions/:id', (req, res) => {
//     const id = req.params.id;
//     db.select()
//       .from('user')
//       .where({ id })
//       .first()
//       .then((question) => {
//         if (question) {
//           res.json(question);
//         } else {
//           res.status(404).json({ error: 'Question not found' });
//         }
//       })
//       .catch(() => {
//         res.sendStatus(422);
//       });
//   });
  






module.exports = userRoute