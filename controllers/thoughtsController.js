const { User,Thought} = require('../models');


module.exports = {
  //getting all the thoughts
  getThought(req, res){
    Thought.find()
      .then((thought)=> res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // getting a single thought by the id
  getSingleThought(req, res){
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((thought) => 
        !thought ?res.status(404).json({ message: 'No user with that ID'})
        :res.json(thought)
    )
    .catch((err) => res.status(500).json(err))
  },

  //Creating a new thought

  async createThought(req, res){
    try{
      const newThought = await Thought.create(req.body);

      const updateUser = await User.findOneAndUpdate(
        {
          _id: req.params.userId ,
          thoughts:{$ne : newThought}
        },
        {$push: {thoughts: newThought }},
        { runValidators: true, new: true }
      )
      res.json(newThought);

    }
    catch(err){
      res.status(500).json(err)

    }
  },
  //update a thought
  updateThought(req, res){
    User.findOneAndUpdate(
      {_id: req.params.thoughtId },
      {$set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
      !thought ? res.status(404).json({ message: 'No User with that ID' })
      :res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete thought by ID

  deleteThought(req, res){
    Thought.findOneAndDelete({_id: req.params.userId })
      .then((thought)=>
      !thought ?res.status(404).json({ message: 'No user match with that ID'})
      :res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

};