const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger.js');
const userRouter = require('./routers/userRouter');
//const gameRouter = require('./routers/gameRouter');

const app = express();
app.use(express.json());

// Routes 
app.use('/user', userRouter); // user routes: /user/___
app.use('/game', gameRouter); // game routes: game/_____

app.use(cors(corsOptions));
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    title: "Educational Quiz Game",
    description: "Homepage"
  })
})

app.use('/user', userRouter);
//app.use('/game', gameRouter);

module.exports = app;