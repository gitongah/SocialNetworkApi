const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const thoughtsSchema = new Schema(
  {
    thoughtText:{
      type: String,
      required:true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName:
      {
        type: String,
        required: true
      },
  
    reactions:[reactionSchema],
  },
  {
    toJSON: {
      getters:true,
    },
    id: false,
  }
);
thoughtsSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
})

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;
