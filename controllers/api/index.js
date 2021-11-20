const router = require('express').Router();

const userRoutes = require("./user-routes");
const tournamentRoutes = require('./tournament-routes');
const commentRoutes = require('./comment-routes');
const gameRoutes = require('./game-routes');
const downloadRoutes = require('./download-routes');

router.use('/users', userRoutes);
router.use('/tournaments', tournamentRoutes);
router.use('/comments', commentRoutes);
router.use('/games', gameRoutes);
router.use('/downloads', downloadRoutes);

module.exports = router;