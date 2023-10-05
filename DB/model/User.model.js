import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: "string", required: true },

    firstName: { type: String },

    lastName: { type: String },

    email: {
      type: String,
      unique: [true, 'email must be unique value'],
      required: [true, 'userName is required'],
      lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
},
forgetCode: {
  type: Number,
  default: null,
},
createdAt: {
  type: Number,
  default: null,
},
    phone: { type: String, required: true },

    age: { type: Number },
    gender: {
      type: String,
      default: 'male',
      enum: ['male', 'female']
  },
    confirmEmail: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false },
    status: {
      type: String,
      default: 'offline',
      enum: ['offline', 'online']
  },
  profileImage: Object,

  
  coverImages:Object


}
  , {
    timestamps: true
})

userSchema.pre("save",function(){

    
const names =this.userName.split(" ")

this.firstName=names[0]
this.lastName=names[1]
  }

)


const userModel = mongoose.model('User', userSchema);
export default userModel