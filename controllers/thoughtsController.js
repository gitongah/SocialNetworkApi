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
 async createReaction(req, res){

    try{
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, {$addToSet:{reactions:req.body}},{runValidators:true, new:true});
       if(!thought){
        return res.status(404).json({message:'no thought with that id can be found'})
       }
      //  thought.reactions.push(req.body);
       res.json(thought)


    }catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  },

//delete a reaction to a thought
  async deleteReaction(req, res){
    try{
      const thought = Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions:{reactionId:req.params.reactionId}} },
        { runValidators: true, new: true }
      );
      if(!thought){
        return res.status(404).json({message:'no thought with that id can be found'})
      }
      res.json(thought)
     
    }catch(err){
      res.status(500).json(err)
      console.log(err);
    }    
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