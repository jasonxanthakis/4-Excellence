// routers/gameRouter.js
const express = require('express');
const gameRouter = express.Router();
const gameController = require("../controllers/user");

// Game Routers
// gameRouter.get('/', gameController.getRandomQuestions);  // get 10 random questions
// gameRouter.post('/:gameID', gameController.startGame);   // reponse should include game details, and in the case of quizzes a selection of 10 random questions
// gameRouter.post('/:gameID/ended', gameController.endGame);   // req body should include score

module.exports = gameRouter;