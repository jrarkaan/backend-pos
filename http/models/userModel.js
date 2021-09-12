import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Token from './tokenModel.js'

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

// define schema
const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
   level: {
      type: String,
      required: true
   }
});

// define shcema level methods to create access token and refresh token
userSchema.methods = {
   createAccessToken: async function(){
      try{
         let { _id, username } = this;
         let accessToken = jwt.sign(
            {
               user: { _id, username }
            },
            ACCESS_TOKEN_SECRET,
            {
               expiresIn: "10m",
            }
         );
         return accessToken;
      }catch(error){
         console.error(error);
         return;
      }
   },
   createRefreshToken: async function(){
      try{
         let { _id, username } = this;
         let refreshToken = jwt.sign(
            {
               user: { _id, username }
            },
            REFRESH_TOKEN_SECRET,
            {
               expiresIn: "1d"
            }
         );
         await new Token({ token: refreshToken }).save();
         return refreshToken;
      }catch(error){
         console.error(error);
         return;
      }
   }
};

//pre save hook to hash password before saving user into the database:
userSchema.pre("save", async function(next){
   try{

      let salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
      let hashedPassword = await bcrypt.hash(this.password, salt); // hash the current user's password
      this.password = hashedPassword;
   }catch(err){
      console.error(err);      
   }
   return next();
});

const User = mongoose.model('User', userSchema);

export default User;