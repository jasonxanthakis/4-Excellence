const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/routers');
const app = express();
app.use(cors());

app.use(express.json());
app.use('/user', userRouter);
//app.use('/quiz', quizRouter)


app.get("/", (req, res) => {
  res.status(200).json({
    title: "Educational Quiz Game",
    description: "Homepage"
  })
})

module.exports = app; 


