import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DB_STRING

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})
