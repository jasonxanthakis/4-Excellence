const { Router } = require("express");
// const gameController = require("../controllers/game.js");

const gameRouter = Router();

// gameRouter.get('/', gameController.getRandomQuestions);  // get 10 random questions
// gameRouter.post('/:gameID', gameController.startGame);   // reponse should include game details, and in the case of quizzes a selection of 10 random questions
// gameRouter.post('/:gameID/ended', gameController.endGame);   // req body should include score

module.exports = gameRouter;