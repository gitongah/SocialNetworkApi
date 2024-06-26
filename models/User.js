const { Schema, model } = require('mongoose');

require('mongoose-type-email');

const userSchema = new Schema(
  {
    userName:{
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type: String,
      required:true,
      unique:true,
    },
    thoughts:[
      {
        type:Schema.Types.ObjectId,
        ref:'Thought'
      },
    ],
    friends:[
      {
      type:Schema.Types.ObjectId,
      ref:'User',
    },
  ],  
  },
      {
      toJSON:{
        virtuals:true,
      },
      id:false,
    }
);


userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;