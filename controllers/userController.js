const { User} = require('../models');


module.exports = {
  //getting all the users
  getUser(req, res){
    User.find()
      .then((user)=> res.json(user))
      .catch((err) => {
        res.status(500).json(err)
        console.log(err)
      })
  },
  // getting a single user by the id
  getSingleUser(req, res){
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => 
        !user ?res.status(404).json({ message: 'No user with that ID'})
        :res.json(user)
    )
    .catch((err) => res.status(500).json(err))
  },

  //Creating a new user

  createUser(req, res){
    User.create(req.body)
    .then((user)=> res.json(user))
    .catch((err)=> {
      res.json(err);
      return res.status(500).json(err);
    });
  },
  //update a user
  async updateUser(req, res){
    User.findOneAndUpdate(
      {_id: req.params.userId },
      {$set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
      !user ? res.status(404).json({ message: 'No User with that ID' })
      :res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // //add friend to user
    addFriend(req, res){
     User.findOneAndUpdate(
      {_id: req.params.userId },
      {$push: {friends:req.params.friendId} },
      { runValidators: true, new: true }
    )
      .then((user) =>
      !user ? res.status(404).json({ message: 'No User with that ID' })
      :res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

    //delete friend
    removeFriend(req, res){
     User.findOneAndUpdate(
      {_id: req.params.userId },
      {$pull: {friends:req.params.friendId} },
      { runValidators: true, new: true }
    )
      .then((user) =>
      !user ? res.status(404).json({ message: 'No User with that ID' })
      :res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },


  

  // delete user by ID

  deleteUser(req, res){
    User.findOneAndDelete({_id: req.params.userId })
      .then((user)=>
      !user ?res.status(404).json({ message: 'No user match with that ID'})
      :res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

};