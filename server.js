import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
// development
import morgan from "morgan";
import colors from 'colors';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors());

app.get('/', (req, res)=>{
   res.send('API is running');
});

// set-up
if(process.env.NODE_ENV === "development"){
   app.use(morgan('dev'));
}

// port connection
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));