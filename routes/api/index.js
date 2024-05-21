const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const usertRoutes = require('./userRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', usertRoutes);

module.exports = router;
