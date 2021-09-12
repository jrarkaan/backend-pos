import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connection = async()=>{
   try{
      const conn = await mongoose.createConnection(process.env.CONNECTION_URL).asPromise();
      console.log(`MongoDB was connected: ${conn.host}: 27017`.cyan.underline.bold);
   }catch(error){
      console.log(`Error: ${error.message}`.red.underline.bold);
   }
};

export default connection;