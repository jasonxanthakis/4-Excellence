const express = require('express');
const userRouter = require('./routers/userRouter');
const gameRouter = require('./routers/gameRouter');

const app = express();

// Basic JSON parsing (required for POST/PUT requests)
app.use(express.json());

// Routes (exactly as you requested)
app.use('/user', userRouter); // user routes: /users/___
app.use('/game', gameRouter); // game routes: game/_____

// Optional: Basic homepage route
app.get("/", (req, res) => {
  res.status(200).json({
    title: "Educational Quiz Game",
    description: "Homepage"
  })
})

module.exports = app;


