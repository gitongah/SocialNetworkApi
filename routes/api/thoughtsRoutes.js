const router =  require('express').Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,

} = require('../../controllers/thoughtsController');
//api/ thoughts
router.route('/').get(getThought).post(createThought);

//api/ thoughts/:thoughtId

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;
