const { Schema, Types } = require('mongoose');

require('mongoose-type-email');

const userSchema = new Schema(
  {
    userId:{
      type:Schema.Types.ObjectId,
      default:() => new Types.ObjectId(),
    },

    userName:{
      type: String,
      required: true,
      maxlength:50,
      minlength: 4,
      unique: true
    },
    email:{
      type:mongoose.SchemaTypes.Email, 
      required:true,
      unique:true,
    },
    thoughts:[
      {
        type:Schema.Types.ObjectId,
        ref:'Thoughts'
      },
    ],
    friends:{
      type:Schema.Types.ObjectId,
      ref:'User',
    },
  },
      {
      toJSON:{
        virtuals:true,
      },
      id:false,
    }
);

const User = model('user', userSchema);

module.exports = User;