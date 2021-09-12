import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const signup = async(req, res)=>{
   try{
      //check if username is already taken:
      let user = await User.findOne({ username: req.body.username });
      if (user) {
         return res.status(400).json({ error: "Username taken." });
      } else {
         //create new user and generate a pair of tokens and send
         user = await new User(req.body).save();
         let accessToken = await user.createAccessToken();
         let refreshToken = await user.createRefreshToken();
         return res.status(201).json({ accessToken, refreshToken });
      }
   }catch(err){
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error!" });
   }
};

const login = async(req, res)=>{
   try{
      //check if user exists in database:
      let user = await User.findOne({ username: req.body.username });
      //send error if no user found:
      if(!user) {
         return res.status(404).json({ error: "No user found!" });
      }else{
         //check if password is valid:
         let valid = await bcrypt.compare(req.body.password, user.password);
         if(valid){
            //generate a pair of tokens if valid and send
            let accessToken = await user.createAccessToken();
            let refreshToken = await user.createRefreshToken();
            return res.status(201).json({ accessToken, refreshToken });
         }else{
            //send error if password is invalid
            return res.status(401).json({ error: "Invalid password!" });
         }
      }
   }catch(err){
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error!" });
   }
};

const generateRefreshToken  = async(req, res)=>{
   try{
      
   }catch(err){
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error!" });
   }
}

const logout = async(req, res)=>{

}

export {
   signup, login, generateRefreshToken, logout
};