const router =  require('express').Router();

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,

} = require('../../controllers/userController');
//api/ thoughts
router.route('/').get(getUser).post(createUser);

//api/ thoughts/:thoughtId

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;
