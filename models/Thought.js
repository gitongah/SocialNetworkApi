const { Schema, Types } = require('mongoose');

const thoughtsSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  
    reactions:[
      {
        type:Schema.Types.ObjectId,
        ref: 'Reactions'
      },
    ],
  },
  {
    toJSON: {
      getters:true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;