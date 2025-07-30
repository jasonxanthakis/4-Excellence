const express = require('express');
const userRouter = require('./routers/userRouter');
const gameRouter = require('./routers/gameRouter');
const app = express();


app.use(express.json());

// Routes 
app.use('/user', userRouter); // user routes: /user/___
app.use('/game', gameRouter); // game routes: game/_____


app.get("/", (req, res) => {
  res.status(200).json({
    title: "Educational Quiz Game",
    description: "Homepage"
  })
})

app.use('/user', userRouter);
app.use('/game', gameRouter);

module.exports = app;


