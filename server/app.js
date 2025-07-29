const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger.js');
const userRouter = require('./routers/user.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    title: "Educational Quiz Game",
    description: "Homepage"
  })
})

app.use('/user', userRouter);
app.use('/game', gameRouter);

module.exports = app; 


