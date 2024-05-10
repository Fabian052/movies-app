const express = require("express");
const genreRouter = require("./genre.router");
const actorRouter = require("./actor.router");
const directorRouter = require("./director.router");
const movieRouter = require("./movie.router");
const router = express.Router();

router.use(genreRouter);
router.use(actorRouter);
router.use(directorRouter);
router.use(movieRouter);

module.exports = router;
