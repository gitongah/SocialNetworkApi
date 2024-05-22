const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThought(req, res) {
    try {
      const findThought= await Thought.find();
      res.json(findThought)

    }catch (err){
      res.status(500).json(err);
    }
  },
  // Get a single thought by ID
  getSingleThought(req, res) {
     Thought.findOne({ _id: req.params.thoughtId }) // Fixed to use Thought model
      .select('-__v')
      .then((thought) => 
        !thought ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought and update the user's thoughts array
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const updatedUser = await User.findOneAndUpdate(
        { userName: req.body.userName },
        { $push: { thoughts: newThought } }, // Correctly pushing the new thought's ID
        { runValidators: true, new: true }
      );
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate( // Fixed to use Thought model
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //create a reaction to a thought
  createReaction(req, res){
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$push: {reactions:req.body.reactionId} },
      { runValidators: true, new: true }

    ).then((thought) =>
        !thought ? res.status(404).json({message: 'no  reaction with that id'})
        :thoughtToReactTo.reaction.$push(req.body))
      .catch((err)=> res.status(500).json(err))

  },

//delete a reaction to a thought
  deleteReaction(req, res){
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$pull: {reactions:{reactionId:req.params.reactionId}} },
      { runValidators: true, new: true }

    ).then((thought) =>
        !thought ? res.status(404).json({message: 'no reaction with that id'})
        :thoughtToReactTo.reaction.$push(req.body))
    .catch((err)=> res.status(500).json(err))
    
  },

  // Delete a thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }) // Fixed to use Thought model
      .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};